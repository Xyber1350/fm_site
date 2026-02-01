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
    <main>
      <section className="bg-gray">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px] pt-[20px] pb-[40px] max-mobile:pb-[30px]">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Блог' },
            ]}
          />
          <h1 className="mb-[20px]">
            Наш <span>блог</span>
          </h1>
          <p className="text-[20px] font-light mb-[10px] max-w-[700px] max-mobile:text-[16px]">
            Делимся опытом: разбираем реальные задачи, ошибки и решения
            в digital-маркетинге.
          </p>
        </div>
      </section>

      <section className="mt-[40px] mb-[60px] max-mobile:mt-[20px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <BlogGrid posts={serialized} tags={tags} />
        </div>
      </section>
    </main>
  );
}
