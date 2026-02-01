import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: `${post.meta.title} — Точная механика`,
      description: post.meta.description,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      '@type': 'Organization',
      name: 'Точная механика',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Точная механика',
      url: 'https://fine-mechanics.ru',
    },
  };

  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[900px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Блог', href: '/blog/' },
            { label: post.meta.title },
          ]}
        />

        <div className="flex flex-wrap gap-[8px] mb-[20px]">
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-semibold text-blue bg-light-blue px-[12px] py-[5px] rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-[15px]">{post.meta.title}</h1>

        <time className="block mb-[30px] text-[14px] text-[#999]">
          {new Date(post.meta.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <MdxRenderer source={post.content} />

        <div className="mt-[60px] bg-light-blue rounded-card p-[40px] text-center max-mobile:p-[20px]">
          <h2 className="mb-[15px]">Нужна помощь с продвижением?</h2>
          <p className="text-[18px] font-light mb-[30px] text-[#555] max-mobile:text-[16px]">
            Закажите бесплатный аудит вашего сайта
          </p>
          <Button variant="blue" href="/kontakty/">
            Заказать аудит
          </Button>
        </div>
      </article>
    </main>
  );
}
