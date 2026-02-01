import type { Region } from '@/types/regions';
import type { ServiceMeta } from '@/types/content';

// Deterministic seed-based random from region+service slug
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(items: T[], rand: () => number): T {
  return items[Math.floor(rand() * items.length)];
}

function pickN<T>(items: T[], n: number, rand: () => number): T[] {
  const shuffled = [...items].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

// Content templates
const intros = [
  (region: Region, service: string) =>
    `Ищете ${service} ${region.nameIn}? Агентство «Точная механика» помогает бизнесу ${region.nameGen} привлекать клиентов через интернет. Работаем удалённо, результат — как у местных команд, но с федеральной экспертизой.`,
  (region: Region, service: string) =>
    `${service} ${region.nameIn} — это не просто набор инструментов. Это системный подход к привлечению клиентов, который мы отточили на десятках проектов по всей России. Работаем с бизнесом ${region.nameGen} удалённо и эффективно.`,
  (region: Region, service: string) =>
    `Бизнес ${region.nameIn} конкурирует не только с местными игроками, но и с федеральными компаниями. ${service} от «Точной механики» даёт преимущество: глубокая аналитика, проверенные стратегии и измеримые результаты.`,
  (region: Region, service: string) =>
    `Рынок ${region.nameGen} активно развивается, и конкуренция за клиентов растёт. ${service} — один из самых эффективных способов привлечения целевой аудитории. Мы знаем, как это работает на практике.`,
];

const advantages = [
  'Прозрачная отчётность — вы видите, за что платите',
  'Работаем на результат: заявки и продажи, а не позиции ради позиций',
  '17 лет опыта в digital-маркетинге',
  'Индивидуальная стратегия под ваш бизнес и регион',
  'Фиксированная стоимость — без скрытых доплат',
  'Еженедельные отчёты и доступ к аналитике 24/7',
  'Работаем с бизнесом любого масштаба — от стартапов до федеральных сетей',
  'Комплексный подход: SEO + реклама + аналитика',
  'Собственные инструменты антифрод-защиты',
  'Гарантия возврата средств при невыполнении KPI',
];

const ctas = [
  'Получите бесплатный аудит вашего сайта и рекламы',
  'Закажите стратегию продвижения — первая консультация бесплатно',
  'Узнайте, сколько клиентов вы теряете — бесплатный анализ',
  'Оставьте заявку — мы покажем точки роста вашего бизнеса',
];

const stats = [
  { value: '200+', label: 'проектов реализовано' },
  { value: '17', label: 'лет опыта' },
  { value: '×3', label: 'средний рост заявок' },
  { value: '80+', label: 'городов присутствия' },
  { value: '-50%', label: 'снижение стоимости лида' },
  { value: '95%', label: 'клиентов продлевают договор' },
];

export interface RegionPageContent {
  intro: string;
  advantages: string[];
  cta: string;
  stats: { value: string; label: string }[];
}

export function generateRegionContent(
  region: Region,
  service: ServiceMeta
): RegionPageContent {
  const seed = hashCode(`${region.slug}-${service.slug}`);
  const rand = seededRandom(seed);

  const intro = pick(intros, rand)(region, service.title);
  const selectedAdvantages = pickN(advantages, 5, rand);
  const cta = pick(ctas, rand);
  const selectedStats = pickN(stats, 4, rand);

  return {
    intro,
    advantages: selectedAdvantages,
    cta,
    stats: selectedStats,
  };
}

export function generateRegionMainContent(region: Region): {
  intro: string;
  advantages: string[];
  cta: string;
} {
  const seed = hashCode(region.slug);
  const rand = seededRandom(seed);

  const serviceIntros = [
    `Digital-маркетинг ${region.nameIn} от агентства «Точная механика». Помогаем бизнесу ${region.nameGen} расти через SEO, контекстную рекламу и комплексный интернет-маркетинг.`,
    `Агентство «Точная механика» работает с бизнесом ${region.nameIn}. SEO-продвижение, контекстная реклама, создание сайтов — всё для роста заявок и продаж.`,
    `Интернет-маркетинг ${region.nameIn}: продвижение сайтов, настройка рекламы, аналитика. Работаем на результат — увеличиваем поток заявок для бизнеса ${region.nameGen}.`,
  ];

  return {
    intro: pick(serviceIntros, rand),
    advantages: pickN(advantages, 6, rand),
    cta: pick(ctas, rand),
  };
}
