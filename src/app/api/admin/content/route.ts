import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

interface ContentFile {
  path: string;
  name: string;
  type: 'services' | 'cases' | 'blog';
}

function listContentFiles(): ContentFile[] {
  const types = ['services', 'cases', 'blog'] as const;
  const files: ContentFile[] = [];

  for (const type of types) {
    const dir = path.join(CONTENT_DIR, type);
    if (!fs.existsSync(dir)) continue;

    const entries = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    for (const entry of entries) {
      files.push({
        path: `${type}/${entry}`,
        name: entry.replace('.mdx', ''),
        type,
      });
    }
  }

  return files;
}

export async function GET(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const filePath = request.nextUrl.searchParams.get('file');

  if (filePath) {
    // Return content of specific file
    const fullPath = path.resolve(CONTENT_DIR, filePath);
    if (!fullPath.startsWith(CONTENT_DIR) || !fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    const content = fs.readFileSync(fullPath, 'utf-8');
    return NextResponse.json({ content, path: filePath });
  }

  // List all content files
  const files = listContentFiles();
  return NextResponse.json({ files });
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { file, content } = await request.json();

    if (!file || typeof file !== 'string' || typeof content !== 'string') {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!file.endsWith('.mdx')) {
      return NextResponse.json({ error: 'Only .mdx files allowed' }, { status: 400 });
    }

    const fullPath = path.resolve(CONTENT_DIR, file);

    // Security: prevent path traversal
    if (!fullPath.startsWith(CONTENT_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    fs.writeFileSync(fullPath, content, 'utf-8');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
