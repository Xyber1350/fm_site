import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getServiceBySlug,
  getSubServiceBySlug,
  getAllSubServiceParams,
} from '@/lib/content';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string; subslug: string }>;
}

export async function generateStaticParams() {
  return getAllSubServiceParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subslug } = await params;
  const subService = getSubServiceBySlug(slug, subslug);
  if (!subService) return {};

  return {
    title: `${subService.meta.title} — Точная механика`,
    description: subService.meta.description,
    openGraph: {
      title: `${subService.meta.title} — Точная механика`,
      description: subService.meta.description,
    },
  };
}

export default async function SubServicePage({ params }: PageProps) {
  const { slug, subslug } = await params;
  const parentService = getServiceBySlug(slug);
  const subService = getSubServiceBySlug(slug, subslug);

  if (!subService || !parentService) notFound();

  return (
    <main>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg/home-bg.webp)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-[20px] py-[20px]">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги', href: '/uslugi/' },
              { label: parentService.meta.title, href: `/uslugi/${slug}/` },
              { label: subService.meta.title },
            ]}
          />
          <h1 className="mb-[20px] text-[62px] max-mobile:text-[36px]">
            {subService.meta.title}
          </h1>
          <p className="text-[20px] font-light mb-[30px] max-w-[700px] max-mobile:text-[16px]">
            {subService.meta.description}
          </p>
          <Button variant="blue" href="/kontakty/">
            Заказать звонок
          </Button>
        </div>
      </section>

      {/* MDX content */}
      {subService.content && subService.content.trim().length > 0 && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <MdxRenderer source={subService.content} />
          </div>
        </section>
      )}

      {/* Blue CTA */}
      <section className="mt-[60px] mb-[60px] max-mobile:mt-[40px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <div
            className="border border-blue bg-blue text-white shadow-card rounded-card overflow-hidden"
            style={{ backgroundImage: 'url(/images/bg/bg-blue-block.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="flex flex-wrap">
              <div className="flex-[1_1_calc(50%-0px)] p-[40px] max-mobile:flex-[1_1_100%] max-mobile:p-[25px]">
                <h2 className="text-white mb-[15px]">Нестандартные стратегии</h2>
                <p className="text-[18px] font-light opacity-90 max-mobile:text-[16px]">
                  Существует множество способов продвижения в интернете и далеко не все они основаны на общеизвестных инструментах. Мы разрабатываем долгосрочные стратегии устойчивого развития бизнеса
                </p>
              </div>
              <div className="flex-[1_1_calc(50%-0px)] p-[40px] border-l border-white/20 max-mobile:flex-[1_1_100%] max-mobile:p-[25px] max-mobile:border-l-0 max-mobile:border-t max-mobile:border-white/20">
                <h3 className="text-white mb-[10px] border-b border-white/30 pb-[10px]">Хотите подробностей?</h3>
                <p className="text-[18px] font-light opacity-90 mb-[20px] max-mobile:text-[16px]">
                  Оставьте заявку на онлайн встречу и мы расскажем о том, как стать лидером в своей нише
                </p>
                <Button variant="white" href="/kontakty/">
                  Онлайн встреча
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
