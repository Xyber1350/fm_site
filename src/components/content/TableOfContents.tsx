'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <nav className="bg-[#F8F9FA] border border-[#e0e0e0] rounded-[12px] p-[20px] mb-[35px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faListUl} className="text-[14px] text-blue" />
          <span className="text-[16px] font-bold">Содержание</span>
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-[12px] text-[#999] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="mt-[14px] flex flex-col gap-[8px] list-none pl-0">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-[15px] font-light text-[#555] hover:text-blue transition-colors leading-[1.4] ${
                  item.level === 3 ? 'pl-[18px] text-[14px]' : ''
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
