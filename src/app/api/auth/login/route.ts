import { getAdminCredentials, createToken, AUTH_COOKIE_NAME } from '../../../../lib/authCore';

/**
 * Next.js App Router API Route Handler for Server-Side Authentication
 * Endpoint: POST /api/auth/login
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    if (!username || !password) {
      return Response.json(
        { error: 'Identifiant et mot de passe requis.' },
        { status: 400 }
      );
    }

    const { username: adminUser, password: adminPass, sessionSecret } = getAdminCredentials();

    if (!adminUser || !adminPass) {
      console.error('[PIDZERIA Auth] Missing ADMIN_USERNAME or ADMIN_PASSWORD in environment variables');
      return Response.json(
        { error: 'Erreur de configuration du serveur : identifiants non configurés dans les variables d\'environnement.' },
        { status: 500 }
      );
    }

    if (username.trim() !== adminUser || password !== adminPass) {
      return Response.json(
        { error: 'Identifiant ou mot de passe incorrect.' },
        { status: 401 }
      );
    }

    // Generate secure cryptographically signed session token
    const token = createToken(username.trim(), sessionSecret);
    const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
    const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

    const cookieHeader = [
      `${AUTH_COOKIE_NAME}=${token}`,
      'Path=/',
      `Max-Age=${maxAge}`,
      'HttpOnly',
      'SameSite=Lax',
      isProduction ? 'Secure' : '',
    ].filter(Boolean).join('; ');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader,
      },
    });
  } catch (error) {
    console.error('[PIDZERIA Login Route Error]', error);
    return Response.json(
      { error: 'Une erreur interne est survenue sur le serveur.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
