import { AUTH_COOKIE_NAME } from '../../src/lib/authCore';

export default async function handler(req: any, res: any) {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  const cookieHeader = [
    `${AUTH_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Lax',
    isProduction ? 'Secure' : '',
  ].filter(Boolean).join('; ');

  res.setHeader('Set-Cookie', cookieHeader);
  return res.status(200).json({ success: true });
}
