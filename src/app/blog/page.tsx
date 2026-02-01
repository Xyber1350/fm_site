import type { Metadata } from 'next';
import { getBlogPosts, getAllTags } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { BlogGrid } from '@/components/content/BlogGrid';

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Экспертные статьи о SEO, контекстной рекламе, маркетинге и разработке сайтов от агентства «Точная механика».',
  openGraph: {
    title: 'Блог — Точная механика',
    description: 'Практические знания digital-маркетинга.',
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getAllTags(posts);

  const serialized = posts.map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    description: p.meta.description,
    tags: p.meta.tags,
    date: p.meta.date,
  }));

  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <div className="max-w-[1200px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Блог' },
          ]}
        />

        <h1 className="mb-[40px]">Блог</h1>
        <p className="text-[20px] font-light mb-[40px] max-w-[800px] max-mobile:text-[16px]">
          Делимся опытом: разбираем реальные задачи, ошибки и решения
          в digital-маркетинге.
        </p>

        <BlogGrid posts={serialized} tags={tags} />
      </div>
    </main>
  );
}
