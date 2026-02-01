import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GearsAnimation } from '@/components/ui/GearsAnimation';

const services = [
  {
    title: 'Разработка сайтов',
    description: 'Разработаем сайт, который ТОЧНО будет продавать ваши товары или услуги. Начнем с маркетингового прототипирования страниц и проработки сайта по воронке продаж',
    image: '/images/content/services/razrabotka-saytov.webp',
    href: '/uslugi/razrabotka-saytov/',
  },
  {
    title: 'SEO продвижение',
    description: 'ТОЧНО знаем, как вывести сайт в ТОП поисковой выдачи. Начнем с глубокого анализа ключевых слов и конкурентной среды, затем разработаем долгосрочную стратегию продвижения.',
    image: '/images/content/services/seo.webp',
    href: '/uslugi/seo/',
  },
  {
    title: 'Контекстная реклама',
    description: 'Запустим контекстную рекламу с защитой от скликивания. Работаем в сложных нишах с высокой конкуренцией и спам-атаками. Найдем способ быть заметнее конкурентов.',
    image: '/images/content/services/kontekstnaya-reklama.webp',
    href: '/uslugi/kontekstnaya-reklama/',
  },
  {
    title: 'Таргет и SMM',
    description: 'Достучимся до вашей аудитории в соцсетях, Дзен, баннерных площадках. Создаем контент, который привлекает и удерживает внимание вашей аудитории.',
    image: '/images/content/services/targeting.webp',
    href: '/uslugi/targeting/',
  },
  {
    title: 'Аналитика и дашборд',
    description: 'Создаем дашборды для анализа работы менеджеров и рекламных источников от первого обращения до сделки. Мощные инструменты для глубокого анализа и принятия обоснованных решений.',
    image: '/images/content/services/analytics.webp',
    href: '/uslugi/smm/',
  },
  {
    title: 'Отзывы и репутация',
    description: 'ТОЧНО знаем как повысить доверие клиентов с помощью отзывов. Своевременный мониторинг, ответ на комментарии и работа с негативом. Улучшаем имидж и привлекаем новых клиентов.',
    image: '/images/content/services/reputation.webp',
    href: '/uslugi/serm/',
  },
];

const ratingItems = [
  { icon: '/images/icons/seo.svg', place: '1 место', label: 'SEO продвижение' },
  { icon: '/images/icons/map.svg', place: '2 место', label: 'Яндекс.Карты' },
  { icon: '/images/icons/kontekst.svg', place: '3 место', label: 'Контекстная реклама' },
  { icon: '/images/icons/smm.svg', place: '4 место', label: 'Социальные сети' },
];

const steps = [
  { title: 'Никаких волшебных таблеток', text: 'Каждый бизнес уникален и нет универсальных инструментов, подходящих любому бизнесу' },
  { title: 'Команда профи в своих областях', text: 'Мы не стремимся набрать "Много работы", мы берем мало проектов, но делаем их с "полным погружением"' },
  { title: 'Прозрачность выполненных работ', text: 'Предоставляем отчеты в обговоренный период, а также даем все необходимые доступы заказчику' },
  { title: 'Системный подход к бизнесу', text: 'Мы проанализируем бизнес и нишу, а также составим правильный план действий для достижения целей' },
];

const pricingPlans = [
  {
    name: 'Быстрый старт',
    features: [
      { text: 'Запуск контекстной рекламы на текущий сайт', active: true },
      { text: 'Создание группы в соцсетях', active: false },
      { text: 'Запуск таргетированной рекламы', active: false },
    ],
    testPeriod: '1 неделя',
    leadsIn: '3-5 дней',
    price: 'от 65 000 р/мес + бюджеты',
  },
  {
    name: 'Формирование потока',
    features: [
      { text: 'Разработка продающего лендинга', active: true },
      { text: 'Продвижение в Яндекс.Картах', active: false },
      { text: 'Работа с репутацией и отзывами', active: false },
      { text: 'Запуск контекстной рекламы', active: true },
      { text: 'Ведение группы', active: false },
      { text: 'Запуск таргетированной рекламы', active: false },
    ],
    testPeriod: '1 месяц',
    leadsIn: '5-14 дней',
    price: 'от 85 000 р/мес + бюджеты',
  },
  {
    name: 'Системное продвижение',
    features: [
      { text: 'Разработка полноценного сайта', active: true },
      { text: 'SEO продвижение', active: false },
      { text: 'Работа с репутацией и отзывами', active: false },
      { text: 'Запуск контекстной рекламы', active: true },
      { text: 'Ведение группы', active: false },
      { text: 'Запуск таргетированной рекламы', active: false },
      { text: 'Продвижение в Яндекс.Картах', active: false },
    ],
    testPeriod: '1 месяц',
    leadsIn: '5-14 дней',
    price: 'от 145 000 р/мес + бюджеты',
  },
];

const stepLabels = ['Анализ', 'Стратегия', 'Реализация', 'Опять анализ', 'Улучшение', 'Реализация', 'Масштабирование', 'Результат'];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="py-[50px] bg-no-repeat bg-right-bottom max-mobile:bg-none"
        style={{ backgroundImage: 'url(/images/bg/home-bg.webp)', backgroundSize: '40%' }}
      >
        <div className="container">
          <div className="py-[90px] max-mobile:py-[30px]">
            <h1>
              Точно знаем, <span>как продвигать бизнес в интернете:</span>
            </h1>
            <ul className="mt-[20px] mb-[30px] flex flex-col gap-[10px]">
              <li className="flex items-start gap-[10px] text-[20px] max-mobile:text-[16px]">
                <Image src="/images/icons/gear1.svg" alt="" width={20} height={20} className="mt-[5px] shrink-0" />
                от старта с 0 до ежедневного потока заявок
              </li>
              <li className="flex items-start gap-[10px] text-[20px] max-mobile:text-[16px]">
                <Image src="/images/icons/gear1.svg" alt="" width={20} height={20} className="mt-[5px] shrink-0" />
                с детальным отчетом по источникам трафика и его эффективности
              </li>
            </ul>
            <Button>Заказать звонок</Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div className="flex flex-wrap gap-[20px]">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="flex-[1_1_calc(33.333%-14px)] max-mobile:flex-[1_1_100%] rounded-card border border-[#eee] shadow-card bg-white transition-shadow duration-500 hover:shadow-card-hover overflow-hidden block"
              >
                <div className="relative w-full h-[220px] max-mobile:h-[180px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-t-card"
                    loading="lazy"
                  />
                </div>
                <div className="p-[20px]">
                  <h3 className="mb-[10px]">{service.title}</h3>
                  <p className="text-[16px] font-light leading-[1.5]">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rating */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div className="flex gap-[40px] max-mobile:flex-col">
            <div className="flex-[0_0_40%] max-mobile:flex-[1_1_100%]">
              <h2>
                Рейтинг{' '}
                <span className="text-blue">эффективности</span>{' '}
                инструментов
              </h2>
            </div>
            <div className="flex-1">
              <p className="mb-[15px]">
                Не существует волшебных таблеток и универсальных инструментов, которые на 100% эффективны для любого вида бизнеса. Но есть статистика применения методов продвижения среди лидеров рынка.
              </p>
              <p className="mb-[15px]">
                Мы предвидим ваше возражение о том, что вы использовали SEO, но не получили желаемого результата. Возможно, вы просто не смогли правильно адаптировать свой сайт под требования поисковых систем Яндекса
              </p>
              <p className="text-blue mb-[30px]">
                Но мы точно знаем как это исправить и сделать так, чтобы ваш сайт начал приносить заявки уже через 2 недели после старта продвижения
              </p>
              <div className="flex flex-wrap gap-[20px] mb-[30px]">
                {ratingItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-[10px] bg-white rounded-card border border-[#eee] shadow-card p-[15px] flex-[1_1_calc(50%-10px)] max-mobile:flex-[1_1_100%]"
                  >
                    <Image src={item.icon} alt={item.label} width={40} height={40} />
                    <div>
                      <span className="text-blue font-bold text-[20px] block">{item.place}</span>
                      <span className="text-[14px] font-light">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button>Хочу стать лидером в нише</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Box with Gear SVG */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div className="bg-white border border-[#eee] rounded-card shadow-card overflow-hidden flex max-mobile:flex-col">
            <div className="flex-1 p-[40px] max-mobile:p-[20px] flex flex-col justify-center">
              <h2 className="mb-[20px]">Не знаете откуда приходят заявки?</h2>
              <ul className="flex flex-col gap-[15px] mb-[30px]">
                <li className="flex items-start gap-[10px]">
                  <Image src="/images/icons/gear1.svg" alt="" width={20} height={20} className="mt-[5px] shrink-0" />
                  <span>Закажите настройку системы аналитики входящих звонков и заявок и получите ответ на этот вопрос уже через 3 дня</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Image src="/images/icons/gear1.svg" alt="" width={20} height={20} className="mt-[5px] shrink-0" />
                  <span>Недорогая услуга для тех, кто хотел бы протестировать наше умение работать на результат и только потом принимать решение о дальнейшем сотрудничестве</span>
                </li>
              </ul>
              <div>
                <Button>Настроить аналитику</Button>
              </div>
            </div>
            <div className="flex-[0_0_45%] max-mobile:hidden flex items-center justify-center p-[20px]">
              <GearsAnimation className="w-full max-w-[500px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section
        className="my-[60px] max-mobile:my-[30px] py-[60px] max-mobile:py-[30px] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/bg/bg-step.svg)' }}
      >
        <div className="container">
          <div className="flex flex-wrap gap-[10px] mb-[30px] justify-center">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <span className="bg-blue text-white text-[14px] font-semibold px-[15px] py-[8px] rounded-btn">
                  {label}
                </span>
                {i < stepLabels.length - 1 && (
                  <Image src="/images/icons/step-arrow.svg" alt="" width={20} height={20} className="max-mobile:hidden" />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-[20px]">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex-[1_1_calc(25%-15px)] max-mobile:flex-[1_1_100%] rounded-card border border-[#eee] bg-white shadow-card p-[30px] max-mobile:p-[20px]"
              >
                <h3 className="mb-[10px]">{step.title}</h3>
                <p className="text-[16px] font-light">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div className="flex flex-wrap gap-[20px] items-start">
            <div className="flex-[1_1_calc(25%-15px)] max-mobile:flex-[1_1_100%]">
              <h2>Варианты захвата рынка</h2>
            </div>
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="flex-[1_1_calc(25%-15px)] max-mobile:flex-[1_1_100%]">
                <div className="rounded-t-card border border-[#eee] shadow-card bg-white p-[30px] max-mobile:p-[20px]">
                  <h3 className="mb-[20px]">{plan.name}</h3>
                  <ul className="flex flex-col gap-[10px] mb-[20px]">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={`text-[16px] flex items-start gap-[10px] ${feature.active ? 'font-medium' : 'font-light'}`}
                      >
                        <span className={`shrink-0 w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center mt-[2px] ${feature.active ? 'border-blue bg-blue' : 'border-[#ddd] bg-white'}`}>
                          {feature.active && (
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                              <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[16px] font-light border-t border-[#eee] pt-[15px]">
                    <div className="mb-[5px]">Период тестирования <span className="font-semibold">{plan.testPeriod}</span></div>
                    <div>Получение заявок через <span className="font-semibold">{plan.leadsIn}</span></div>
                  </div>
                </div>
                <div className="bg-blue text-white text-center py-[15px] rounded-b-card shadow-card font-semibold text-[18px]">
                  {plan.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue CTA */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div
            className="rounded-card border border-blue shadow-card bg-blue text-white p-[80px] max-mobile:p-[25px] bg-cover bg-bottom flex gap-[80px] max-mobile:flex-col max-mobile:gap-[30px]"
            style={{ backgroundImage: 'url(/images/bg/bg-blue-block.svg)' }}
          >
            <div className="flex-1">
              <h2>Нестандартные стратегии</h2>
              <p className="mt-[20px] text-[18px] font-light opacity-90">
                Существует множество способов продвижения в интернете и далеко не все они основаны на общеизвестных инструментах. Мы разрабатываем долгосрочные стратегии устойчивого развития бизнеса
              </p>
            </div>
            <div className="flex-1">
              <h3 className="border-b-2 border-white pb-[15px] mb-[15px]">Хотите подробностей?</h3>
              <p className="mb-[20px] text-[18px] font-light opacity-90">
                Оставьте заявку на онлайн встречу и мы расскажем о том, как стать лидером в своей нише за 1,5 года и получать от 1000 целевых заявок в месяц
              </p>
              <Button variant="white">Онлайн встреча</Button>
            </div>
          </div>
        </div>
      </section>

      {/* War Block */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div className="flex gap-[20px] max-mobile:flex-col">
            <div className="flex-[0_0_50%] max-mobile:flex-[1_1_100%] rounded-card border border-[#eee] shadow-card overflow-hidden">
              <Image
                src="/images/bg/bg-war.webp"
                alt="Конкурентные войны"
                width={600}
                height={500}
                className="w-full h-full object-cover rounded-card"
              />
            </div>
            <div className="flex-1 rounded-card border border-[#eee] shadow-card bg-white p-[40px] max-mobile:p-[20px] flex flex-col justify-center">
              <h2 className="mb-[20px]">Конкурентные войны</h2>
              <p className="mb-[15px]">
                Реклама перестала работать? Сайт теряет позиции в поисковой выдаче и вы не знаете, что делать?{' '}
                <span className="text-blue">Вероятно вас атакуют конкуренты.</span>
              </p>
              <p className="text-[16px] font-light mb-[15px]">
                Мы знаем как защитить ваш сайт от атак конкурентов и минимизировать скликивание рекламы. А также как дать отпор недобросовестным бизнесменам и навсегда отбить у них охоту вести нечестную конкурентную борьбу.
              </p>
              <p className="text-[16px] font-light mb-[25px]">
                Оставьте заявку на бесплатный аудит, если хотите узнать ведут ли конкуренты борьбу с вашим сайтом и рекламой
              </p>
              <div>
                <Button>Бесплатный аудит</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="my-[60px] max-mobile:my-[30px]">
        <div className="container">
          <div className="prose max-w-none text-[16px] font-light leading-[1.7]">
            <p>
              Маркетинговое агентство &quot;Точная механика&quot; специализируется на предоставлении полного спектра услуг в области цифрового маркетинга. Мы помогаем бизнесам различных масштабов достигать их целей, привлекать клиентов и увеличивать прибыль.
            </p>
            <h2 className="text-[32px] max-mobile:text-[24px] mt-[30px] mb-[15px]">Почему стоит доверить маркетинг профессионалам?</h2>
            <p>
              Маркетинг в цифровую эпоху — это сложный и многогранный процесс, требующий знаний и опыта. Вот несколько причин, почему стоит доверить это дело профессионалам:
            </p>
            <ol className="list-decimal pl-[20px] flex flex-col gap-[15px] mt-[15px]">
              <li>
                <strong>Экспертиза и опыт:</strong> Профессиональные агентства обладают глубокими знаниями и опытом в различных областях цифрового маркетинга. В &quot;Точной механике&quot; наша команда состоит из специалистов с многолетним опытом работы.
              </li>
              <li>
                <strong>Индивидуальный подход:</strong> Каждому бизнесу нужен уникальный маркетинговый подход. Мы анализируем ваш бизнес, рынок и конкурентов, чтобы создать оптимальные решения.
              </li>
              <li>
                <strong>Экономия времени и ресурсов:</strong> Профессиональное агентство берет на себя всю работу, позволяя вам сосредоточиться на управлении вашим бизнесом.
              </li>
              <li>
                <strong>Прозрачность и отчетность:</strong> Мы предоставляем детализированные отчеты и аналитические данные, чтобы вы всегда были в курсе текущего состояния ваших кампаний.
              </li>
              <li>
                <strong>Комплексный подход:</strong> Наше агентство предоставляет полный спектр услуг, включая{' '}
                <Link href="/uslugi/seo/" className="text-blue hover:underline">SEO</Link>,{' '}
                <Link href="/uslugi/kontekstnaya-reklama/" className="text-blue hover:underline">контекстную рекламу</Link>,{' '}
                <Link href="/uslugi/razrabotka-saytov/" className="text-blue hover:underline">разработку сайтов</Link>,{' '}
                <Link href="/uslugi/serm/" className="text-blue hover:underline">управление репутацией</Link> и{' '}
                <Link href="/uslugi/targeting/" className="text-blue hover:underline">таргетированную рекламу</Link>.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
