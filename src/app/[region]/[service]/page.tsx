import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRegions, getRegionBySlug } from '@/lib/regions';
import { getServices, getServiceBySlug } from '@/lib/content';
import { generateRegionContent } from '@/lib/region-content';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ region: string; service: string }>;
}

export async function generateStaticParams() {
  const regions = getRegions();
  const services = getServices();

  const params: { region: string; service: string }[] = [];
  for (const region of regions) {
    for (const service of services) {
      params.push({ region: region.slug, service: service.meta.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: regionSlug, service: serviceSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  const service = getServiceBySlug(serviceSlug);

  if (!region || !service) return {};

  return {
    title: `${service.meta.title} ${region.nameIn}`,
    description: `${service.meta.title} ${region.nameIn} от агентства «Точная механика». ${service.meta.description}`,
    openGraph: {
      title: `${service.meta.title} ${region.nameIn} — Точная механика`,
      description: `${service.meta.description} Работаем с бизнесом ${region.nameGen}.`,
    },
  };
}

export default async function RegionServicePage({ params }: PageProps) {
  const { region: regionSlug, service: serviceSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  const service = getServiceBySlug(serviceSlug);

  if (!region || !service) notFound();

  const content = generateRegionContent(region, service.meta);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.meta.title} ${region.nameIn}`,
    description: content.intro,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'City',
      name: region.name,
    },
  };

  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[900px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: region.name, href: `/${region.slug}/` },
            { label: service.meta.title },
          ]}
        />

        <h1 className="mb-[20px]">
          {service.meta.title} {region.nameIn}
        </h1>
        <p className="text-[20px] font-light mb-[40px] text-[#555] max-mobile:text-[16px]">
          {content.intro}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-[20px] mb-[50px] max-mobile:grid-cols-2">
          {content.stats.map((stat, i) => (
            <div key={i} className="text-center bg-light-blue rounded-card p-[20px]">
              <p className="text-[32px] font-bold text-blue max-mobile:text-[24px]">{stat.value}</p>
              <p className="text-[14px] font-light text-[#666] mt-[5px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main service content */}
        <MdxRenderer source={service.content} />

        {/* Regional advantages */}
        <section className="mt-[50px] bg-gray rounded-card p-[30px] max-mobile:p-[20px]">
          <h2 className="mb-[25px]">Преимущества работы с нами {region.nameIn}</h2>
          <ul className="flex flex-col gap-[15px]">
            {content.advantages.map((adv, i) => (
              <li key={i} className="flex gap-[12px] items-start">
                <span className="text-blue text-[20px] font-bold leading-none mt-[2px]">✓</span>
                <p className="text-[18px] font-light max-mobile:text-[16px]">{adv}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Other services in this region */}
        <section className="mt-[50px]">
          <h2 className="mb-[20px]">Другие услуги {region.nameIn}</h2>
          <div className="flex flex-wrap gap-[10px]">
            {getServices()
              .filter((s) => s.meta.slug !== service.meta.slug)
              .map((s) => (
                <Link
                  key={s.meta.slug}
                  href={`/${region.slug}/${s.meta.slug}/`}
                  className="px-[14px] py-[7px] bg-light-blue text-blue text-[14px] font-medium rounded-[20px] hover:bg-blue hover:text-white transition-colors"
                >
                  {s.meta.title}
                </Link>
              ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-[50px] bg-blue rounded-card p-[40px] text-white text-center max-mobile:p-[20px]">
          <h2 className="text-white mb-[15px]">{content.cta}</h2>
          <p className="text-[18px] font-light mb-[30px] opacity-90 max-mobile:text-[16px]">
            {service.meta.title} {region.nameIn} — оставьте заявку и получите стратегию роста
          </p>
          <Button variant="white" href="/kontakty/">
            Обсудить проект
          </Button>
        </div>
      </div>
    </main>
  );
}
