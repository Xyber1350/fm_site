'use client';

import { useState } from 'react';
import Link from 'next/link';
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

export function BlogGrid({ posts, tags }: BlogGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      <TagFilter tags={tags} onFilter={setActiveTag} />

      <div className="grid grid-cols-3 gap-[30px] mt-[30px] max-tablet:grid-cols-2 max-mobile:grid-cols-1">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group block bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-500 overflow-hidden"
          >
            <div className="p-[25px] max-mobile:p-[20px]">
              <div className="flex flex-wrap gap-[6px] mb-[12px]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-blue bg-light-blue px-[8px] py-[3px] rounded-[4px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-[20px] mb-[10px] group-hover:text-blue transition-colors max-mobile:text-[18px]">
                {post.title}
              </h3>
              <p className="text-[15px] font-light text-[#666] line-clamp-3">
                {post.description}
              </p>
              <time className="block mt-[15px] text-[13px] text-[#999]">
                {new Date(post.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#999] mt-[40px]">
          Нет статей по выбранному тегу
        </p>
      )}
    </>
  );
}
