export type BlogCategory =
  | 'TODAS'
  | 'META_ADS_DAA'
  | 'GESTAO_ESTOQUE_DMS'
  | 'TRAFEGO_AUTOMOTIVO'
  | 'BENCHMARKS_ROI';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  category: BlogCategory;
  categoryLabel: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  heroImage: string;
  featured: boolean;
  tableOfContents: TableOfContentsItem[];
  summary: string;
  keyInsights: string[];
  faq: FaqItem[];
  tags: string[];
}
