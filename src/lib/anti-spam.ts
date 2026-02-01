import { headers } from 'next/headers';

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MIN_SUBMISSION_TIME_MS = 3000; // 3 seconds minimum

interface AntiSpamResult {
  ok: boolean;
  error?: string;
}

function getClientIp(headersList: Headers): string {
  return (
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'
  );
}

export function checkRateLimit(ip: string): AntiSpamResult {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT_MAX) {
      return { ok: false, error: 'Слишком много запросов. Попробуйте позже.' };
    }
    entry.count++;
  } else {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  return { ok: true };
}

export function checkSubmissionTime(timestamp: number): AntiSpamResult {
  const elapsed = Date.now() - timestamp;
  if (elapsed < MIN_SUBMISSION_TIME_MS) {
    return { ok: false, error: 'Форма отправлена слишком быстро.' };
  }
  return { ok: true };
}

export function checkReferer(headersList: Headers): AntiSpamResult {
  const referer = headersList.get('referer');
  const origin = headersList.get('origin');

  const allowedHosts = ['fine-mechanics.ru', 'localhost', '127.0.0.1'];

  try {
    if (origin) {
      const originHost = new URL(origin).hostname;
      if (!allowedHosts.some((h) => originHost === h || originHost.endsWith(`.${h}`))) {
        return { ok: false, error: 'Недопустимый источник запроса.' };
      }
    } else if (referer) {
      const refererHost = new URL(referer).hostname;
      if (!allowedHosts.some((h) => refererHost === h || refererHost.endsWith(`.${h}`))) {
        return { ok: false, error: 'Недопустимый источник запроса.' };
      }
    }
  } catch {
    return { ok: false, error: 'Недопустимый источник запроса.' };
  }

  return { ok: true };
}

export async function validateSubmission(
  timestamp: number
): Promise<AntiSpamResult> {
  const headersList = await headers();
  const ip = getClientIp(headersList);

  // Check rate limit
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.ok) return rateCheck;

  // Check submission time
  const timeCheck = checkSubmissionTime(timestamp);
  if (!timeCheck.ok) return timeCheck;

  // Check referer/origin
  const refererCheck = checkReferer(headersList);
  if (!refererCheck.ok) return refererCheck;

  return { ok: true };
}

// Generate CSRF token
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Periodic cleanup of expired rate limit entries
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore) {
      if (now >= value.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 60000);
}
