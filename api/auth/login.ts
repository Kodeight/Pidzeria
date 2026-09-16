import { getAdminCredentials, createToken, AUTH_COOKIE_NAME } from '../../src/lib/authCore';

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
        error: 'Erreur de configuration du serveur : identifiants non configurés dans les variables d\'environnement.',
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
