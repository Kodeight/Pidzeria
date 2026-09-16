import crypto from 'crypto';

const AUTH_COOKIE_NAME = 'pidzeria_admin_session';

function getAdminCredentials() {
  const sessionSecret = process.env.SESSION_SECRET?.trim() || 'pidzeria_auth_secret_key_prod_2026';
  return { sessionSecret };
}

function verifyToken(token: string | undefined | null, secret: string): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [username, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // 7 days expiration
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAgeMs) return false;

    const payload = `${username}:${timestampStr}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (signature.length !== expectedSignature.length) return false;
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

function parseCookies(cookieHeader: string | undefined | null): Record<string, string> {
  if (!cookieHeader) return {};
  const list: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      list[name] = decodeURIComponent(val);
    }
  });
  return list;
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  try {
    const cookieHeader = req.headers?.cookie;
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
