import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://fine-mechanics.ru${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-[30px]" aria-label="Хлебные крошки">
        <ol className="flex flex-wrap gap-[8px] text-[14px] text-[#666] list-none p-0">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-[8px]">
              {index > 0 && <span className="text-[#ccc]">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-blue transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-black font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
