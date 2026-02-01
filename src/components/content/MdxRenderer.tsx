import { MDXRemote } from 'next-mdx-remote/rsc';

interface MdxRendererProps {
  source: string;
}

const components = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="mt-[40px] mb-[20px]" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-[30px] mb-[15px]" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-[15px] text-[20px] font-light leading-[1.5] max-mobile:text-[16px]" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-[15px] flex flex-col gap-[8px] list-disc pl-[20px]" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-[15px] flex flex-col gap-[8px] list-decimal pl-[20px]" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="text-[18px] font-light max-mobile:text-[16px]" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-blue hover:underline" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-blue pl-[20px] my-[20px] italic text-[18px]" {...props} />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-[20px]">
      <table className="w-full border border-gray rounded-[10px] text-[16px]" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th className="bg-blue text-white font-bold text-center p-[10px]" {...props} />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="p-[10px] border-t border-gray" {...props} />
  ),
};

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="text-section">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
