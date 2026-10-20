# ごみ分別ゲーム

React・TypeScript・Vite で作成したごみ分別ゲームです。

## 開発

```sh
npm install
npm run dev
```

`npm run lint` で Lint、`npm run build` で本番用ビルドを実行します。

## 画像素材

- `raw_assets/`：PNG・JPEG の原本（ごみ箱画像を除く）。`images/waste/`、`images/guide/`、`images/ui/` と直下の背景画像を含みます。
- `src/assets/`：アプリで使う WebP。`raw_assets/` と同じ相対パス・ファイル名で、拡張子のみ `.webp` に変えています。
- `src/assets/images/bins/`：ごみ箱画像8枚。JPEG のまま使用します。
- `src/assets/audio/`：音声3ファイル。変換対象外です。

原本を追加・更新したら、`npm run optimize:images` を実行してください。Sharp が `raw_assets/` を再帰的に走査し、画質80の WebP を `src/assets/` に生成・上書きします。透過画像は透過を維持します。変換済み WebP もリポジトリで管理し、通常のビルドでは変換しません。同じ相対ディレクトリ内で PNG と JPEG の出力名が重複する場合、スクリプトはエラーになります。ごみ箱画像はこの処理から除外します。

### ごみ箱素材の出典

| ファイル名（`src/assets/images/bins/`） | 出典・権利者 |
| :--- | :--- |
| その他プラ.jpg | ©広島市 |
| ペットボトル.jpg | ©広島市 |
| リサイクルプラ.jpg | ©広島市 |
| 不燃ごみ.jpg | ©広島市 |
| 可燃ごみ.jpg | ©広島市 |
| 大型ごみ.jpg | ©広島市 |
| 有害ごみ.jpg | ©広島市 |
| 資源ごみ.jpg | ©広島市 |

## CI/CD

- CI（`.github/workflows/ci.yml`）：Pull Request 作成・更新時に Lint、単体テスト、ビルドを検証します。
- CD（`.github/workflows/cd.yml`）：`main` ブランチへの push 時に Cloudflare Pages へビルド・デプロイします。
- セットアップ手順：[Cloudflare セットアップ手順書](docs/CLOUDFLARE_SETUP.md)
