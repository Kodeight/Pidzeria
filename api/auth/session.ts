import { getAdminCredentials, verifyToken, parseCookies, AUTH_COOKIE_NAME } from '../../src/lib/authCore';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  try {
    const cookieHeader = req.headers.cookie;
    const cookies = parseCookies(cookieHeader);
    const token = cookies[AUTH_COOKIE_NAME];

    const { sessionSecret } = getAdminCredentials();
    const isAuthenticated = verifyToken(token, sessionSecret);

    return res.status(200).json({ authenticated: isAuthenticated });
  } catch (err: any) {
    console.error('[PIDZERIA Serverless Session Error]', err);
    return res.status(200).json({ authenticated: false });
  }
}
