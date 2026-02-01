'use client';

import Link from 'next/link';

interface ButtonBaseProps {
  variant?: 'blue' | 'white';
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: undefined;
  type?: undefined;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'blue',
  children,
  href,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-block px-[18px] py-[12px] text-[20px] uppercase rounded-btn font-semibold transition-all duration-500 cursor-pointer text-center';

  const variants = {
    blue: 'bg-blue text-light-blue border-2 border-blue hover:bg-transparent hover:text-blue',
    white: 'bg-white text-blue border-2 border-white hover:bg-transparent hover:text-white',
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
}
