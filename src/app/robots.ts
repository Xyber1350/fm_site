import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/data/', '/admin/'],
      },
    ],
    sitemap: 'https://fine-mechanics.ru/sitemap.xml',
    host: 'https://fine-mechanics.ru',
  };
}
