import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCases, getCaseBySlug } from '@/lib/content';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cases = getCases();
  return cases.map((c) => ({ slug: c.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) return {};

  return {
    title: caseItem.meta.title,
    description: caseItem.meta.description,
    openGraph: {
      title: `${caseItem.meta.title} — Точная механика`,
      description: caseItem.meta.description,
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) notFound();

  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <div className="max-w-[900px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Кейсы', href: '/keysy/' },
            { label: caseItem.meta.title },
          ]}
        />

        <div className="flex flex-wrap gap-[8px] mb-[20px]">
          {caseItem.meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-semibold text-blue bg-light-blue px-[12px] py-[5px] rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-[15px]">{caseItem.meta.title}</h1>

        {caseItem.meta.date && (
          <time className="block mb-[30px] text-[14px] text-[#999]">
            {new Date(caseItem.meta.date).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}

        <p className="text-[20px] font-light mb-[40px] text-[#555] max-mobile:text-[16px]">
          {caseItem.meta.description}
        </p>

        <MdxRenderer source={caseItem.content} />

        <div className="mt-[60px] bg-blue rounded-card p-[40px] text-white text-center max-mobile:p-[20px]">
          <h2 className="text-white mb-[15px]">Хотите такой же результат?</h2>
          <p className="text-[18px] font-light mb-[30px] opacity-90 max-mobile:text-[16px]">
            Расскажите о вашем проекте — мы предложим стратегию роста
          </p>
          <Button variant="white" href="/kontakty/">
            Обсудить проект
          </Button>
        </div>
      </div>
    </main>
  );
}
