import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServices, getServiceBySlug } from '@/lib/content';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { serviceSections } from '@/data/service-sections';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stepLabels = [
  'Анализ', 'Планирование', 'Тестирование', 'Опять анализ',
  'Улучшение', 'Реализация', 'Масштабирование', 'Результат',
];

const stepCards = [
  { title: 'Никаких волшебных таблеток', text: 'Каждый бизнес уникален и нет универсальных инструментов, подходящих любому бизнесу' },
  { title: 'Команда профи в своих областях', text: 'Мы не стремимся набрать «Много работы», мы берем мало проектов, но делаем их с «полным погружением»' },
  { title: 'Прозрачность выполненных работ', text: 'Предоставляем отчеты в обговоренный период, а также даем все необходимые доступы заказчику' },
  { title: 'Системный подход к бизнесу', text: 'Мы проанализируем бизнес и нишу, а также составим правильный план действий для достижения целей' },
];

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.meta.title} — Точная механика`,
    description: service.meta.description,
    openGraph: {
      title: `${service.meta.title} — Точная механика`,
      description: service.meta.description,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const sections = serviceSections[slug];
  const titleParts = service.meta.title.split(' ');
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(' ');

  return (
    <main>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg/home-bg.webp)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-[20px] py-[20px]">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги', href: '/uslugi/' },
              { label: service.meta.title },
            ]}
          />
          <h1 className="mb-[20px]">
            {titleFirst} <span>{titleRest}</span>
          </h1>
          {sections?.heroBullets && (
            <ul className="mb-[30px] flex flex-col gap-[10px]">
              {sections.heroBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-[10px] text-[18px] font-light max-mobile:text-[16px]">
                  <Image src="/images/icons/gear1.svg" alt="" width={20} height={20} className="mt-[4px] shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          <Button variant="blue" href="/kontakty/">
            Заказать звонок
          </Button>
        </div>
      </section>

      {/* Dot-work section */}
      {sections?.dotWork && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <h2 className="mb-[20px]">{sections.dotWork.title}</h2>
            {sections.dotWork.paragraphs.map((p, i) => (
              <p key={i} className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">{p}</p>
            ))}
            {sections.dotWork.listTitle && (
              <h3 className="mt-[20px] mb-[10px]">{sections.dotWork.listTitle}</h3>
            )}
            {sections.dotWork.listItems && (
              <ul className="mb-[15px] flex flex-col gap-[8px] list-disc pl-[20px]">
                {sections.dotWork.listItems.map((item, i) => (
                  <li key={i} className="text-[18px] font-light max-mobile:text-[16px]">{item}</li>
                ))}
              </ul>
            )}
            {sections.dotWork.afterText && (
              <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">{sections.dotWork.afterText}</p>
            )}
            {sections.dotWork.buttonText && (
              <Button variant="blue" href="/kontakty/">
                {sections.dotWork.buttonText}
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Needs section - icon cards */}
      {sections?.needs && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <div className="flex flex-wrap gap-[30px] max-mobile:gap-[20px]">
              {/* Left: title + text */}
              <div className="flex-[1_1_calc(40%-15px)] max-mobile:flex-[1_1_100%]">
                <h2 className="mb-[20px]">{sections.needs.title}</h2>
                {sections.needs.paragraphs.map((p, i) => (
                  <p key={i} className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">{p}</p>
                ))}
              </div>
              {/* Right: icon cards */}
              <div className="flex-[1_1_calc(60%-15px)] max-mobile:flex-[1_1_100%]">
                <div className="flex flex-wrap gap-[15px]">
                  {sections.needs.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex-[1_1_calc(50%-8px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[20px] flex gap-[15px]"
                    >
                      <div className="shrink-0 w-[50px] h-[50px]">
                        <Image src={item.icon} alt="" width={50} height={50} />
                      </div>
                      <div>
                        <h4 className="mb-[8px]">{item.title}</h4>
                        <p className="text-[16px] font-light">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Step-block items (serm specific) */}
      {sections?.stepBlock && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <h2 className="mb-[30px]">{sections.stepBlock.title}</h2>
            <div className="flex flex-wrap gap-[20px]">
              {sections.stepBlock.items.map((item, i) => (
                <div
                  key={i}
                  className="flex-[1_1_calc(33.333%-14px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[25px]"
                >
                  <h3 className="mb-[10px]">{item.title}</h3>
                  <p className="text-[16px] font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* War blocks */}
      {sections?.warBlocks?.map((block, i) => (
        <section key={i} className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <div className={`flex flex-wrap gap-[30px] items-center max-mobile:gap-[20px] ${block.reversed ? 'flex-row-reverse' : ''}`}>
              <div className="flex-[1_1_calc(50%-15px)] max-mobile:flex-[1_1_100%]">
                <div className="border border-[#eee] shadow-card rounded-card overflow-hidden">
                  <Image
                    src={block.image}
                    alt={block.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-[1_1_calc(50%-15px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[30px] max-mobile:p-[20px]">
                <h2 className="mb-[15px]">{block.title}</h2>
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="mb-[15px] text-[18px] font-light max-mobile:text-[16px]">{p}</p>
                ))}
                {block.buttonText && (
                  <Button variant="blue" href="/kontakty/">
                    {block.buttonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ section */}
      {sections?.faq && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <div className="flex flex-wrap gap-[30px] max-mobile:gap-[20px]">
              <div className="flex-[1_1_calc(40%-15px)] max-mobile:flex-[1_1_100%]">
                <h2>{sections.faq.title}</h2>
              </div>
              <div className="flex-[1_1_calc(60%-15px)] max-mobile:flex-[1_1_100%] flex flex-col gap-[15px]">
                {sections.faq.items.map((item, i) => (
                  <div
                    key={i}
                    className={`border border-[#eee] shadow-card rounded-card p-[25px] ${
                      i === 0 ? 'bg-light-blue' : i === 1 ? 'bg-l-light-blue' : 'bg-white'
                    }`}
                  >
                    <h3 className="mb-[10px]">{item.question}</h3>
                    <p className="text-[16px] font-light">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rating custom (serm) */}
      {sections?.ratingCustom && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <h2 className="mb-[15px]">{sections.ratingCustom.title}</h2>
            <p className="mb-[30px] text-[20px] font-light max-mobile:text-[16px]">{sections.ratingCustom.description}</p>
            <div className="flex flex-wrap gap-[20px]">
              {sections.ratingCustom.items.map((item, i) => (
                <div
                  key={i}
                  className="flex-[1_1_calc(33.333%-14px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[25px]"
                >
                  <h4 className="mb-[15px]">{item.title}</h4>
                  <div className="flex justify-between items-center mb-[10px]">
                    <span className="text-[16px] font-light">Рейтинг:</span>
                    <span className="text-[16px]">
                      <span className="text-[#999]">{item.ratingBefore}</span>
                      {' → '}
                      <span className="text-blue font-bold">{item.ratingAfter}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-[10px]">
                    <span className="text-[16px] font-light">Звонки:</span>
                    <span className="text-[16px]">
                      <span className="text-[#999]">{item.callsBefore}</span>
                      {' → '}
                      <span className="text-blue font-bold">{item.callsAfter}</span>
                    </span>
                  </div>
                  <p className="text-[14px] text-[#999] font-light">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Steps section */}
      {sections?.steps && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <h2 className="mb-[30px]">Главная формула нашей работы</h2>

            {/* Step labels bar */}
            <div className="flex flex-wrap items-center gap-[5px] mb-[30px] bg-gray rounded-card p-[15px] max-mobile:p-[10px]">
              {stepLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-[5px]">
                  <span className="text-[14px] font-semibold max-mobile:text-[12px]">{label}</span>
                  {i < stepLabels.length - 1 && (
                    <Image src="/images/icons/step-arrow.svg" alt="" width={16} height={16} />
                  )}
                </div>
              ))}
            </div>

            {/* Info cards */}
            <div className="flex flex-wrap gap-[20px]">
              {stepCards.map((card, i) => (
                <div
                  key={i}
                  className="flex-[1_1_calc(25%-15px)] max-tablet:flex-[1_1_calc(50%-10px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[25px]"
                >
                  <h4 className="mb-[10px]">{card.title}</h4>
                  <p className="text-[16px] font-light">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Transparency cards (targeting) */}
      {sections?.transparencyCards && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <h2 className="mb-[15px]">{sections.transparencyCards.title}</h2>
            <p className="mb-[30px] text-[20px] font-light max-mobile:text-[16px]">{sections.transparencyCards.description}</p>
            <div className="flex flex-wrap gap-[20px]">
              {sections.transparencyCards.items.map((item, i) => (
                <div
                  key={i}
                  className="flex-[1_1_calc(33.333%-14px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[25px]"
                >
                  <h4 className="mb-[10px]">{item.title}</h4>
                  <p className="text-[16px] font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Analytics box */}
      {sections?.analyticsBox && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <div className="flex flex-wrap gap-[30px] items-center max-mobile:gap-[20px]">
              <div className="flex-[1_1_calc(50%-15px)] max-mobile:flex-[1_1_100%]">
                <h2 className="mb-[20px]">{sections.analyticsBox.title}</h2>
                <ul className="mb-[25px] flex flex-col gap-[10px]">
                  {sections.analyticsBox.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-[10px] text-[18px] font-light max-mobile:text-[16px]">
                      <Image src="/images/icons/gear1.svg" alt="" width={20} height={20} className="mt-[4px] shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button variant="blue" href="/kontakty/">
                  {sections.analyticsBox.buttonText}
                </Button>
              </div>
              <div className="flex-[1_1_calc(50%-15px)] max-mobile:flex-[1_1_100%] flex justify-center">
                <div className="gear-animation-wrapper">
                  <Image src="/images/icons/gear.svg" alt="" width={300} height={300} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blue form CTA */}
      {sections?.blueForm && (
        <section className="mt-[60px] max-mobile:mt-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <div className="border border-blue bg-blue text-white shadow-card rounded-card overflow-hidden"
              style={{ backgroundImage: 'url(/images/bg/bg-blue-block.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="flex flex-wrap">
                <div className="flex-[1_1_calc(50%-0px)] p-[40px] max-mobile:flex-[1_1_100%] max-mobile:p-[25px]">
                  <h2 className="text-white mb-[15px]">Нестандартные стратегии</h2>
                  <p className="text-[18px] font-light opacity-90 max-mobile:text-[16px]">
                    Существует множество способов продвижения в интернете и далеко не все они основаны на общеизвестных инструментах. Мы разрабатываем долгосрочные стратегии устойчивого развития бизнеса
                  </p>
                </div>
                <div className="flex-[1_1_calc(50%-0px)] p-[40px] border-l border-white/20 max-mobile:flex-[1_1_100%] max-mobile:p-[25px] max-mobile:border-l-0 max-mobile:border-t max-mobile:border-white/20">
                  <h3 className="text-white mb-[10px] border-b border-white/30 pb-[10px]">Хотите подробностей?</h3>
                  <p className="text-[18px] font-light opacity-90 mb-[20px] max-mobile:text-[16px]">
                    Оставьте заявку на онлайн встречу и мы расскажем о том, как стать лидером в своей нише за 1,5 года и получать от 1000 целевых заявок в месяц
                  </p>
                  <Button variant="white" href="/kontakty/">
                    Онлайн встреча
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Text section from MDX */}
      {service.content && service.content.trim().length > 0 && (
        <section className="mt-[60px] mb-[60px] max-mobile:mt-[40px] max-mobile:mb-[40px]">
          <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
            <MdxRenderer source={service.content} />
          </div>
        </section>
      )}
    </main>
  );
}
