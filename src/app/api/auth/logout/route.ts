import { AUTH_COOKIE_NAME } from '../../../../lib/authCore';

/**
 * Next.js App Router API Route Handler for Session Logout
 * Endpoint: POST /api/auth/logout
 */
export async function POST() {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  const cookieHeader = [
    `${AUTH_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
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
}
