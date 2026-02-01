export interface MenuChild {
  label: string;
  slug: string;
}

export interface MenuCluster {
  label: string;
  slug: string;
  children: MenuChild[];
}

export interface MenuColumn {
  title: string;
  directionSlug: string;
  clusters: MenuCluster[];
}

export const megaMenuData: MenuColumn[] = [
  {
    title: 'SEO-продвижение',
    directionSlug: 'seo',
    clusters: [
      {
        label: 'SEO-продвижение сайтов',
        slug: 'seo-prodvizhenie-saytov',
        children: [
          { label: 'Корпоративные сайты', slug: 'korporativnye-sayty' },
          { label: 'Landing Pages', slug: 'landing-stranicy' },
          { label: 'Каталоги и порталы', slug: 'katalogi-i-portaly' },
          { label: 'B2B-сайты', slug: 'b2b-sayty' },
          { label: 'SaaS-проекты', slug: 'saas-proekty' },
          { label: 'Техническое SEO', slug: 'tekhnicheskoe-seo' },
        ],
      },
      {
        label: 'SEO-аудит',
        slug: 'seo-audit',
        children: [
          { label: 'Технический аудит', slug: 'tekhnicheskiy-audit' },
          { label: 'Маркетинговый аудит', slug: 'marketingovyy-audit' },
          { label: 'Структурный аудит', slug: 'strukturnyy-audit' },
          { label: 'Ссылочный аудит', slug: 'ssylochnyy-audit' },
          { label: 'Конкурентный анализ', slug: 'konkurentnyy-analiz' },
        ],
      },
      {
        label: 'Комплексное SEO',
        slug: 'kompleksnoe-seo',
        children: [
          { label: 'SEO-сопровождение', slug: 'seo-soprovozhdenie' },
          { label: 'SEO-старт', slug: 'seo-start' },
          { label: 'Anti-stuck SEO', slug: 'anti-stuck-seo' },
          { label: 'Highload-проекты', slug: 'highload-proekty' },
          { label: 'Growth Hacking', slug: 'growth-hacking' },
        ],
      },
      {
        label: 'SEO интернет-магазинов',
        slug: 'seo-internet-magazinov',
        children: [
          { label: 'Магазины на Битрикс', slug: 'magaziny-na-bitriks' },
          { label: 'Магазины на WordPress', slug: 'magaziny-na-wordpress' },
          { label: 'Категорийное SEO', slug: 'kategoriynoe-seo' },
          { label: 'Оптимизация фильтров', slug: 'optimizaciya-filtrov' },
        ],
      },
    ],
  },
  {
    title: 'Контекстная реклама',
    directionSlug: 'kontekstnaya-reklama',
    clusters: [
      {
        label: 'Яндекс.Директ',
        slug: 'yandex-direct',
        children: [
          { label: 'Поисковая реклама', slug: 'poiskovaya-reklama' },
          { label: 'РСЯ', slug: 'rsya' },
          { label: 'Товарная реклама', slug: 'tovarnaya-reklama' },
          { label: 'Ретаргетинг', slug: 'retargeting' },
        ],
      },
      {
        label: 'Google Ads',
        slug: 'google-ads',
        children: [
          { label: 'Поисковые кампании', slug: 'poiskovye-kampanii' },
          { label: 'КМС (Display)', slug: 'kms-display' },
          { label: 'YouTube Ads', slug: 'youtube-ads' },
          { label: 'Performance Max', slug: 'performance-max' },
        ],
      },
      {
        label: 'По задачам',
        slug: 'po-zadacham',
        children: [
          { label: 'Лидогенерация', slug: 'lidogeneraciya' },
          { label: 'Охватные кампании', slug: 'okhvatnye-kampanii' },
          { label: 'Брендовая реклама', slug: 'brendovaya-reklama' },
          { label: 'Защита от скликивания', slug: 'zashchita-ot-sklikivaniya' },
        ],
      },
    ],
  },
  {
    title: 'Разработка сайтов',
    directionSlug: 'razrabotka-saytov',
    clusters: [
      {
        label: 'По типам сайтов',
        slug: 'po-tipam',
        children: [
          { label: 'Корпоративный сайт', slug: 'korporativnyy-sayt' },
          { label: 'Landing Page', slug: 'landing-page' },
          { label: 'Интернет-магазин', slug: 'internet-magazin' },
          { label: 'Веб-портал', slug: 'veb-portal' },
          { label: 'Многостраничный сайт', slug: 'mnogostranichniy-sayt' },
        ],
      },
      {
        label: 'По технологиям',
        slug: 'po-tekhnologiyam',
        children: [
          { label: 'Next.js / React', slug: 'nextjs-react' },
          { label: 'WordPress', slug: 'wordpress' },
          { label: '1С-Битрикс', slug: '1c-bitriks' },
        ],
      },
      {
        label: 'Сервисы',
        slug: 'servisy',
        children: [
          { label: 'Редизайн сайта', slug: 'redizayn-sayta' },
          { label: 'Оптимизация скорости', slug: 'optimizaciya-skorosti' },
          { label: 'Техническая поддержка', slug: 'tekhnicheskaya-podderzhka' },
        ],
      },
    ],
  },
  {
    title: 'Таргет и SMM',
    directionSlug: 'targeting',
    clusters: [
      {
        label: 'Таргетированная реклама',
        slug: 'targetirovannaya-reklama',
        children: [
          { label: 'ВКонтакте', slug: 'vkontakte' },
          { label: 'Telegram Ads', slug: 'telegram-ads' },
          { label: 'myTarget', slug: 'mytarget' },
          { label: 'Яндекс.Аудитории', slug: 'yandex-auditorii' },
        ],
      },
      {
        label: 'SMM-продвижение',
        slug: 'smm-prodvizhenie',
        children: [
          { label: 'Контент-план и ведение', slug: 'kontent-plan' },
          { label: 'Визуальное оформление', slug: 'vizualnoe-oformlenie' },
          { label: 'Комьюнити-менеджмент', slug: 'community-management' },
        ],
      },
      {
        label: 'Блогеры и посевы',
        slug: 'blogery-i-posevy',
        children: [
          { label: 'Работа с блогерами', slug: 'rabota-s-blogerami' },
          { label: 'Посевы в пабликах', slug: 'posevy-v-publikakh' },
          { label: 'Influence-маркетинг', slug: 'influence-marketing' },
        ],
      },
    ],
  },
  {
    title: 'Репутация (SERM)',
    directionSlug: 'serm',
    clusters: [
      {
        label: 'Работа с отзовиками',
        slug: 'rabota-s-otzovikami',
        children: [
          { label: 'Яндекс.Карты', slug: 'yandex-karty' },
          { label: '2GIS', slug: '2gis' },
          { label: 'Google Maps', slug: 'google-maps' },
          { label: 'Flamp и Отзовик', slug: 'flamp-i-otzovik' },
        ],
      },
      {
        label: 'SERM',
        slug: 'serm-upravlenie',
        children: [
          { label: 'Управление выдачей', slug: 'upravlenie-vydachey' },
          { label: 'Вытеснение негатива', slug: 'vytesnenie-negativa' },
          { label: 'Мониторинг упоминаний', slug: 'monitoring-upominaniy' },
        ],
      },
      {
        label: 'Кризисный менеджмент',
        slug: 'krizisnyy-menedzhment',
        children: [
          { label: 'Антикризисный PR', slug: 'antikrizisnyy-pr' },
          { label: 'Работа с негативом', slug: 'rabota-s-negativom' },
        ],
      },
    ],
  },
];
