import crypto from 'crypto';

const AUTH_COOKIE_NAME = 'pidzeria_admin_session';

function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME?.trim() || null;
  const password = process.env.ADMIN_PASSWORD || null;
  const sessionSecret = process.env.SESSION_SECRET?.trim() || 'pidzeria_auth_secret_key_prod_2026';
  return { username, password, sessionSecret };
}

function createToken(username: string, secret: string): string {
  const timestamp = Date.now();
  const payload = `${username.trim()}:${timestamp}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

export default async function handler(req: any, res: any) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const { username, password } = body || {};

    if (!username || !password) {
      return res.status(400).json({ error: 'Identifiant et mot de passe requis.' });
    }

    const { username: adminUser, password: adminPass, sessionSecret } = getAdminCredentials();

    if (!adminUser || !adminPass) {
      console.error('[PIDZERIA Auth] Missing ADMIN_USERNAME or ADMIN_PASSWORD in environment variables');
      return res.status(500).json({
        error: 'Erreur de configuration du serveur : identifiants non configurés dans les variables d\'environnement Vercel.',
      });
    }

    if (username.trim() !== adminUser || password !== adminPass) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
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

    res.setHeader('Set-Cookie', cookieHeader);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[PIDZERIA Serverless Login Error]', err);
    return res.status(500).json({ error: 'Une erreur interne est survenue sur le serveur.' });
  }
}
