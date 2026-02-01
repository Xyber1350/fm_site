import type { Metadata } from 'next';
import { getCases, getAllTags } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CasesGrid } from '@/components/content/CasesGrid';

export const metadata: Metadata = {
  title: 'Кейсы',
  description: 'Реальные результаты наших клиентов: рост заявок, снижение стоимости лида, увеличение органического трафика.',
  openGraph: {
    title: 'Кейсы — Точная механика',
    description: 'Портфолио проектов агентства «Точная механика».',
  },
};

export default function KeysyPage() {
  const cases = getCases();
  const tags = getAllTags(cases);

  const serialized = cases.map((c) => ({
    slug: c.meta.slug,
    title: c.meta.title,
    description: c.meta.description,
    tags: c.meta.tags,
    date: c.meta.date,
  }));

  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <div className="max-w-[1200px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Кейсы' },
          ]}
        />

        <h1 className="mb-[40px]">Кейсы</h1>
        <p className="text-[20px] font-light mb-[40px] max-w-[800px] max-mobile:text-[16px]">
          Не обещания, а результаты. Каждый кейс — это реальный проект
          с измеримыми показателями.
        </p>

        <CasesGrid cases={serialized} tags={tags} />
      </div>
    </main>
  );
}
