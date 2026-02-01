'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { megaMenuData } from '@/data/mega-menu';
import { siteConfig } from '@/config/site';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [expandedColumn, setExpandedColumn] = useState<number | null>(null);
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedColumn(null);
      setExpandedCluster(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleColumn = (index: number) => {
    setExpandedColumn(expandedColumn === index ? null : index);
    setExpandedCluster(null);
  };

  const toggleCluster = (key: string) => {
    setExpandedCluster(expandedCluster === key ? null : key);
  };

  return (
    <div
      className="fixed inset-0 z-50 mega-menu-overlay"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-[20px] pt-[30px] pb-[15px] flex items-center justify-between">
          <h2 className="text-white text-[24px] font-semibold max-mobile:text-[20px]">Услуги</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[36px] leading-none transition-colors w-[44px] h-[44px] flex items-center justify-center"
            aria-label="Закрыть меню"
          >
            &times;
          </button>
        </div>

        {/* Desktop grid */}
        <nav className="max-w-[1400px] mx-auto px-[20px] pb-[40px] hidden mobile:block">
          <ul className="grid grid-cols-5 gap-[30px]">
            {megaMenuData.map((column, colIndex) => (
              <li
                key={column.directionSlug}
                className="mega-col"
                style={{ animationDelay: `${colIndex * 0.05}s` }}
              >
                <Link
                  href={`/uslugi/${column.directionSlug}/`}
                  onClick={onClose}
                  className="text-[#0073E6] text-[16px] font-bold uppercase tracking-wide hover:text-[#3d9bff] transition-colors block mb-[20px] pb-[10px] border-b border-white/10"
                >
                  {column.title}
                </Link>

                <ul className="flex flex-col gap-[18px]">
                  {column.clusters.map((cluster) => (
                    <li key={cluster.slug}>
                      <span className="text-white/90 text-[14px] font-semibold block mb-[6px]">
                        {cluster.label}
                      </span>
                      <ul className="flex flex-col gap-[4px]">
                        {cluster.children.map((child) => (
                          <li key={child.slug}>
                            <Link
                              href={`/uslugi/${column.directionSlug}/${child.slug}/`}
                              onClick={onClose}
                              className="text-white/50 text-[13px] hover:text-[#0073E6] transition-colors block py-[2px]"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile accordion */}
        <nav className="mobile:hidden px-[20px] pb-[40px]">
          <ul className="flex flex-col">
            {megaMenuData.map((column, colIndex) => {
              const isColumnOpen = expandedColumn === colIndex;

              return (
                <li key={column.directionSlug} className="border-b border-white/10">
                  <button
                    onClick={() => toggleColumn(colIndex)}
                    className="w-full flex items-center justify-between py-[16px] text-left"
                    aria-expanded={isColumnOpen}
                  >
                    <span className="text-[#0073E6] text-[18px] font-bold">
                      {column.title}
                    </span>
                    <span className={`text-white/40 text-[20px] transition-transform duration-300 ${isColumnOpen ? 'rotate-180' : ''}`}>
                      &#9662;
                    </span>
                  </button>

                  {isColumnOpen && (
                    <div className="pb-[16px] pl-[10px]">
                      <Link
                        href={`/uslugi/${column.directionSlug}/`}
                        onClick={onClose}
                        className="text-white/70 text-[14px] block py-[8px] hover:text-[#0073E6]"
                      >
                        Все услуги направления &rarr;
                      </Link>

                      <ul className="flex flex-col">
                        {column.clusters.map((cluster) => {
                          const clusterKey = `${colIndex}-${cluster.slug}`;
                          const isClusterOpen = expandedCluster === clusterKey;

                          return (
                            <li key={cluster.slug}>
                              <button
                                onClick={() => toggleCluster(clusterKey)}
                                className="w-full flex items-center justify-between py-[10px] text-left"
                                aria-expanded={isClusterOpen}
                              >
                                <span className="text-white/80 text-[15px] font-medium">
                                  {cluster.label}
                                </span>
                                <span className={`text-white/30 text-[16px] transition-transform duration-300 ${isClusterOpen ? 'rotate-180' : ''}`}>
                                  &#9662;
                                </span>
                              </button>

                              {isClusterOpen && (
                                <ul className="pl-[15px] pb-[8px] flex flex-col gap-[2px]">
                                  {cluster.children.map((child) => (
                                    <li key={child.slug}>
                                      <Link
                                        href={`/uslugi/${column.directionSlug}/${child.slug}/`}
                                        onClick={onClose}
                                        className="text-white/50 text-[14px] hover:text-[#0073E6] transition-colors block py-[6px]"
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="max-w-[1400px] mx-auto px-[20px] pb-[30px] flex flex-wrap items-center gap-[20px] border-t border-white/10 pt-[20px]">
          <Link
            href="/uslugi/"
            onClick={onClose}
            className="text-[#0073E6] text-[14px] font-semibold hover:text-[#3d9bff] transition-colors"
          >
            Все услуги
          </Link>
          <Link
            href="/kontakty/"
            onClick={onClose}
            className="text-white/50 text-[14px] hover:text-white transition-colors"
          >
            Контакты
          </Link>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="text-white/70 text-[14px] font-semibold hover:text-white transition-colors ml-auto"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
