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

export function CasesGrid({ cases, tags }: CasesGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? cases.filter((c) => c.tags.includes(activeTag))
    : cases;

  return (
    <>
      <TagFilter tags={tags} onFilter={setActiveTag} />

      <div className="grid grid-cols-2 gap-[30px] mt-[30px] max-mobile:grid-cols-1">
        {filtered.map((caseItem) => (
          <Link
            key={caseItem.slug}
            href={`/keysy/${caseItem.slug}/`}
            className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-500 overflow-hidden"
          >
            <div className="p-[30px] max-mobile:p-[20px]">
              <div className="flex flex-wrap gap-[8px] mb-[15px]">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-semibold text-blue bg-light-blue px-[10px] py-[4px] rounded-[4px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-[10px] group-hover:text-blue transition-colors">
                {caseItem.title}
              </h3>
              <p className="text-[16px] font-light text-[#666]">
                {caseItem.description}
              </p>
              {caseItem.date && (
                <time className="block mt-[15px] text-[13px] text-[#999]">
                  {new Date(caseItem.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
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
