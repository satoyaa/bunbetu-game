# Cloudflare Pages（パスワード保護付きテスト環境）セットアップ手順書

本書は、**bunbetu-game** のテスト環境を **Cloudflare Pages** に自動デプロイし、**IDとパスワードを知っている人だけがアクセスできるようにする（Basic認証 / パスワード保護）** ためのセットアップ手順書です。

メールアドレスの事前登録などは不要で、ブラウザを開いた際に出るポップアップに **ID / パスワードを入力するだけ** でアクセスできます。

---

## 目次
1. [初期設定の ID / パスワード](#1-初期設定の-id--パスワード)
2. [ステップ 1: Cloudflare アカウントの作成](#ステップ-1-cloudflare-アカウントの作成)
3. [ステップ 2: Cloudflare Pages プロジェクトの作成](#ステップ-2-cloudflare-pages-プロジェクトの作成)
4. [ステップ 3: Account ID と API トークンの取得](#ステップ-3-account-id-と-api-トークンの取得)
5. [ステップ 4: GitHub Secrets への登録](#ステップ-4-github-secrets-への登録)
6. [ステップ 5: （任意）ID・パスワードを変更する方法](#ステップ-5-任意idパスワードを変更する方法)
7. [ステップ 6: デプロイ実行と動作確認](#ステップ-6-デプロイ実行と動作確認)
8. [トラブルシューティング](#トラブルシューティング)

---

## 1. 初期設定の ID / パスワード

リポジトリ内のコード（`functions/_middleware.ts`）にデフォルトで設定されている認証情報は以下の通りです：

- **ユーザー名 (ID)**: `admin`
- **パスワード**: `bunbetu2026`

※ この値は後から Cloudflare のダッシュボード上でいつでも変更可能です（[ステップ5](#ステップ-5-任意idパスワードを変更する方法)参照）。

---

## ステップ 1: Cloudflare アカウントの作成
1. [Cloudflare 公式サイト](https://dash.cloudflare.com/sign-up) にアクセスします。
2. メールアドレスとパスワードを入力し、無料アカウントを作成します（既存アカウントがある場合はログイン）。
3. 届いた確認メールのリンクをクリックして認証を完了します。

---

## ステップ 2: Cloudflare Pages プロジェクトの作成
GitHub Actions からデプロイを受け取るための空の Pages プロジェクトを作成します。

1. Cloudflare ダッシュボードの左メニュー **「Workers & Pages」** をクリックします。
2. **「Create application」**（アプリケーションを作成）> **「Pages」** タブを選択します。
3. **「Upload assets」**（アセットを直接アップロード）をクリックします。
4. **Project name**（プロジェクト名）に `bunbetu-game-test` と入力します。
5. **「Create project」** をクリックします。
6. 次の画面で「Save and Deploy」または画面を閉じて完了します（GitHub Actions から初回デプロイを行うため、ファイルの手動アップロードは不要です）。

---

## ステップ 3: Account ID と API トークンの取得

### 1. Account ID の確認方法（最新UI対応）
以下のいずれかで 32桁の **Account ID** を確認してコピーします（方法①が最速です）。

- **方法①: ブラウザのアドレスバー（URL）から確認【最速】**
  ログイン後のブラウザのアドレスバーの URL を見ます：
  `https://dash.cloudflare.com/【ここにある32桁の英数字】/...`
  `dash.cloudflare.com/` の直後の 32桁の文字列が **Account ID** です。

- **方法②: 検索バー（`Ctrl + K`）からコピー**
  画面上部の検索バーで `Copy account ID` と入力してクリックします。

- **方法③: 「Workers & Pages」画面から確認**
  左メニュー「Workers & Pages」画面の右サイドバー「Account details」内にある **Account ID** をコピーします。

---

### 2. API トークンの発行
1. 画面右上のユーザーアイコン > **「My Profile」**（マイプロフィール）をクリックします。
2. 左メニュー **「API Tokens」** を選択し、**「Create Token」** ボタンをクリックします。
3. テンプレート一覧の **「Edit Cloudflare Workers」** の横にある **「Use template」** をクリックします。
4. 設定内容を確認します：
   - **Token name**: `GitHub Actions Bunbetu Game CD`（任意の名前）
   - **Permissions**:
     - `Account` - `Cloudflare Pages` - `Edit`
     - `Account` - `Workers Scripts` - `Edit`
   - **Account Resources**: `Include` - `All accounts`
5. 最下部の **「Continue to summary」** > **「Create Token」** をクリックします。
6. 表示された **API Token** をコピーして控えておきます（※この画面を閉じると再表示されません）。

---

## ステップ 4: GitHub Secrets への登録

GitHub Actions にトークンを設定します。

1. 本リポジトリ（`bunbetu-game`）の GitHub ページを開きます。
2. **「Settings」** タブ > 左メニュー **「Secrets and variables」** > **「Actions」** をクリックします。
3. **「New repository secret」** をクリックし、以下の2つを登録します：

| Secret名 | 設定する値 |
| :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | ステップ3で取得した **API Token** |
| `CLOUDFLARE_ACCOUNT_ID` | ステップ3で取得した **Account ID** |

---

## ステップ 5: （任意）ID・パスワードを変更する方法

デフォルト（`admin` / `bunbetu2026`）から独自のユーザー名やパスワードに変更したい場合の手順です：

1. Cloudflare ダッシュボードの左メニュー **「Workers & Pages」** を開きます。
2. 作成したプロジェクト **`bunbetu-game-test`** をクリックします。
3. **「Settings」**（設定）タブ > **「Environment variables」**（環境変数）を開きます。
4. **「Add variable」** をクリックし、以下を追加して保存します：
   - 変数名: `BASIC_USER` / 値: お好みのユーザー名（例: `koyo-member`）
   - 変数名: `BASIC_PASS` / 値: お好みのパスワード（例: `MySecretPass2026`）
5. 次回以降のアクセスから新しいID/パスワードが適用されます。

---

## ステップ 6: デプロイ実行と動作確認

### 1. デプロイの実行
- `main` ブランチにコミットを push すると、自動的に GitHub Actions（`.github/workflows/cd.yml`）が起動してデプロイされます。
- または、GitHub の **「Actions」** タブ > **「Deploy to Test Environment (Cloudflare Pages)」** > **「Run workflow」** から手動実行も可能です。

### 2. 動作確認
1. デプロイ完了後、テスト環境の URL（`https://bunbetu-game-test.pages.dev`）にブラウザでアクセスします。
2. ブラウザ標準の **「ログイン（ユーザー名とパスワードの入力）」ダイアログ** が表示されます。
3. ユーザー名に `admin`、パスワードに `bunbetu2026`（変更した場合はその値）を入力します。
4. 認証が通り、ゴミ分別ゲームの画面が正常に表示されることを確認します。

---

## トラブルシューティング

### Q1. GitHub Actions で `Project not found` エラーになる
- **対処**: Cloudflare 側で作成した Pages プロジェクト名が `bunbetu-game-test` と完全一致しているか確認してください。

### Q2. 認証ダイアログが出ずに誰でも見えてしまう
- **対処**: リポジトリのルートに `functions/_middleware.ts` が含まれた状態でデプロイされているか確認してください。Cloudflare Pages がこのファイルを自動検知してエッジ認証を実行します。

### Q3. ページをリロードした際のルーティングについて
- **仕様**: Cloudflare Pages はルートに `index.html` が存在する場合、自動的に SPA（React Router）のフォールバックルーティングを処理します。`_redirects` ファイルは不要です（`/* /index.html 200` を記述すると無限ループエラー 100324 になるため設置しないでください）。
