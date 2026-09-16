import { getAdminCredentials, verifyToken, parseCookies, AUTH_COOKIE_NAME } from '../../../../lib/authCore';

/**
 * Next.js App Router API Route Handler for Session Verification
 * Endpoint: GET /api/auth/session
 */
export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const cookies = parseCookies(cookieHeader);
    const token = cookies[AUTH_COOKIE_NAME];

    const { sessionSecret } = getAdminCredentials();
    const isAuthenticated = verifyToken(token, sessionSecret);

    return Response.json({ authenticated: isAuthenticated });
  } catch (error) {
    console.error('[PIDZERIA Session Route Error]', error);
    return Response.json({ authenticated: false });
  }
}
