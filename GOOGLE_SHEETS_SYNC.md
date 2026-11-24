# Google Sheets データ同期

## 概要

GitHub ActionsがGoogle Sheets APIからデータを読み込み、検証した後、Viteのビルドに使います。アプリのブラウザーからGoogle APIへ接続しません。同期JSONはActionsの実行環境内で更新し、リポジトリへ自動コミットしません。

- `waste` タブ: ごみ品目の追加・編集・削除
- `feedback` タブ: 特別フィードバック文とスコア称号
- `difficulty` タブ: レベル別設定と難易度設定
- ごみ箱一覧と短いプレイ中ヒントはコード管理です。

## 初回設定

1. Google CloudでGoogle Sheets APIを有効にし、サービスアカウントを作成します。
2. サービスアカウントのメールアドレスを対象スプレッドシートに共有し、閲覧者権限を付けます。
3. GitHubリポジトリの **Settings → Secrets and variables → Actions** に次のSecretsを登録します。
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: サービスアカウント鍵JSONの全内容
   - `GOOGLE_SHEETS_SPREADSHEET_ID`: スプレッドシートURLの `/d/` と次の `/` の間にあるID
4. 下記の列名で `waste`、`feedback`、`difficulty` タブを作ります。各タブの1行目は列名、2行目以降をデータにします。

## `waste` タブ

列名は次の14個です。列の順番は問いません。

| 列 | 内容 |
| --- | --- |
| `key` | 品目の一意なキー。小文字英数字と `_` を使用 |
| `label` | 品目名 |
| `shortLabel` | コンベア表示名。空欄なら `label` を使用 |
| `img` | 既存画像のパス。例: `images/waste/ペットボトル.webp` |
| `score` | 正解時の点数。0以上の数値 |
| `isSimple`, `isWash`, `isBurn`, `isTrash` | `TRUE` または `FALSE` |
| `bin` | `kanen`, `pet`, `recycle_plastic`, `other_plastic`, `hunen`, `sigen`, `yugai`, `oogata`, `yet` のいずれか |
| `parts` | 分解後の品目キー。複数ある場合はカンマ区切り。空欄可 |
| `feedBackId` | 空欄可。それ以外は `simple_mistake`, `forget_separate`, `burning`, `missed_Waste`, `must_wash`, `must_flush` |
| `wasteLevel` | 1以上の整数 |
| `washTargetKey` | 洗浄後の品目キー。空欄可。指定時は `isWash=TRUE` が必要 |

画像は `src/assets/images/waste/` 内にあるファイルだけ指定できます。新しい画像ファイルの追加はリポジトリ側で行ってください。`parts` と `washTargetKey` は、このタブ内に存在する `key` を参照してください。

## `feedback` タブ

次の列を用意します。`type` が `message` の行ではフィードバック文の列を使い、`title` の行では称号の列を使います。

| 列 | 内容 |
| --- | --- |
| `type` | `message` または `title` |
| `feedBackId` | `message` 行のID。`simple_mistake` 以外の既知ID |
| `message` | `message` 行の表示文 |
| `feedTitleScoreThreshold` | `title` 行の必要スコア。0以上 |
| `feedTitle` | `title` 行の称号 |

各 `feedBackId` の `message` は1行ずつ、称号はスコア0の行を含めて登録します。称号はスコアの昇順で読み込みます。

## `difficulty` タブ

次の列を用意します。レベル設定は `type=level`、難易度設定は `type=mode` の行に入力します。

| 列 | `level` 行 | `mode` 行 |
| --- | --- | --- |
| `type` | `level` | `mode` |
| `level` | 0以上の整数。重複不可 | 空欄 |
| `wasteSpeed` | 0.01以上 | 空欄 |
| `itemInterval` | 0より大きい数値 | 空欄 |
| `wasteLevel` | 1以上の整数 | 空欄 |
| `burstSpawnRate` | 0以上 | 空欄 |
| `name` | 空欄 | 画面に表示する難易度名 |
| `difficulty` | 空欄 | `easy`, `normal`, `hard` |
| `timeLimit` | 空欄 | 秒数、または `Infinity` |
| `lifeLimit` | 空欄 | 1以上の整数 |
| `binCount` | 空欄 | 1以上の整数 |
| `levels` | 空欄 | 利用するlevel番号をカンマ区切りで指定 |
| `levelUpIntervalMs` | 空欄 | 1以上の整数（ミリ秒） |

`mode` 行は `easy`、`normal`、`hard` を各1行登録し、`levels` の番号は `level` 行に存在する値を指定します。

## 同期とデプロイ

- **接続テスト（デプロイなし）**: `Actions → Test Google Sheets Connection → Run workflow` を実行します。このWorkflowは3タブの読み込みと内容検証だけを行い、JSONファイルを書き換えず、Cloudflare Pagesへもデプロイしません。成功するとログに `Connection and validation succeeded` と読み込んだ件数が表示されます。
- 接続テストWorkflowは、この変更が `main` に取り込まれた後にActions一覧へ表示されます。ローカルで試す場合は、2つの環境変数を設定して `npm run sheets:check` を実行してください。
- 接続テストが通った後、実際に反映する場合は `Actions → Deploy to Test Environment → Run workflow` を実行します。こちらは同期後にビルド・デプロイします。
- `main` へのpush時に、同期・検証、Lint、ビルドを行ってCloudflare Pagesへデプロイします。
- Actionsの **Deploy to Test Environment** は手動実行できます。実行するブランチを選択してください。
- 定期実行は毎日0時（日本時間）です。GitHub ActionsのUTC cronでは `15:00` に設定しています。
- 列名の不一致、空の必須値、重複キー、未対応ID、ごみ箱ID、画像パス、参照先などに問題があると同期でエラーになり、デプロイを中止します。
- `npm run sheets:sync` でローカル同期もできます。`GOOGLE_SERVICE_ACCOUNT_JSON` と `GOOGLE_SHEETS_SPREADSHEET_ID` の環境変数が必要です。
- `npm run sheets:check` は同じAPI認証・シート読み込み・内容検証を実行しますが、ローカルのデータファイルは書き換えません。

## 変更記録

- `scripts/sync-sheet-data.mjs` がSheets APIから3タブを取得・検証し、通常同期では `src/data/sheets/*.json` を生成します。初期JSONには変更前のデータを入れています。
- `src/data/waste.ts`、`src/data/feedback.ts`、`src/data/difficulty.ts` は生成JSONをアプリの型へ接続します。`package.json` に同期コマンド、`tsconfig.app.json` にJSON importを追加し、`.github/workflows/cd.yml` で同期後のビルド・デプロイを実行します。
- このMarkdownにシートの準備方法と列定義を記録しています。
- `src/data/bins.ts` は対象外です。
