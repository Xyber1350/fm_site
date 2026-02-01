import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="mt-[60px]">
      <div className="bg-[#f8f9fa] py-[60px] max-mobile:py-[30px]">
        <div className="container">
          <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-[5fr_4fr_3fr] gap-[40px]">
            {/* Company info */}
            <div>
              <div className="mb-[20px]">
                <Link href="/">
                  <Image
                    src="/images/logo/logo.svg"
                    alt={siteConfig.name}
                    width={120}
                    height={40}
                  />
                </Link>
              </div>
              <p className="text-[15px] text-[#666] leading-[1.6] mb-[20px]">
                Маркетинговое агентство «Точная механика» — ваш надежный партнер
                в области цифрового маркетинга. Помогаем бизнесу расти с 2018 года.
              </p>
              <div className="flex flex-col gap-[10px] mb-[20px]">
                <div className="flex items-center gap-[10px] text-[14px] text-[#666]">
                  <svg className="w-[16px] h-[16px] shrink-0 text-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
                </div>
                <div className="flex items-center gap-[10px] text-[14px] text-[#666]">
                  <svg className="w-[16px] h-[16px] shrink-0 text-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-blue transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-[10px] text-[14px] text-[#666]">
                  <svg className="w-[16px] h-[16px] shrink-0 text-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-blue transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-[10px] text-[14px] text-[#666]">
                  <svg className="w-[16px] h-[16px] shrink-0 text-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  <span>{siteConfig.workingHours}</span>
                </div>
              </div>
              <div>
                <h5 className="text-[16px] font-semibold mb-[10px]">Мы в соцсетях:</h5>
                <div className="flex gap-[12px]">
                  <a
                    href={siteConfig.social.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] bg-blue rounded-full flex items-center justify-center text-white hover:bg-black hover:translate-y-[-2px] transition-all"
                    title="ВКонтакте"
                  >
                    VK
                  </a>
                  <a
                    href={siteConfig.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] bg-blue rounded-full flex items-center justify-center text-white hover:bg-black hover:translate-y-[-2px] transition-all"
                    title="Telegram"
                  >
                    TG
                  </a>
                </div>
              </div>
            </div>

            {/* Services & Info */}
            <div>
              <h4 className="text-[18px] font-semibold text-[#333] mb-[15px] relative after:content-[''] after:block after:w-[30px] after:h-[2px] after:bg-blue after:mt-[8px]">
                Наши услуги
              </h4>
              <ul className="flex flex-col gap-[8px] mb-[30px]">
                <li><Link href="/uslugi/seo/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">SEO продвижение</Link></li>
                <li><Link href="/uslugi/kontekstnaya-reklama/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Контекстная реклама</Link></li>
                <li><Link href="/uslugi/razrabotka-saytov/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Разработка сайтов</Link></li>
                <li><Link href="/uslugi/targeting/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Таргетированная реклама</Link></li>
                <li><Link href="/uslugi/serm/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Управление репутацией</Link></li>
                <li><Link href="/uslugi/smm/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">SMM продвижение</Link></li>
              </ul>

              <h4 className="text-[18px] font-semibold text-[#333] mb-[15px] relative after:content-[''] after:block after:w-[30px] after:h-[2px] after:bg-blue after:mt-[8px]">
                Информация
              </h4>
              <ul className="flex flex-col gap-[8px]">
                <li><Link href="/keysy/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Наши кейсы</Link></li>
                <li><Link href="/blog/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Блог</Link></li>
                <li><Link href="/politika-konfidentsialnosti/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Политика конфиденциальности</Link></li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-[18px] font-semibold text-[#333] mb-[15px] relative after:content-[''] after:block after:w-[30px] after:h-[2px] after:bg-blue after:mt-[8px]">
                Начать работу
              </h4>
              <p className="text-[14px] text-[#666] mb-[15px]">
                Получите бесплатную консультацию по продвижению вашего бизнеса
              </p>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-block w-full text-center bg-blue text-white py-[12px] px-[18px] rounded-btn uppercase text-[14px] font-semibold hover:bg-blue-hover transition-colors mb-[20px]"
              >
                Получить консультацию
              </a>

              <h4 className="text-[18px] font-semibold text-[#333] mb-[15px] relative after:content-[''] after:block after:w-[30px] after:h-[2px] after:bg-blue after:mt-[8px]">
                Популярные запросы
              </h4>
              <ul className="flex flex-col gap-[8px]">
                <li><Link href="/uslugi/seo/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Продвижение сайта</Link></li>
                <li><Link href="/uslugi/seo/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">SEO оптимизация</Link></li>
                <li><Link href="/uslugi/kontekstnaya-reklama/" className="text-[14px] text-[#666] hover:text-blue hover:pl-[5px] transition-all">Настройка рекламы</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-[#e9ecef] py-[20px]">
        <div className="container">
          <div className="flex flex-col mobile:flex-row items-center justify-between gap-[10px]">
            <p className="text-[13px] text-[#666]">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
            </p>
            <Link
              href="/politika-konfidentsialnosti/"
              className="text-[13px] text-[#666] hover:text-blue transition-colors"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
