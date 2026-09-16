export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    name: 'PIDZERIA API',
    endpoints: ['/api/auth/login', '/api/auth/session', '/api/auth/logout', '/api/health'],
    timestamp: new Date().toISOString(),
  });
}
