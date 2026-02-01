import { MDXRemote } from 'next-mdx-remote/rsc';
import { InfoBox, StatsGrid, MidCta, KeyTakeaway } from './MdxBlocks';

interface MdxRendererProps {
  source: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\sа-яёА-ЯЁ-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    const el = children as { props: { children?: React.ReactNode } };
    return getTextContent(el.props.children);
  }
  return '';
}

const components = {
  h2: (props: React.ComponentProps<'h2'>) => {
    const text = getTextContent(props.children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="text-[32px] font-bold mt-[50px] mb-[20px] pb-[12px] border-b-2 border-blue/15 max-mobile:text-[24px] max-mobile:mt-[35px] scroll-mt-[100px]"
        {...props}
      />
    );
  },
  h3: (props: React.ComponentProps<'h3'>) => {
    const text = getTextContent(props.children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="text-[22px] font-bold mt-[35px] mb-[12px] pl-[14px] border-l-3 border-blue max-mobile:text-[19px] max-mobile:mt-[25px] scroll-mt-[100px]"
        {...props}
      />
    );
  },
  h4: (props: React.ComponentProps<'h4'>) => (
    <h4
      className="text-[18px] font-bold mt-[25px] mb-[10px] max-mobile:text-[17px]"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-[18px] text-[18px] font-light leading-[1.7] text-[#333] max-mobile:text-[16px]" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-[20px] flex flex-col gap-[10px] list-disc pl-[24px] marker:text-blue" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-[20px] flex flex-col gap-[10px] list-decimal pl-[24px] marker:text-blue marker:font-bold" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="text-[18px] font-light leading-[1.6] text-[#333] max-mobile:text-[16px]" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-blue font-normal hover:underline underline-offset-2" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-bold text-black" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-blue bg-light-blue rounded-r-[8px] pl-[20px] pr-[20px] py-[16px] my-[25px] text-[17px] leading-[1.6] max-mobile:text-[15px]"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-[40px] border-0 h-[1px] bg-gradient-to-r from-transparent via-[#ddd] to-transparent" />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-[25px] rounded-[10px] border border-[#e5e5e5]">
      <table className="w-full text-[16px]" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th className="bg-blue text-white font-bold text-left p-[12px] text-[14px]" {...props} />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="p-[12px] border-t border-[#eee] text-[15px]" {...props} />
  ),
  InfoBox,
  StatsGrid,
  MidCta,
  KeyTakeaway,
};

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
