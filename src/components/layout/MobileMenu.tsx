'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, navigation } from '@/config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-[80%] max-w-[400px] bg-white p-[30px] shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-[40px]">
          <Link href="/" onClick={onClose}>
            <Image
              src="/images/logo/logo.svg"
              alt={siteConfig.name}
              width={100}
              height={34}
            />
          </Link>
          <button
            onClick={onClose}
            className="text-[30px] leading-none text-black hover:text-blue transition-colors"
            aria-label="Закрыть меню"
          >
            &times;
          </button>
        </div>

        <nav>
          <ul className="flex flex-col gap-[20px]">
            {navigation.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="text-[20px] font-medium text-blue hover:opacity-70 transition-opacity"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-[40px]">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="text-[20px] font-bold text-black"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
