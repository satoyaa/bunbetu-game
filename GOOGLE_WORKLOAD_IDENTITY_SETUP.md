# GitHub Actions から Google Sheets API へ Workload Identity で接続する

この手順は、サービスアカウントキーを作らずにGitHub ActionsからGoogle Sheets APIを利用するための設定をまとめたものです。現在の同期スクリプトは鍵JSONからJWTを作る方式なので、Workload Identity Federation（WIF）を使うには認証部分を差し替えます。シート構成、データ検証、JSON生成、デプロイの流れは維持できます。

## 接続方式

GitHub Actionsが発行するOIDCトークンをGoogle CloudのWorkload Identity Providerで検証し、専用サービスアカウントを一時的に代理利用します。サービスアカウントキーは不要です。Google CloudはWIFを短期認証情報を使う方法として案内しており、GitHubの `google-github-actions/auth` Actionも対応しています。

この構成では、Google Sheetsの閲覧権限をサービスアカウントに付けます。連携するGitHubリポジトリやブランチをProviderの条件で絞り、許可していないワークフローからの認証を拒否します。

## 1. 組織ポリシーと既存設定を確認する

まず、管理者に次を確認します。

- サービスアカウントキーの作成だけが禁止されているか
- GitHub OIDC Providerの新規作成が組織ポリシーで禁止されていないか
- 既存のWorkload Identity Pool/Providerをこのリポジトリから利用できるか

キー作成の禁止だけであればWIFを利用できる可能性があります。一方、組織ポリシー `constraints/iam.workloadIdentityPoolProviders` がGitHubのissuer `https://token.actions.githubusercontent.com` を許可していない場合、新規Providerは利用できません。組織ポリシーを変更できない場合は、管理者が許可済みProviderを用意するか、既存Providerの利用を許可する必要があります。[Googleのトラブルシューティング](https://github.com/google-github-actions/auth/blob/main/docs/TROUBLESHOOTING.md)

Pool/Providerを作成する担当者には、対象プロジェクトで必要なIAM権限も必要です。Googleの手順ではWorkload Identity Pool Admin（`roles/iam.workloadIdentityPoolAdmin`）が案内されています。[設定に必要な権限](https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines#required_roles)

## 2. Google Cloudを設定する

1. 対象プロジェクトでIAM API、IAM Service Account Credentials API、Security Token Service API、Google Sheets APIを有効にします。
2. 専用サービスアカウントを作成するか、用途に合う既存アカウントを選びます。鍵は作成しません。
3. サービスアカウントのメールアドレスを対象スプレッドシートに共有し、「閲覧者」権限を付けます。
4. Workload Identity Poolを作成し、GitHub Actions用のOIDC Providerを登録します。Issuer URLは `https://token.actions.githubusercontent.com` です。
5. Providerの属性マッピングと条件を設定します。例として、次の属性をマッピングし、`main` ブランチだけを許可します。

   ```text
   google.subject = assertion.sub
   attribute.repository = assertion.repository
   attribute.ref = assertion.ref
   ```

   ```text
   assertion.repository == 'satoyaa/bunbetu-game' && assertion.ref == 'refs/heads/main'
   ```

6. 対象サービスアカウントに、上記リポジトリのWorkload Identity principal setを追加し、`roles/iam.workloadIdentityUser` を付与します。principal setの形式は次のとおりです。

   ```text
   principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.repository/satoyaa/bunbetu-game
   ```

   `PROJECT_NUMBER` と `POOL_ID` を実際の値に置き換えます。Provider条件でブランチを制限します。必要な権限や設定は[Googleのデプロイパイプライン向け手順](https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines)を参照してください。

## 3. GitHub Actionsの設定値を登録する

リポジトリの **Settings → Secrets and variables → Actions → Variables** に次を登録します。

| Variable | 値 |
| --- | --- |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID` |
| `GCP_SERVICE_ACCOUNT_EMAIL` | 代理利用するサービスアカウントのメールアドレス |

**Secrets** には既存の `GOOGLE_SHEETS_SPREADSHEET_ID` を登録します。WIFへの切り替え後は、`GOOGLE_SERVICE_ACCOUNT_JSON` Secretを使わなくなります。

## 4. ワークフローと同期スクリプトを切り替える

CDと接続テストの両方のWorkflowで、ジョブ権限に `id-token: write` を追加します。

```yaml
permissions:
  contents: read
  id-token: write
```

`npm run sheets:sync` または `npm run sheets:check` より前に、Googleの認証Actionを追加します。

```yaml
- id: google-auth
  name: Authenticate to Google Cloud
  uses: google-github-actions/auth@v3
  with:
    workload_identity_provider: ${{ vars.GCP_WORKLOAD_IDENTITY_PROVIDER }}
    service_account: ${{ vars.GCP_SERVICE_ACCOUNT_EMAIL }}
    token_format: access_token
    access_token_scopes: https://www.googleapis.com/auth/spreadsheets.readonly
```

同期・接続テストの各ステップには次を渡します。

```yaml
env:
  GOOGLE_ACCESS_TOKEN: ${{ steps.google-auth.outputs.access_token }}
  GOOGLE_SHEETS_SPREADSHEET_ID: ${{ secrets.GOOGLE_SHEETS_SPREADSHEET_ID }}
```

`scripts/sync-sheet-data.mjs` は `GOOGLE_SERVICE_ACCOUNT_JSON` を読む処理とJWT署名処理を外し、`GOOGLE_ACCESS_TOKEN` をSheets APIのBearer tokenとして使うように変更します。アクセストークンをログへ出力しないでください。Actionの使い方は[`google-github-actions/auth`](https://github.com/google-github-actions/auth)を参照してください。

## 5. デプロイせずに接続をテストする

1. 設定変更を `main` に反映します。Provider条件も `main` のrefを許可していることを確認します。
2. GitHubリポジトリの **Actions → Test Google Sheets Connection → Run workflow** を実行します。
3. `Authenticate to Google Cloud` と `Test Sheets API connection and validate data` の両方が成功することを確認します。
4. ログに `Connection and validation succeeded` と読み込み件数が出れば、認証、シート閲覧、列名・データ検証まで成功です。このWorkflowはデータJSONを更新せず、Cloudflare Pagesにもデプロイしません。
5. 実際に反映するときは **Actions → Deploy to Test Environment → Run workflow** を実行します。

ローカルでは、短期アクセストークンとシートIDを環境変数に設定したうえで `npm run sheets:check` を実行できます。鍵JSONは不要です。

## エラーの確認箇所

| エラーの例 | 確認する設定 |
| --- | --- |
| Providerが許可されない、組織ポリシー違反 | `constraints/iam.workloadIdentityPoolProviders` と組織管理者の許可設定 |
| audience不一致、Providerを認証できない | Providerの完全なリソース名、Issuer URL、GitHubリポジトリ/ブランチ条件 |
| サービスアカウントのアクセストークンを発行できない | `roles/iam.workloadIdentityUser` の付与先principalとサービスアカウント |
| Sheets APIから403、またはspreadsheet not found | Sheets APIの有効化、Spreadsheet ID、サービスアカウントへのシート共有 |
| 列名や行データの検証エラー | `GOOGLE_SHEETS_SYNC.md` のタブ名・列名・値の形式 |

## 参照資料

- [Workload Identity Federation](https://docs.cloud.google.com/iam/docs/workload-identity-federation)
- [Configure Workload Identity Federation with deployment pipelines](https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines)
- [`google-github-actions/auth` のREADME](https://github.com/google-github-actions/auth/blob/main/README.md)
- [`google-github-actions/auth` のトラブルシューティング](https://github.com/google-github-actions/auth/blob/main/docs/TROUBLESHOOTING.md)
