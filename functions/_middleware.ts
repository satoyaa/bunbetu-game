interface Env {
  BASIC_USER?: string;
  BASIC_PASS?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;

  // デフォルトの認証情報（Cloudflareダッシュボードの環境変数で変更可能）
  const expectedUser = env.BASIC_USER || "admin";
  const expectedPass = env.BASIC_PASS || "bunbetu2026";

  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new Response("認証が必要です。ユーザー名とパスワードを入力してください。", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Bunbetu Game Test Environment"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  try {
    const base64 = authHeader.substring(6);
    const decoded = atob(base64);
    const [user, pass] = decoded.split(":");

    if (user === expectedUser && pass === expectedPass) {
      return await next();
    }
  } catch {
    // Base64デコードエラー等のハンドリング
  }

  return new Response("ユーザー名またはパスワードが正しくありません。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Bunbetu Game Test Environment"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
