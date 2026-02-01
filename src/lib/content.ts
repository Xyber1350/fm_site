import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ServiceMeta, SubServiceMeta, CaseMeta, BlogPostMeta, ContentItem } from '@/types/content';

const contentDir = path.join(process.cwd(), 'content');

function readMdxFiles<T>(dir: string): ContentItem<T>[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith('.mdx'));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(fullPath, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace('.mdx', '');

    return {
      meta: { ...data, slug } as T,
      content,
    };
  });
}

export function getServices(): ContentItem<ServiceMeta>[] {
  return readMdxFiles<ServiceMeta>('services')
    .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
}

export function getServiceBySlug(slug: string): ContentItem<ServiceMeta> | undefined {
  return getServices().find((s) => s.meta.slug === slug);
}

export function getSubServices(parentSlug: string): ContentItem<SubServiceMeta>[] {
  const dir = path.join(contentDir, 'services', parentSlug);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace('.mdx', '');

      return {
        meta: { ...data, slug, parent: parentSlug } as SubServiceMeta,
        content,
      };
    })
    .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
}

export function getSubServiceBySlug(
  parentSlug: string,
  subSlug: string
): ContentItem<SubServiceMeta> | undefined {
  return getSubServices(parentSlug).find((s) => s.meta.slug === subSlug);
}

export function getAllSubServiceParams(): { slug: string; subslug: string }[] {
  const servicesDir = path.join(contentDir, 'services');
  if (!fs.existsSync(servicesDir)) return [];

  const entries = fs.readdirSync(servicesDir, { withFileTypes: true });
  const params: { slug: string; subslug: string }[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subServices = getSubServices(entry.name);
      for (const sub of subServices) {
        params.push({ slug: entry.name, subslug: sub.meta.slug });
      }
    }
  }

  return params;
}

export function getCases(): ContentItem<CaseMeta>[] {
  return readMdxFiles<CaseMeta>('cases')
    .sort((a, b) => (b.meta.date ?? '').localeCompare(a.meta.date ?? ''));
}

export function getCaseBySlug(slug: string): ContentItem<CaseMeta> | undefined {
  return getCases().find((c) => c.meta.slug === slug);
}

export function getBlogPosts(): ContentItem<BlogPostMeta>[] {
  return readMdxFiles<BlogPostMeta>('blog')
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getBlogPostBySlug(slug: string): ContentItem<BlogPostMeta> | undefined {
  return getBlogPosts().find((p) => p.meta.slug === slug);
}

export function getAllTags(items: ContentItem<CaseMeta | BlogPostMeta>[]): string[] {
  const tagSet = new Set<string>();
  items.forEach((item) => {
    if ('tags' in item.meta) {
      item.meta.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}
