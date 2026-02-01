export interface ServiceMeta {
  title: string;
  slug: string;
  description: string;
  image?: string;
  order?: number;
  parent?: string;
}

export interface CaseMeta {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image?: string;
  date?: string;
}

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  image?: string;
  date: string;
  author?: string;
}

export interface ContentItem<T> {
  meta: T;
  content: string;
}
