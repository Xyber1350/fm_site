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
    <main>
      <section className="bg-gray">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px] pt-[20px] pb-[40px] max-mobile:pb-[30px]">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Кейсы' },
            ]}
          />
          <h1 className="mb-[20px]">
            Наши <span>кейсы</span>
          </h1>
          <p className="text-[20px] font-light mb-[10px] max-w-[700px] max-mobile:text-[16px]">
            Не обещания, а результаты. Каждый кейс — это реальный проект
            с измеримыми показателями.
          </p>
        </div>
      </section>

      <section className="mt-[40px] mb-[60px] max-mobile:mt-[20px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <CasesGrid cases={serialized} tags={tags} />
        </div>
      </section>
    </main>
  );
}
