export const LEGAL_SLUGS = [
  'termos-de-uso',
  'politica-de-privacidade',
  'politica-de-cookies',
  'contrato-saas',
  'aviso-lgpd',
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalDocument {
  slug: LegalSlug;
  title: string;
  shortLabel: string;
  version: string;
  publishedAt: string;
  contentHash: string;
  xml: string;
}
