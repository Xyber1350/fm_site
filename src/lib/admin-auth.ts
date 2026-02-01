import { cookies } from 'next/headers';
import crypto from 'crypto';

// Admin credentials from environment variables
// Set ADMIN_LOGIN and ADMIN_PASSWORD in .env.local
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const SESSION_SECRET = process.env.SESSION_SECRET || 'fm-secret-key-change-in-production';
const SESSION_COOKIE = 'fm_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

function createSessionToken(login: string): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${login}:${expires}`;
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [login, expiresStr, signature] = parts;
    const expires = parseInt(expiresStr, 10);

    if (Date.now() > expires) return false;

    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(`${login}:${expiresStr}`)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export function validateCredentials(login: string, password: string): boolean {
  return login === ADMIN_LOGIN && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<string> {
  const token = createSessionToken(ADMIN_LOGIN);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return token;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
