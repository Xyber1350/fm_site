'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Submission {
  name: string;
  phone: string;
  message?: string;
  formType: string;
  submittedAt: string;
  ip: string;
  status: 'new' | 'processed' | 'archived';
}

interface ContentFile {
  path: string;
  name: string;
  type: 'services' | 'cases' | 'blog';
}

type Tab = 'submissions' | 'content';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('submissions');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/submissions/');
      if (res.status === 401) {
        setAuthError(true);
        return;
      }
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
      // ignore
    }
  }, []);

  const fetchContentFiles = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content/');
      if (res.status === 401) {
        setAuthError(true);
        return;
      }
      const data = await res.json();
      setContentFiles(data.files || []);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchSubmissions(), fetchContentFiles()]);
      setLoading(false);
    };
    load();
  }, [fetchSubmissions, fetchContentFiles]);

  useEffect(() => {
    if (authError) router.push('/admin/login/');
  }, [authError, router]);

  const handleStatusChange = async (submittedAt: string, status: string) => {
    await fetch('/api/admin/submissions/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submittedAt, status }),
    });
    await fetchSubmissions();
  };

  const handleEditFile = async (filePath: string) => {
    const res = await fetch(`/api/admin/content/?file=${encodeURIComponent(filePath)}`);
    const data = await res.json();
    setEditContent(data.content);
    setEditingFile(filePath);
  };

  const handleSaveFile = async () => {
    if (!editingFile) return;
    setSaving(true);
    await fetch('/api/admin/content/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: editingFile, content: editContent }),
    });
    setSaving(false);
    setEditingFile(null);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/', { method: 'DELETE' });
    router.push('/admin/login/');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPhone = (phone: string) => {
    if (phone.length === 11) {
      return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;
    }
    return phone;
  };

  const typeLabels: Record<string, string> = {
    services: 'Услуги',
    cases: 'Кейсы',
    blog: 'Блог',
  };

  const statusLabels: Record<string, string> = {
    new: 'Новая',
    processed: 'Обработана',
    archived: 'Архив',
  };

  const statusColors: Record<string, string> = {
    new: 'bg-blue text-white',
    processed: 'bg-green-500 text-white',
    archived: 'bg-[#999] text-white',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray">
        <p className="text-[18px] text-[#666]">Загрузка...</p>
      </div>
    );
  }

  const newCount = submissions.filter((s) => s.status === 'new').length;

  return (
    <div className="min-h-screen bg-gray">
      {/* Header */}
      <header className="bg-white border-b border-[#eee] sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-[20px] h-[60px] flex items-center justify-between">
          <h1 className="text-[20px] font-bold">FM Admin</h1>
          <div className="flex items-center gap-[20px]">
            <nav className="flex gap-[5px]">
              <button
                onClick={() => setTab('submissions')}
                className={`px-[16px] py-[8px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-colors ${
                  tab === 'submissions'
                    ? 'bg-blue text-white'
                    : 'text-[#666] hover:bg-light-blue'
                }`}
              >
                Заявки
                {newCount > 0 && (
                  <span className="ml-[6px] bg-white text-blue text-[12px] font-bold px-[6px] py-[1px] rounded-full">
                    {newCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setTab('content')}
                className={`px-[16px] py-[8px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-colors ${
                  tab === 'content'
                    ? 'bg-blue text-white'
                    : 'text-[#666] hover:bg-light-blue'
                }`}
              >
                Контент
              </button>
            </nav>
            <button
              onClick={handleLogout}
              className="text-[14px] text-[#999] hover:text-red-500 cursor-pointer transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-[20px] py-[30px]">
        {/* Submissions tab */}
        {tab === 'submissions' && (
          <div>
            <div className="flex items-center justify-between mb-[20px]">
              <h2 className="text-[24px] font-bold">
                Заявки ({submissions.length})
              </h2>
              <button
                onClick={fetchSubmissions}
                className="text-[14px] text-blue hover:underline cursor-pointer"
              >
                Обновить
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="bg-white rounded-card p-[40px] text-center">
                <p className="text-[18px] text-[#999]">Заявок пока нет</p>
              </div>
            ) : (
              <div className="flex flex-col gap-[10px]">
                {submissions.map((s) => (
                  <div
                    key={s.submittedAt}
                    className="bg-white rounded-[12px] p-[20px] flex items-center gap-[20px] shadow-sm"
                  >
                    <span
                      className={`text-[11px] font-bold px-[8px] py-[3px] rounded-[4px] shrink-0 ${
                        statusColors[s.status]
                      }`}
                    >
                      {statusLabels[s.status]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[16px]">{s.name}</p>
                      <p className="text-[14px] text-blue">{formatPhone(s.phone)}</p>
                      {s.message && (
                        <p className="text-[13px] text-[#666] mt-[4px] truncate">{s.message}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[12px] text-[#999]">{formatDate(s.submittedAt)}</p>
                      <p className="text-[11px] text-[#ccc]">{s.formType}</p>
                    </div>
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s.submittedAt, e.target.value)}
                      className="text-[13px] border border-[#ddd] rounded-[6px] px-[8px] py-[4px] cursor-pointer outline-none shrink-0"
                    >
                      <option value="new">Новая</option>
                      <option value="processed">Обработана</option>
                      <option value="archived">Архив</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content tab */}
        {tab === 'content' && !editingFile && (
          <div>
            <h2 className="text-[24px] font-bold mb-[20px]">Контент</h2>

            {(['services', 'cases', 'blog'] as const).map((type) => {
              const files = contentFiles.filter((f) => f.type === type);
              if (files.length === 0) return null;

              return (
                <div key={type} className="mb-[30px]">
                  <h3 className="text-[18px] font-semibold mb-[10px]">
                    {typeLabels[type]} ({files.length})
                  </h3>
                  <div className="grid grid-cols-3 gap-[10px] max-mobile:grid-cols-1">
                    {files.map((f) => (
                      <button
                        key={f.path}
                        onClick={() => handleEditFile(f.path)}
                        className="bg-white rounded-[12px] p-[16px] text-left shadow-sm hover:shadow-card transition-shadow cursor-pointer"
                      >
                        <p className="font-medium text-[15px] truncate">{f.name}</p>
                        <p className="text-[12px] text-[#999] mt-[4px]">{f.path}</p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content editor */}
        {tab === 'content' && editingFile && (
          <div>
            <div className="flex items-center justify-between mb-[20px]">
              <div>
                <button
                  onClick={() => setEditingFile(null)}
                  className="text-[14px] text-blue hover:underline cursor-pointer mr-[15px]"
                >
                  ← Назад
                </button>
                <span className="text-[18px] font-semibold">{editingFile}</span>
              </div>
              <button
                onClick={handleSaveFile}
                disabled={saving}
                className="bg-blue text-white px-[20px] py-[8px] rounded-btn text-[14px] font-semibold cursor-pointer hover:bg-blue/90 transition-colors disabled:opacity-60"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-[calc(100vh-200px)] bg-white rounded-[12px] p-[20px] font-mono text-[14px] leading-[1.6] border border-[#ddd] outline-none focus:border-blue resize-none"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
