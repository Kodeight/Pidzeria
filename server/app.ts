import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {
  validateCredentials,
  createSessionToken,
  setAuthCookie,
  clearAuthCookie,
  isAuthenticatedRequest,
} from './auth';

dotenv.config();

export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ==========================================================================
// API ROUTES
// ==========================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Check current session status
app.get('/api/auth/session', (req, res) => {
  const isAuth = isAuthenticatedRequest(req);
  res.json({ authenticated: isAuth });
});

// Login handler (Server-side validation)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({ error: 'Identifiant et mot de passe requis.' });
    return;
  }

  const isValid = validateCredentials(username, password);

  if (!isValid) {
    // Intentionally generic error message to prevent enumeration
    res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
    return;
  }

  // Generate secure session token and set HTTP-only cookie
  const token = createSessionToken(username);
  setAuthCookie(res, token);

  res.json({ success: true });
});

// Logout handler
app.post('/api/auth/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ success: true });
});

export default app;
