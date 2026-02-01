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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gray">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px] pt-[20px] pb-[30px]">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Блог', href: '/blog/' },
              { label: post.meta.title },
            ]}
          />

          <div className="flex flex-wrap gap-[8px] mb-[15px]">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] font-semibold text-blue bg-light-blue px-[12px] py-[5px] rounded-[4px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-[42px] font-bold text-blue leading-[1.15] mb-[15px] max-mobile:text-[28px]">
            {post.meta.title}
          </h1>

          <p className="text-[18px] font-light max-w-[700px] mb-[10px] max-mobile:text-[16px]">
            {post.meta.description}
          </p>

          <time className="block text-[14px] text-[#999]">
            {new Date(post.meta.date).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </section>

      {/* Content */}
      <section className="mt-[40px] mb-[60px] max-mobile:mt-[30px] max-mobile:mb-[40px]">
        <article className="max-w-[800px] mx-auto px-[20px]">
          <MdxRenderer source={post.content} />
        </article>
      </section>

      {/* CTA */}
      <section className="mb-[60px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <div
            className="bg-blue rounded-card p-[50px] text-white text-center max-mobile:p-[25px]"
            style={{ backgroundImage: 'url(/images/bg/bg-blue-block.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <h2 className="text-white mb-[15px]">Нужна помощь с продвижением?</h2>
            <p className="text-[18px] font-light mb-[30px] opacity-90 max-mobile:text-[16px]">
              Закажите бесплатный аудит вашего сайта
            </p>
            <Button variant="white" href="/kontakty/">
              Заказать аудит
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
