import type { MetadataRoute } from 'next';
import { getServices } from '@/lib/content';
import { getCases } from '@/lib/content';
import { getBlogPosts } from '@/lib/content';
import { getRegions } from '@/lib/regions';

const BASE_URL = 'https://fine-mechanics.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const cases = getCases();
  const posts = getBlogPosts();
  const regions = getRegions();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/uslugi/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/keysy/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakty/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/politika-konfidentsialnosti/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/uslugi/${s.meta.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const casePages: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${BASE_URL}/keysy/${c.meta.slug}/`,
    lastModified: c.meta.date ? new Date(c.meta.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.meta.slug}/`,
    lastModified: new Date(p.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const regionPages: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${BASE_URL}/${r.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: r.isKeyCity ? 0.8 : 0.6,
  }));

  const regionServicePages: MetadataRoute.Sitemap = regions.flatMap((r) =>
    services.map((s) => ({
      url: `${BASE_URL}/${r.slug}/${s.meta.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: r.isKeyCity ? 0.7 : 0.5,
    }))
  );

  return [
    ...staticPages,
    ...servicePages,
    ...casePages,
    ...blogPages,
    ...regionPages,
    ...regionServicePages,
  ];
}
