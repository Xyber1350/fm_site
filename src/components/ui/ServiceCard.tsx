import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="flex-[1_1_30%] max-mobile:flex-[1_1_100%] rounded-card shadow-card bg-white transition-shadow duration-500 hover:shadow-card-hover overflow-hidden block"
    >
      <div className="relative w-full h-[300px] max-mobile:h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-card"
          loading="lazy"
        />
      </div>
      <div className="p-[20px]">
        <h3 className="mb-[10px]">{title}</h3>
        <p className="text-[16px] font-light">{description}</p>
      </div>
    </Link>
  );
}
