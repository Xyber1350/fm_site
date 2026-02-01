'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig, navigation } from '@/config/site';
import { MobileMenu } from './MobileMenu';
import { MegaMenu } from './MegaMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="my-[60px] max-mobile:my-[20px]">
        <div className="container">
          <div className="bg-white rounded-card shadow-header px-[40px] py-[33px] max-mobile:px-[15px] max-mobile:py-[15px]">
            <div className="flex items-center">
              <div className="w-[120px] shrink-0">
                <Link href="/">
                  <Image
                    src="/images/logo/logo.svg"
                    alt={siteConfig.name}
                    width={120}
                    height={40}
                    priority
                  />
                </Link>
              </div>

              <nav className="flex-1 hidden mobile:block">
                <ul className="flex gap-[40px] justify-center">
                  {navigation.map(({ label, href }) => {
                    const isServices = href === '/uslugi/';

                    if (isServices) {
                      return (
                        <li key={href}>
                          <button
                            onClick={() => setMegaMenuOpen(true)}
                            className={`text-[20px] font-medium transition-opacity duration-300 hover:opacity-70 relative cursor-pointer
                              ${pathname.startsWith(href) ? 'text-blue after:w-full' : 'text-[#333] hover:text-blue'}
                              after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-blue after:transition-all after:duration-300 hover:after:w-full
                            `}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`text-[20px] font-medium transition-opacity duration-300 hover:opacity-70 relative
                            ${pathname.startsWith(href) ? 'text-blue after:w-full' : 'text-[#333] hover:text-blue'}
                            after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-blue after:transition-all after:duration-300 hover:after:w-full
                          `}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="hidden mobile:block shrink-0">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-[20px] font-bold text-black hover:text-blue transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <button
                className="mobile:hidden ml-auto flex flex-col gap-[6px] p-[10px]"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Открыть меню"
              >
                <span className="w-[25px] h-[2px] bg-black transition-all" />
                <span className="w-[25px] h-[2px] bg-black transition-all" />
                <span className="w-[25px] h-[2px] bg-black transition-all" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenMegaMenu={() => {
          setMobileMenuOpen(false);
          setMegaMenuOpen(true);
        }}
      />

      <MegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
      />
    </>
  );
}
