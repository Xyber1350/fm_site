import type { Metadata } from 'next';
import { Suspense } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import { siteConfig } from '@/config/site';
import './globals.css';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Полный спектр маркетинговых услуг для вашего бизнеса`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  verification: {
    yandex: siteConfig.yandexVerification,
  },
  icons: {
    icon: [
      { url: '/fav.svg', type: 'image/svg+xml' },
      { url: '/fav.ico', type: 'image/x-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/images/logo/logo.svg`,
              telephone: siteConfig.phone,
              description: siteConfig.description,
              address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.address.street,
                addressLocality: siteConfig.address.city,
                postalCode: siteConfig.address.postalCode,
                addressCountry: siteConfig.address.country,
              },
              openingHours: siteConfig.workingHoursSchema,
              areaServed: 'RU',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
