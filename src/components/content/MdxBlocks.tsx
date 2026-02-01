import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleCheck,
  faBookOpen,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// -- InfoBox: colored callout blocks --

const infoVariants: Record<string, { bg: string; border: string; iconColor: string; icon: IconDefinition }> = {
  tip: { bg: 'bg-[#EBF4FF]', border: 'border-blue', iconColor: 'text-blue', icon: faLightbulb },
  warning: { bg: 'bg-[#FFF8E1]', border: 'border-[#F57F17]', iconColor: 'text-[#F57F17]', icon: faTriangleExclamation },
  important: { bg: 'bg-[#FFF3E0]', border: 'border-[#E65100]', iconColor: 'text-[#E65100]', icon: faCircleExclamation },
  success: { bg: 'bg-[#E8F5E9]', border: 'border-[#2E7D32]', iconColor: 'text-[#2E7D32]', icon: faCircleCheck },
};

interface InfoBoxProps {
  variant?: 'tip' | 'warning' | 'important' | 'success';
  title?: string;
  children: React.ReactNode;
}

export function InfoBox({ variant = 'tip', title, children }: InfoBoxProps) {
  const v = infoVariants[variant];
  return (
    <div className={`${v.bg} border-l-4 ${v.border} rounded-r-[10px] p-[20px] my-[30px]`}>
      <div className="flex items-center gap-[10px] mb-[8px]">
        <FontAwesomeIcon icon={v.icon} className={`text-[16px] ${v.iconColor}`} />
        {title && <span className="text-[16px] font-bold">{title}</span>}
      </div>
      <div className="text-[16px] leading-[1.6] font-light text-[#333]">
        {children}
      </div>
    </div>
  );
}

// -- StatsGrid: key metrics block --

interface StatItem {
  value: string;
  label: string;
}

interface StatsGridProps {
  items: StatItem[];
}

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[15px] my-[30px] max-mobile:grid-cols-1">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-light-blue rounded-[12px] p-[20px] text-center"
        >
          <div className="text-[36px] font-extrabold text-blue leading-[1.1] mb-[6px] max-mobile:text-[28px]">
            {item.value}
          </div>
          <div className="text-[14px] font-light text-[#555]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// -- MidCta: capture point inside article --

interface MidCtaProps {
  title?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function MidCta({
  title = 'Нужна консультация?',
  text = 'Оставьте заявку — разберём вашу ситуацию бесплатно',
  buttonText = 'Получить консультацию',
  buttonHref = '/kontakty/',
}: MidCtaProps) {
  return (
    <div
      className="bg-blue rounded-[14px] p-[30px] my-[40px] text-white relative overflow-hidden max-mobile:p-[20px]"
      style={{ backgroundImage: 'url(/images/bg/bg-blue-block.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute top-[10px] right-[15px] opacity-10">
        <FontAwesomeIcon icon={faPhoneVolume} className="text-[60px] text-white" />
      </div>
      <h3 className="text-white text-[22px] font-bold mb-[8px] max-mobile:text-[19px]">{title}</h3>
      <p className="text-[16px] font-light opacity-90 mb-[18px] max-w-[500px]">{text}</p>
      <a
        href={buttonHref}
        className="inline-block bg-white text-blue font-bold text-[14px] px-[24px] py-[12px] rounded-btn hover:bg-[#f0f0f0] transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
}

// -- KeyTakeaway: summary block --

interface KeyTakeawayProps {
  children: React.ReactNode;
}

export function KeyTakeaway({ children }: KeyTakeawayProps) {
  return (
    <div className="bg-[#F8F9FA] border border-[#e0e0e0] rounded-[12px] p-[24px] my-[30px]">
      <div className="flex items-center gap-[10px] mb-[10px]">
        <FontAwesomeIcon icon={faBookOpen} className="text-[16px] text-blue" />
        <span className="text-[16px] font-bold text-blue">Главное</span>
      </div>
      <div className="text-[16px] leading-[1.6] font-light text-[#333]">
        {children}
      </div>
    </div>
  );
}
