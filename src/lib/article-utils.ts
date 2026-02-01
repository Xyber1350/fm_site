function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\sа-яёА-ЯЁ-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(source: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, '').trim();
    items.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return items;
}

export function calculateReadingTime(source: string): number {
  // Remove MDX components, frontmatter, and markdown syntax
  const cleaned = source
    .replace(/---[\s\S]*?---/, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*`\[\]()]/g, '')
    .trim();

  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200; // Average reading speed for Russian text
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
