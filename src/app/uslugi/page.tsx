import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';


export const metadata: Metadata = {
  title: 'Услуги нашей компании — Точная механика',
  description: 'Маркетинговое агентство «Точная механика» — SEO продвижение, контекстная реклама, разработка сайтов, таргетированная реклама, аналитика и управление репутацией.',
  openGraph: {
    title: 'Услуги — Точная механика',
    description: 'Полный спектр услуг digital-маркетинга для роста вашего бизнеса.',
  },
};

export default function UslugiPage() {
  const services = getServices();

  return (
    <main>
      {/* Hero */}
      <section>
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги' },
            ]}
          />
          <h1 className="mb-[20px]">
            Услуги <span>нашей компании</span>
          </h1>
          <Button variant="blue" href="/kontakty/">
            Заказать звонок
          </Button>
        </div>
      </section>

      {/* Service cards - vertical layout */}
      <section className="mt-[60px] mb-[60px] max-mobile:mt-[40px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <div className="flex flex-wrap gap-[20px]">
            {services.map((service) => (
              <div
                key={service.meta.slug}
                className="flex-[1_1_calc(33.333%-14px)] max-tablet:flex-[1_1_calc(50%-10px)] max-mobile:flex-[1_1_100%] border border-[#eee] bg-white shadow-card rounded-card p-[30px] flex flex-col gap-[15px] max-mobile:p-[20px]"
              >
                <h3>{service.meta.title}</h3>
                <p className="text-[16px] font-light flex-1">
                  {service.meta.description}
                </p>
                <div>
                  <Link
                    href={`/uslugi/${service.meta.slug}/`}
                    className="inline-block bg-blue text-light-blue border-2 border-blue rounded-btn px-[18px] py-[12px] uppercase font-semibold text-[14px] transition-all duration-500 hover:bg-transparent hover:text-blue"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO text section */}
      <section className="mb-[60px] max-mobile:mb-[40px]">
        <div className="max-w-[var(--container-max)] mx-auto px-[20px]">
          <div className="text-section">
            <h2><strong>Digital-решения для роста бизнеса</strong></h2>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Маркетинговое агентство «Точная механика» предлагает комплексные решения для продвижения бизнеса в интернете.
              Мы не просто запускаем рекламу — мы выстраиваем системы привлечения клиентов, которые работают на результат.
            </p>
            <h3 className="mt-[30px] mb-[15px]">SEO продвижение</h3>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Выведем ваш сайт в ТОП поисковой выдачи Яндекса и Google. Работаем с семантическим ядром,
              внутренней и внешней оптимизацией, создаем контент, улучшаем поведенческие факторы.
              <Link href="/uslugi/seo/" className="text-blue hover:underline ml-[5px]">Подробнее об SEO →</Link>
            </p>
            <h3 className="mt-[30px] mb-[15px]">Разработка сайтов</h3>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Создаем сайты по авторской технологии маркетингового прототипирования. Каждая страница — продающая,
              готовая к запуску рекламы с первого дня.
              <Link href="/uslugi/razrabotka-saytov/" className="text-blue hover:underline ml-[5px]">Подробнее о разработке →</Link>
            </p>
            <h3 className="mt-[30px] mb-[15px]">Контекстная реклама</h3>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Запускаем рекламу в Яндекс.Директ и Google Ads с защитой от скликивания.
              Специализируемся на сложных нишах с высокой конкуренцией.
              <Link href="/uslugi/kontekstnaya-reklama/" className="text-blue hover:underline ml-[5px]">Подробнее о контексте →</Link>
            </p>
            <h3 className="mt-[30px] mb-[15px]">Таргетированная реклама и SMM</h3>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Находим вашу аудиторию в социальных сетях. Работаем с блогерами, делаем посевы,
              обеспечиваем охват целевой аудитории.
              <Link href="/uslugi/targeting/" className="text-blue hover:underline ml-[5px]">Подробнее о таргете →</Link>
            </p>
            <h3 className="mt-[30px] mb-[15px]">Аналитика и дашборд</h3>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Настроим аналитику, чтобы вы принимали верные решения. Создаем индивидуальные дашборды
              для отслеживания эффективности рекламных кампаний и работы менеджеров.
              <Link href="/uslugi/smm/" className="text-blue hover:underline ml-[5px]">Подробнее об аналитике →</Link>
            </p>
            <h3 className="mt-[30px] mb-[15px]">Отзывы и репутация</h3>
            <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]">
              Увеличим количество звонков с помощью отзывов. Повысим рейтинг вашей компании в сети до 5.0.
              Работаем с геосервисами и отзовиками.
              <Link href="/uslugi/serm/" className="text-blue hover:underline ml-[5px]">Подробнее о репутации →</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
