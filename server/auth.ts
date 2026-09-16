import type { Request, Response } from 'express';
import {
  getAdminCredentials,
  createToken,
  verifyToken,
  AUTH_COOKIE_NAME,
} from '../src/lib/authCore';

export { AUTH_COOKIE_NAME };

export function createSessionToken(username: string): string {
  const { sessionSecret } = getAdminCredentials();
  return createToken(username, sessionSecret);
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const { sessionSecret } = getAdminCredentials();
  return verifyToken(token, sessionSecret);
}

export function validateCredentials(username: string, password: string): boolean {
  const { username: expectedUser, password: expectedPass } = getAdminCredentials();

  if (!expectedUser || !expectedPass) {
    console.error('[PIDZERIA Auth] ADMIN_USERNAME or ADMIN_PASSWORD environment variable is not defined.');
    return false;
  }

  if (!username || !password) return false;

  const userMatch = username.trim() === expectedUser;
  const passMatch = password === expectedPass;

  return userMatch && passMatch;
}

export function setAuthCookie(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export function isAuthenticatedRequest(req: Request): boolean {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  return verifySessionToken(token);
}
