'use client';

import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
  onFilter?: (tag: string | null) => void;
}

export function TagFilter({ tags, onFilter }: TagFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  if (tags.length === 0) return null;

  const handleClick = (tag: string | null) => {
    setActive(tag);
    onFilter?.(tag);
  };

  return (
    <div className="flex flex-wrap gap-[10px]">
      <button
        onClick={() => handleClick(null)}
        className={`px-[16px] py-[8px] rounded-[20px] text-[14px] font-medium transition-colors cursor-pointer ${
          active === null
            ? 'bg-blue text-white'
            : 'bg-gray text-[#666] hover:bg-light-blue hover:text-blue'
        }`}
      >
        Все
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleClick(active === tag ? null : tag)}
          className={`px-[16px] py-[8px] rounded-[20px] text-[14px] font-medium transition-colors cursor-pointer ${
            active === tag
              ? 'bg-blue text-white'
              : 'bg-gray text-[#666] hover:bg-light-blue hover:text-blue'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
