'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/');
      } else {
        setError(data.message || 'Ошибка авторизации');
      }
    } catch {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray">
      <div className="bg-white rounded-card shadow-card p-[40px] w-full max-w-[400px] mx-[20px]">
        <h1 className="text-[24px] font-bold text-center mb-[30px]">Админ-панель</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-[20px]">
            <label htmlFor="login" className="block text-[14px] font-medium mb-[6px]">
              Логин
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-[16px] py-[12px] border border-[#ddd] rounded-btn text-[16px] outline-none focus:border-blue"
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-[20px]">
            <label htmlFor="password" className="block text-[14px] font-medium mb-[6px]">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-[16px] py-[12px] border border-[#ddd] rounded-btn text-[16px] outline-none focus:border-blue"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="mb-[15px] text-[14px] text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue text-white py-[12px] rounded-btn text-[16px] font-semibold cursor-pointer hover:bg-blue/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </main>
  );
}
