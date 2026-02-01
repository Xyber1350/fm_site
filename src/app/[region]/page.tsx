import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRegions, getRegionBySlug } from '@/lib/regions';
import { getServices } from '@/lib/content';
import { generateRegionMainContent } from '@/lib/region-content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  const regions = getRegions();
  return regions.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};

  return {
    title: `Интернет-маркетинг ${region.nameIn}`,
    description: `SEO-продвижение, контекстная реклама, создание сайтов ${region.nameIn}. Агентство «Точная механика» — результат в заявках и продажах.`,
    openGraph: {
      title: `Интернет-маркетинг ${region.nameIn} — Точная механика`,
      description: `Digital-маркетинг для бизнеса ${region.nameGen}. SEO, реклама, разработка сайтов.`,
    },
  };
}

export default async function RegionPage({ params }: PageProps) {
  const { region: slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) notFound();

  const services = getServices();
  const content = generateRegionMainContent(region);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${siteConfig.name} — ${region.name}`,
    description: content.intro,
    areaServed: {
      '@type': 'City',
      name: region.name,
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1200px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: region.name },
          ]}
        />

        <h1 className="mb-[20px]">
          Интернет-маркетинг {region.nameIn}
        </h1>
        <p className="text-[20px] font-light mb-[50px] max-w-[900px] max-mobile:text-[16px]">
          {content.intro}
        </p>

        {/* Services grid */}
        <h2 className="mb-[30px]">Наши услуги {region.nameIn}</h2>
        <div className="grid grid-cols-3 gap-[30px] mb-[60px] max-tablet:grid-cols-2 max-mobile:grid-cols-1">
          {services.map((service) => (
            <ServiceCard
              key={service.meta.slug}
              title={`${service.meta.title} ${region.nameIn}`}
              description={service.meta.description}
              href={`/${region.slug}/${service.meta.slug}/`}
              image={service.meta.image || '/images/content/services/seo.webp'}
            />
          ))}
        </div>

        {/* Advantages */}
        <section className="bg-gray rounded-card p-[40px] mb-[60px] max-mobile:p-[20px]">
          <h2 className="mb-[30px] text-center">Почему выбирают нас {region.nameIn}</h2>
          <div className="grid grid-cols-2 gap-[20px] max-mobile:grid-cols-1">
            {content.advantages.map((adv, i) => (
              <div key={i} className="flex gap-[12px] items-start">
                <span className="text-blue text-[24px] font-bold leading-none mt-[2px]">✓</span>
                <p className="text-[18px] font-light max-mobile:text-[16px]">{adv}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue rounded-card p-[40px] text-white text-center max-mobile:p-[20px]">
          <h2 className="text-white mb-[15px]">{content.cta}</h2>
          <p className="text-[18px] font-light mb-[30px] opacity-90 max-mobile:text-[16px]">
            Оставьте заявку — мы проведём бесплатный аудит и предложим стратегию продвижения {region.nameIn}
          </p>
          <Button variant="white" href="/kontakty/">
            Оставить заявку
          </Button>
        </div>

        {/* Other regions */}
        <section className="mt-[60px]">
          <h2 className="mb-[20px]">Работаем по всей России</h2>
          <p className="text-[18px] font-light mb-[30px] max-mobile:text-[16px]">
            Помимо {region.nameGen}, мы оказываем услуги digital-маркетинга в 80+ городах России.
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {getRegions()
              .filter((r) => r.isKeyCity && r.slug !== region.slug)
              .slice(0, 12)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}/`}
                  className="px-[14px] py-[7px] bg-light-blue text-blue text-[14px] font-medium rounded-[20px] hover:bg-blue hover:text-white transition-colors"
                >
                  {r.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
