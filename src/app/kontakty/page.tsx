import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CallbackForm } from '@/components/forms/CallbackForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с агентством «Точная механика». Адрес, телефон, форма обратной связи.',
};

export default function KontaktyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHours: siteConfig.workingHoursSchema,
    url: siteConfig.url,
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
            { label: 'Контакты' },
          ]}
        />

        <h1 className="mb-[40px]">Контакты</h1>

        <div className="grid grid-cols-2 gap-[60px] max-mobile:grid-cols-1 max-mobile:gap-[40px]">
          <div>
            <h2 className="text-[28px] mb-[30px]">Свяжитесь с нами</h2>

            <div className="space-y-[20px] mb-[40px]">
              <div>
                <p className="text-[14px] font-medium text-[#999] mb-[4px]">Телефон</p>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-[22px] font-semibold text-blue hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <p className="text-[14px] font-medium text-[#999] mb-[4px]">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[18px] text-blue hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <p className="text-[14px] font-medium text-[#999] mb-[4px]">Адрес</p>
                <p className="text-[18px]">
                  {siteConfig.address.city}, {siteConfig.address.street}
                </p>
              </div>

              <div>
                <p className="text-[14px] font-medium text-[#999] mb-[4px]">
                  Режим работы
                </p>
                <p className="text-[18px]">{siteConfig.workingHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray rounded-card p-[30px] max-mobile:p-[20px]">
            <h2 className="text-[24px] mb-[20px] text-center">Оставьте заявку</h2>
            <p className="text-[16px] font-light text-[#666] mb-[25px] text-center">
              Мы свяжемся с вами в течение рабочего дня
            </p>
            <CallbackForm formType="consultation" />
          </div>
        </div>
      </div>
    </main>
  );
}
