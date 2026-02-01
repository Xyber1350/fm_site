import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности и обработки персональных данных агентства «Точная механика».',
};

export default function PolitikaPage() {
  return (
    <main className="pt-[120px] pb-[60px] max-mobile:pt-[80px]">
      <div className="max-w-[900px] mx-auto px-[20px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Политика конфиденциальности' },
          ]}
        />

        <h1 className="mb-[30px]">Политика конфиденциальности</h1>

        <div className="text-section">
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты
            персональных данных пользователей сайта {siteConfig.url}.
          </p>

          <h2 className="mt-[40px] mb-[20px]">1. Общие положения</h2>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Оператор персональных данных — {siteConfig.name}, расположенный по адресу:
            {' '}{siteConfig.address.city}, {siteConfig.address.street}.
          </p>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Использование сайта означает согласие пользователя с настоящей Политикой.
            В случае несогласия пользователь должен воздержаться от использования сайта.
          </p>

          <h2 className="mt-[40px] mb-[20px]">2. Какие данные мы собираем</h2>
          <ul className="mb-[15px] flex flex-col gap-[8px] list-disc pl-[20px]">
            <li className="text-[18px] font-light">Имя</li>
            <li className="text-[18px] font-light">Номер телефона</li>
            <li className="text-[18px] font-light">Адрес электронной почты (при указании)</li>
            <li className="text-[18px] font-light">Данные о посещении сайта (cookies, IP-адрес, информация о браузере)</li>
          </ul>

          <h2 className="mt-[40px] mb-[20px]">3. Цели обработки данных</h2>
          <ul className="mb-[15px] flex flex-col gap-[8px] list-disc pl-[20px]">
            <li className="text-[18px] font-light">Обработка заявок и обратная связь</li>
            <li className="text-[18px] font-light">Улучшение качества обслуживания</li>
            <li className="text-[18px] font-light">Статистический анализ посещаемости</li>
            <li className="text-[18px] font-light">Выполнение договорных обязательств</li>
          </ul>

          <h2 className="mt-[40px] mb-[20px]">4. Защита данных</h2>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Мы принимаем необходимые организационные и технические меры для защиты
            персональных данных от несанкционированного доступа, изменения, раскрытия
            или уничтожения.
          </p>

          <h2 className="mt-[40px] mb-[20px]">5. Передача данных третьим лицам</h2>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Мы не передаём персональные данные третьим лицам, за исключением случаев,
            предусмотренных законодательством Российской Федерации.
          </p>

          <h2 className="mt-[40px] mb-[20px]">6. Cookies</h2>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Сайт использует файлы cookies для обеспечения корректной работы и сбора
            статистики. Пользователь может отключить cookies в настройках браузера,
            при этом часть функционала сайта может быть недоступна.
          </p>

          <h2 className="mt-[40px] mb-[20px]">7. Права пользователя</h2>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            Пользователь имеет право запросить удаление своих персональных данных,
            направив запрос на адрес электронной почты {siteConfig.email}.
          </p>

          <h2 className="mt-[40px] mb-[20px]">8. Контакты</h2>
          <p className="mb-[15px] text-[18px] font-light leading-[1.6]">
            По вопросам обработки персональных данных обращайтесь:<br />
            Email: {siteConfig.email}<br />
            Телефон: {siteConfig.phone}
          </p>
        </div>
      </div>
    </main>
  );
}
