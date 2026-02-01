'use client';

import { useState, useEffect } from 'react';
import { FormField } from './FormField';
import { Button } from '@/components/ui/Button';

interface CallbackFormProps {
  formType?: 'callback' | 'audit' | 'consultation';
  onSuccess?: () => void;
}

export function CallbackForm({
  formType = 'callback',
  onSuccess,
}: CallbackFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+7`;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    if (!value.startsWith('+7')) {
      setPhone('+7');
      return;
    }
    setPhone(formatPhone(value));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Введите имя';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!consent) {
      newErrors.consent = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/form/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ''),
          formType,
          consent,
          timestamp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setName('');
        setPhone('');
        setConsent(false);
        onSuccess?.();
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Произошла ошибка');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Ошибка соединения. Попробуйте позже.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-[20px]">
        <div className="text-[48px] mb-[15px]">&#10003;</div>
        <h4 className="text-[20px] font-semibold mb-[10px]">Заявка отправлена!</h4>
        <p className="text-[16px] font-light text-[#666]">
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormField
        label="Имя"
        name="name"
        value={name}
        onChange={setName}
        placeholder="Как вас зовут?"
        required
        error={errors.name}
      />

      <FormField
        label="Телефон"
        name="phone"
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="+7 (___) ___-__-__"
        required
        error={errors.phone}
      />

      <div className="mb-[20px]">
        <label className="flex items-start gap-[10px] cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-[3px] w-[18px] h-[18px] accent-blue cursor-pointer"
          />
          <span className="text-[13px] text-[#666]">
            Я соглашаюсь на{' '}
            <a
              href="/politika-konfidentsialnosti/"
              target="_blank"
              className="text-blue hover:underline"
            >
              обработку персональных данных
            </a>
          </span>
        </label>
        {errors.consent && (
          <p className="mt-[4px] text-[12px] text-red-500">{errors.consent}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="mb-[15px] text-[14px] text-red-500 text-center">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="blue"
        className={`w-full ${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </Button>
    </form>
  );
}
