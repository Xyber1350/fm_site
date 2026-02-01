import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 800, 1200, 1400],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old Bitrix service URLs -> new URLs
      { source: '/uslugi/seo-prodvizhenie/', destination: '/uslugi/seo/', permanent: true },
      { source: '/uslugi/sozdanie-saytov/', destination: '/uslugi/razrabotka-saytov/', permanent: true },
      { source: '/uslugi/vedenie-kontekstnoy-reklamy/', destination: '/uslugi/kontekstnaya-reklama/', permanent: true },
      { source: '/uslugi/targetirovannaya-reklama-i-smm/', destination: '/uslugi/targeting/', permanent: true },
      { source: '/uslugi/analitika-i-dashbord/', destination: '/uslugi/smm/', permanent: true },
      { source: '/uslugi/otzyvy-i-reputatsiya/', destination: '/uslugi/serm/', permanent: true },

      // Old Bitrix case URLs -> new URLs
      { source: '/keysy/razvitie-sales-kanalov-dlya-federalnoy-seti-gruzovogo-servisa/', destination: '/keysy/razvitie-sales-kanalov-dlya-federalnoy-seti/', permanent: true },

      // Common old patterns
      { source: '/about/', destination: '/', permanent: true },
      { source: '/o-kompanii/', destination: '/', permanent: true },
      { source: '/contacts/', destination: '/kontakty/', permanent: true },
      { source: '/privacy-policy/', destination: '/politika-konfidentsialnosti/', permanent: true },

      // Bitrix system URLs
      { source: '/bitrix/:path*', destination: '/', permanent: true },
      { source: '/local/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
