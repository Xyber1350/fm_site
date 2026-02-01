export const siteConfig = {
  name: 'Точная механика',
  description: 'Маркетинговое агентство «Точная механика» предлагает услуги по SEO продвижению, контекстной рекламе, разработке сайтов и многому другому.',
  url: 'https://fine-mechanics.ru',
  phone: '+7 (993) 457-15-10',
  phoneRaw: '+79934571510',
  email: 'info@fine-mechanics.ru',
  address: {
    street: 'ул. Верная, д. 103',
    city: 'Ростов-на-Дону',
    postalCode: '101000',
    country: 'RU',
  },
  workingHours: 'ПН-ПТ с 9:00 до 19:00',
  workingHoursSchema: 'Mo-Fr 09:00-19:00',
  social: {
    vk: '#',
    telegram: '#',
    youtube: '#',
  },
  metrika: {
    id: 76480393,
  },
  yandexVerification: 'f33780aeacc1c0a7',
} as const;

export const navigation = [
  { label: 'Услуги', href: '/uslugi/' },
  { label: 'Кейсы', href: '/keysy/' },
  { label: 'Блог', href: '/blog/' },
  { label: 'Контакты', href: '/kontakty/' },
] as const;
