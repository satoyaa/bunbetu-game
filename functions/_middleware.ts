interface Env {
  BASIC_USER?: string;
  BASIC_PASS?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. ホワイトリスト判定
  const allowedPaths = ['/', '/game', '/learn'];
  const isAsset = /\.(png|jpe?g|gif|svg|ico|webp|css|js|json|webmanifest|woff2?|ttf|eot)$/i.test(path);

  // 想定ルートでも静的ファイルでもない場合（.env など）は即 404
  if (!allowedPaths.includes(path) && !isAsset) {
    return new Response("Not Found", { status: 404 });
  }

  // 2. 認証チェック
  // デフォルトの認証情報（Cloudflareダッシュボードの環境変数で変更可能）
  const expectedUser = env.BASIC_USER;
  const expectedPass = env.BASIC_PASS;

  const authHeader = request.headers.get("Authorization");
  let isAuthenticated = false;

  if (authHeader && authHeader.startsWith("Basic ")) {
    try {
      const base64 = authHeader.substring(6);
      const decoded = atob(base64);
      const [user, pass] = decoded.split(":");

      if (user === expectedUser && pass === expectedPass) {
        isAuthenticated = true;
      }
    } catch {
      // Base64デコードエラー等のハンドリング
    }
  }

  // 認証済みなら通す
  if (isAuthenticated) {
    return await next();
  }

  // 3. 未認証時のレスポンス制御
  // 静的ファイルへのアクセスなら 404 を返す
  if (isAsset) {
    return new Response("Not Found", { status: 404 });
  }

  // 許可されたページ（/ など）へのアクセスなら 401 を返し、認証ダイアログを表示
  return new Response("認証が必要です。ユーザー名とパスワードを入力してください。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Bunbetu Game Test Environment"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
