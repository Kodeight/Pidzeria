import crypto from 'crypto';
import type { Request, Response } from 'express';

/**
 * ============================================================================
 * PIDZERIA DASHBOARD AUTHENTICATION (SERVER-SIDE ONLY)
 * ============================================================================
 * 
 * DEVELOPER NOTICE:
 * This is prototype authentication only. Replace with real server-side
 * authentication (Neon PostgreSQL + bcrypt + sessions + RBAC) before production use.
 * 
 * This module runs exclusively on the Node.js server and must NEVER be imported
 * by client components or exposed in client JavaScript bundles.
 * ============================================================================
 */

// Server-only environment credentials
const getAdminUsername = (): string | null => {
  const user = process.env.ADMIN_USERNAME;
  return user && user.trim().length > 0 ? user.trim() : null;
};

const getAdminPassword = (): string | null => {
  const pass = process.env.ADMIN_PASSWORD;
  return pass && pass.length > 0 ? pass : null;
};

const getSessionSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.trim().length > 0) {
    return secret;
  }
  return 'pidzeria_dynamic_session_secret';
};

export const AUTH_COOKIE_NAME = 'pidzeria_admin_session';

/**
 * Creates a cryptographically signed session token for authenticated dashboard sessions
 */
export function createSessionToken(username: string): string {
  const issuedAt = Date.now();
  const payload = `${username}:${issuedAt}`;
  const signature = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('hex');
  
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

/**
 * Validates a signed session token
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [username, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // Session lifetime: 7 days
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAgeMs) {
      return false;
    }

    const payload = `${username}:${timestampStr}`;
    const expectedSignature = crypto
      .createHmac('sha256', getSessionSecret())
      .update(payload)
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    if (signature.length !== expectedSignature.length) return false;
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Validates provided credentials strictly against server environment secrets
 */
export function validateCredentials(username: string, password: string): boolean {
  const expectedUser = getAdminUsername();
  const expectedPass = getAdminPassword();

  // If credentials are not configured in environment variables, reject login
  if (!expectedUser || !expectedPass) {
    console.error('[PIDZERIA Auth] ADMIN_USERNAME or ADMIN_PASSWORD environment variable is not defined.');
    return false;
  }

  if (!username || !password) return false;

  const userMatch = username.trim() === expectedUser;
  const passMatch = password === expectedPass;

  return userMatch && passMatch;
}

/**
 * Sets the secure HTTP-only session cookie
 */
export function setAuthCookie(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction, // HTTPS in production / Vercel
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

/**
 * Clears the session cookie on logout
 */
export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Extracts and verifies session from Express request
 */
export function isAuthenticatedRequest(req: Request): boolean {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  return verifySessionToken(token);
}
