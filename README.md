# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## CI/CD（継続的インテグレーション・デプロイ）

- **CI (`.github/workflows/ci.yml`)**: Pull Request 作成・更新時に Lint、単体テスト、ビルド検証を自動実行します。
- **CD (`.github/workflows/cd.yml`)**: `main` ブランチへの push 時に、自動でテスト環境（Cloudflare Pages）へビルド・デプロイします。
- **セットアップ手順**: Cloudflare のアカウント作成やアクセス制御（Zero Trust Access）の設定方法については、[Cloudflare セットアップ手順書](docs/CLOUDFLARE_SETUP.md) を参照してください。

## 使用素材一覧

| ファイル名 | 出典・権利者 |
| :--- | :--- |
| public\その他プラ.jpg | ©広島市 |
| public\ペットボトル.jpg | ©広島市 |
| public\リサイクルプラ.jpg | ©広島市 |
| public\不燃ごみ.jpg | ©広島市 |
| public\可燃ごみ.jpg | ©広島市 |
| public\大型ごみ.jpg | ©広島市 |
| public\有害ごみ.jpg | ©広島市 |
| public\資源ごみ.jpg | ©広島市 |