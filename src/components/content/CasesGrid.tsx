'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faChartLine,
  faBullseye,
  faRocket,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
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

const cardAccents = [
  { bg: 'bg-[#EBF4FF]', iconColor: 'text-blue', border: 'border-blue/10' },
  { bg: 'bg-[#F0F7F0]', iconColor: 'text-[#2E7D32]', border: 'border-[#2E7D32]/10' },
  { bg: 'bg-[#FFF3E0]', iconColor: 'text-[#E65100]', border: 'border-[#E65100]/10' },
  { bg: 'bg-[#F3E5F5]', iconColor: 'text-[#7B1FA2]', border: 'border-[#7B1FA2]/10' },
  { bg: 'bg-[#E0F7FA]', iconColor: 'text-[#00838F]', border: 'border-[#00838F]/10' },
];

const cardIcons = [faGear, faChartLine, faBullseye, faRocket, faCog];

export function CasesGrid({ cases, tags }: CasesGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? cases.filter((c) => c.tags.includes(activeTag))
    : cases;

  return (
    <>
      <TagFilter tags={tags} onFilter={setActiveTag} />

      <div className="grid grid-cols-2 gap-[25px] mt-[30px] max-mobile:grid-cols-1">
        {filtered.map((caseItem, index) => {
          const accent = cardAccents[index % cardAccents.length];
          const icon = cardIcons[index % cardIcons.length];

          return (
            <Link
              key={caseItem.slug}
              href={`/keysy/${caseItem.slug}/`}
              className="group block rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-[3px] bg-white"
            >
              {/* Light header */}
              <div className={`${accent.bg} ${accent.border} border-b p-[25px] max-mobile:p-[20px] relative overflow-hidden`}>
                {/* Subtle icon watermark */}
                <div className="absolute top-[-10px] right-[-10px] opacity-[0.06]">
                  <FontAwesomeIcon
                    icon={icon}
                    className={`text-[90px] ${accent.iconColor} max-mobile:text-[65px]`}
                  />
                </div>

                {/* Icon badge + number */}
                <div className="flex items-center gap-[10px] mb-[14px] relative z-10">
                  <div className={`w-[36px] h-[36px] rounded-[8px] ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                    <FontAwesomeIcon
                      icon={icon}
                      className={`text-[15px] ${accent.iconColor}`}
                    />
                  </div>
                  <span className="text-[13px] font-bold text-black/20 tracking-wider">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-[6px] mb-[12px] relative z-10">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-blue bg-white/70 px-[10px] py-[4px] rounded-[4px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-[22px] leading-[1.2] relative z-10 max-mobile:text-[18px]">
                  {caseItem.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-[25px] max-mobile:p-[20px]">
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
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#999] mt-[40px]">
          Нет кейсов по выбранному тегу
        </p>
      )}
    </>
  );
}
