'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassChart,
  faBullhorn,
  faLaptopCode,
  faStethoscope,
  faNewspaper,
  faPenNib,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { TagFilter } from '@/components/ui/TagFilter';

interface BlogItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

interface BlogGridProps {
  posts: BlogItem[];
  tags: string[];
}

const tagStyles: Record<string, { bg: string; iconColor: string; icon: IconDefinition }> = {
  'SEO': { bg: 'bg-[#EBF4FF]', iconColor: 'text-blue', icon: faMagnifyingGlassChart },
  'Маркетинг': { bg: 'bg-[#FFF3E0]', iconColor: 'text-[#E65100]', icon: faBullhorn },
  'Реклама': { bg: 'bg-[#F3E5F5]', iconColor: 'text-[#7B1FA2]', icon: faBullhorn },
  'Яндекс.Директ': { bg: 'bg-[#FFF8E1]', iconColor: 'text-[#F57F17]', icon: faBullhorn },
  'Медицина': { bg: 'bg-[#E8F5E9]', iconColor: 'text-[#2E7D32]', icon: faStethoscope },
  'Создание сайтов': { bg: 'bg-[#E0F7FA]', iconColor: 'text-[#00838F]', icon: faLaptopCode },
};

const defaultStyle = { bg: 'bg-[#F5F5F5]', iconColor: 'text-[#666]', icon: faNewspaper };

function getPostStyle(tags: string[]) {
  for (const tag of tags) {
    if (tagStyles[tag]) return tagStyles[tag];
  }
  return defaultStyle;
}

export function BlogGrid({ posts, tags }: BlogGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      <TagFilter tags={tags} onFilter={setActiveTag} />

      <div className="grid grid-cols-3 gap-[25px] mt-[30px] max-tablet:grid-cols-2 max-mobile:grid-cols-1">
        {filtered.map((post) => {
          const style = getPostStyle(post.tags);

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden hover:-translate-y-[3px]"
            >
              {/* Colored header strip */}
              <div className={`${style.bg} px-[25px] py-[18px] max-mobile:px-[20px] max-mobile:py-[14px] relative overflow-hidden border-b border-black/5`}>
                {/* Subtle watermark icon */}
                <div className="absolute top-[-8px] right-[-8px] opacity-[0.06]">
                  <FontAwesomeIcon
                    icon={style.icon}
                    className={`text-[70px] ${style.iconColor}`}
                  />
                </div>

                <div className="flex items-center gap-[8px] relative z-10">
                  <FontAwesomeIcon
                    icon={style.icon}
                    className={`text-[14px] ${style.iconColor}`}
                  />
                  <div className="flex flex-wrap gap-[6px]">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-blue bg-white/70 px-[8px] py-[3px] rounded-[4px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-[25px] max-mobile:p-[20px]">
                <h3 className="text-[20px] leading-[1.3] mb-[10px] group-hover:text-blue transition-colors max-mobile:text-[18px]">
                  {post.title}
                </h3>
                <p className="text-[15px] font-light text-[#555] leading-[1.6] line-clamp-3 mb-[15px]">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-[13px] text-[#999]">
                    {new Date(post.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-[13px] font-semibold text-blue group-hover:translate-x-[5px] transition-transform duration-300">
                    Читать &rarr;
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#999] mt-[40px]">
          Нет статей по выбранному тегу
        </p>
      )}
    </>
  );
}
