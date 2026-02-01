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
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0a0a1a] to-[#0f3460] text-white">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px] py-[20px]">
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
                className="text-[12px] font-bold text-white/90 bg-white/15 backdrop-blur-sm px-[12px] py-[5px] rounded-[4px] uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-[42px] font-bold text-white leading-[1.15] mb-[15px] max-mobile:text-[28px]">
            {caseItem.meta.title}
          </h1>

          <p className="text-[20px] font-light opacity-80 max-w-[700px] mb-[15px] max-mobile:text-[16px]">
            {caseItem.meta.description}
          </p>

          {caseItem.meta.date && (
            <time className="block text-[14px] text-white/50 pb-[10px]">
              {new Date(caseItem.meta.date).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="mt-[40px] mb-[60px] max-mobile:mt-[30px] max-mobile:mb-[40px]">
        <div className="max-w-[800px] mx-auto px-[20px]">
          <MdxRenderer source={caseItem.content} />
        </div>
      </section>

      {/* CTA */}
      <section className="mb-[60px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <div
            className="bg-blue rounded-card p-[50px] text-white text-center max-mobile:p-[25px]"
            style={{ backgroundImage: 'url(/images/bg/bg-blue-block.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <h2 className="text-white mb-[15px]">Хотите такой же результат?</h2>
            <p className="text-[18px] font-light mb-[30px] opacity-90 max-mobile:text-[16px]">
              Расскажите о вашем проекте — мы предложим стратегию роста
            </p>
            <Button variant="white" href="/kontakty/">
              Обсудить проект
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
