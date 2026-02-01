import { NextRequest, NextResponse } from 'next/server';
import { validateSubmission } from '@/lib/anti-spam';
import fs from 'fs';
import path from 'path';

interface FormPayload {
  name: string;
  phone: string;
  message?: string;
  formType: 'callback' | 'audit' | 'consultation';
  consent: boolean;
  timestamp: number;
}

function validatePayload(body: FormPayload): string | null {
  if (!body.name || typeof body.name !== 'string' || body.name.length > 100) {
    return 'Некорректное имя';
  }

  const phoneDigits = String(body.phone).replace(/\D/g, '');
  if (phoneDigits.length !== 11) {
    return 'Некорректный номер телефона';
  }

  if (body.message && (typeof body.message !== 'string' || body.message.length > 2000)) {
    return 'Сообщение слишком длинное';
  }

  if (!body.consent) {
    return 'Необходимо согласие на обработку данных';
  }

  const validTypes = ['callback', 'audit', 'consultation'];
  if (!validTypes.includes(body.formType)) {
    return 'Некорректный тип формы';
  }

  return null;
}

function sanitize(value: string): string {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: FormPayload = await request.json();

    // Validate payload
    const validationError = validatePayload(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      );
    }

    // Anti-spam checks
    const spamCheck = await validateSubmission(body.timestamp);
    if (!spamCheck.ok) {
      return NextResponse.json(
        { success: false, message: spamCheck.error },
        { status: 429 }
      );
    }

    // Prepare submission data
    const submission = {
      name: sanitize(body.name),
      phone: String(body.phone).replace(/\D/g, ''),
      message: body.message ? sanitize(body.message) : undefined,
      formType: body.formType,
      submittedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Save to file
    const dataDir = path.join(process.cwd(), 'data', 'submissions');
    const dateStr = new Date().toISOString().split('T')[0];
    const filePath = path.join(dataDir, `${dateStr}.json`);

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing submissions or create new array
    let submissions = [];
    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf-8');
      submissions = JSON.parse(existing);
    }

    submissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
