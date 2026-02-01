'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TagFilter } from '@/components/ui/TagFilter';

interface CaseItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date?: string;
}

interface CasesGridProps {
  cases: CaseItem[];
  tags: string[];
}

const cardGradients = [
  'from-[#0073E6] to-[#005bb5]',
  'from-[#1a1a2e] to-[#16213e]',
  'from-[#0f3460] to-[#1a1a40]',
  'from-[#005bb5] to-[#003d7a]',
  'from-[#16213e] to-[#0f3460]',
];

export function CasesGrid({ cases, tags }: CasesGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? cases.filter((c) => c.tags.includes(activeTag))
    : cases;

  return (
    <>
      <TagFilter tags={tags} onFilter={setActiveTag} />

      <div className="grid grid-cols-2 gap-[25px] mt-[30px] max-mobile:grid-cols-1">
        {filtered.map((caseItem, index) => (
          <Link
            key={caseItem.slug}
            href={`/keysy/${caseItem.slug}/`}
            className="group block rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-[3px]"
          >
            {/* Gradient header */}
            <div className={`bg-gradient-to-r ${cardGradients[index % cardGradients.length]} p-[25px] max-mobile:p-[20px] relative overflow-hidden`}>
              <div className="absolute top-[-10px] right-[-10px] text-[120px] font-black text-white/5 leading-none select-none max-mobile:text-[80px]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex flex-wrap gap-[6px] mb-[12px] relative z-10">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-bold text-white/90 bg-white/15 backdrop-blur-sm px-[10px] py-[4px] rounded-[4px] uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-white text-[22px] leading-[1.2] relative z-10 max-mobile:text-[18px]">
                {caseItem.title}
              </h3>
            </div>

            {/* Content */}
            <div className="bg-white p-[25px] max-mobile:p-[20px]">
              <p className="text-[15px] font-light text-[#555] leading-[1.6] mb-[15px]">
                {caseItem.description}
              </p>
              <div className="flex items-center justify-between">
                {caseItem.date && (
                  <time className="text-[13px] text-[#999]">
                    {new Date(caseItem.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </time>
                )}
                <span className="text-[13px] font-semibold text-blue group-hover:translate-x-[5px] transition-transform duration-300">
                  Подробнее &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#999] mt-[40px]">
          Нет кейсов по выбранному тегу
        </p>
      )}
    </>
  );
}
