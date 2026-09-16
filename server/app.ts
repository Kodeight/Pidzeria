import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import {
  validateCredentials,
  createSessionToken,
  setAuthCookie,
  clearAuthCookie,
  isAuthenticatedRequest,
} from './auth';

export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Handlers
const handleHealth = (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};

const handleSession = (req: Request, res: Response) => {
  try {
    const isAuth = isAuthenticatedRequest(req);
    res.json({ authenticated: isAuth });
  } catch (err) {
    console.error('[PIDZERIA Auth] Session check error:', err);
    res.json({ authenticated: false });
  }
};

const handleLogin = (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.error('[PIDZERIA Auth] Login error:', err);
    res.status(500).json({ error: 'Erreur interne du serveur lors de la connexion.' });
  }
};

const handleLogout = (_req: Request, res: Response) => {
  try {
    clearAuthCookie(res);
    res.json({ success: true });
  } catch (err) {
    console.error('[PIDZERIA Auth] Logout error:', err);
    res.json({ success: true });
  }
};

// Mount on /api routes (standard Express server & local development)
app.get('/api/health', handleHealth);
app.get('/api/auth/session', handleSession);
app.post('/api/auth/login', handleLogin);
app.post('/api/auth/logout', handleLogout);

// Also mount without /api prefix (in case Vercel rewrites strip /api)
app.get('/health', handleHealth);
app.get('/auth/session', handleSession);
app.post('/auth/login', handleLogin);
app.post('/auth/logout', handleLogout);

// Catch-all API fallback for unmatched /api routes
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route API introuvable.' });
});

// Global Express error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error('[PIDZERIA Server Error]', err);
  res.status(500).json({ error: 'Une erreur interne est survenue sur le serveur.' });
});

export default app;
