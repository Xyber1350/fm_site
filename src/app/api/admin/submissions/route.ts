import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'submissions');

interface Submission {
  name: string;
  phone: string;
  message?: string;
  formType: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
  status?: 'new' | 'processed' | 'archived';
}

function getAllSubmissions(): Submission[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json')).sort().reverse();
  const all: Submission[] = [];

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const items: Submission[] = JSON.parse(raw);
    all.push(...items.map((item) => ({ ...item, status: item.status || 'new' as const })));
  }

  return all.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const submissions = getAllSubmissions();
  return NextResponse.json({ submissions, total: submissions.length });
}

export async function PATCH(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { submittedAt, status } = await request.json();

    if (!submittedAt || !status) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!fs.existsSync(DATA_DIR)) {
      return NextResponse.json({ error: 'No data' }, { status: 404 });
    }

    const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const items: Submission[] = JSON.parse(raw);
      const idx = items.findIndex((s) => s.submittedAt === submittedAt);

      if (idx !== -1) {
        items[idx].status = status;
        fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
