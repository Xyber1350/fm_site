import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession, destroySession } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    if (!validateCredentials(login, password)) {
      return NextResponse.json(
        { success: false, message: 'Неверный логин или пароль' },
        { status: 401 }
      );
    }

    await createSession();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ success: true });
}
