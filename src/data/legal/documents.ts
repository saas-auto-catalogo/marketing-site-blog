import { LegalDocument } from '../../types/legal.js';

// Snapshots of legal-docs AKN v1 (manifest 2026-09-02). Update when the source repo publishes a new version.
import avisoLgpdXml from './aviso-lgpd.xml?raw';
import contratoSaasXml from './contrato-saas.xml?raw';
import politicaCookiesXml from './politica-de-cookies.xml?raw';
import politicaPrivacidadeXml from './politica-de-privacidade.xml?raw';
import termosDeUsoXml from './termos-de-uso.xml?raw';

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: 'termos-de-uso',
    title: 'Termos de Uso',
    shortLabel: 'Termos de Uso',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:5af171e0a51e9ed7e078d80b5a68c9c3cd57d1d65965d6916dda5643ba4ebb1c',
    xml: termosDeUsoXml,
  },
  {
    slug: 'politica-de-privacidade',
    title: 'Política de Privacidade',
    shortLabel: 'Privacidade',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:21e1247beb7ab7032a14c21632b39e8b6e2ae9e687d749fa4f4a02b62ffce31c',
    xml: politicaPrivacidadeXml,
  },
  {
    slug: 'politica-de-cookies',
    title: 'Política de Cookies',
    shortLabel: 'Cookies',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:ce7d49a07c2afa739c3774e04dedae5712e449814d1d9fac8b03ddca6612cddc',
    xml: politicaCookiesXml,
  },
  {
    slug: 'contrato-saas',
    title: 'Contrato SaaS',
    shortLabel: 'Contrato SaaS',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:bbacb45dcc3d4a083065b03c54410dd10a2870da08f334c082a4a6c3393a65d9',
    xml: contratoSaasXml,
  },
  {
    slug: 'aviso-lgpd',
    title: 'Aviso LGPD',
    shortLabel: 'Aviso LGPD',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:129fb8fe0b19bc17ed10d4bc01cbdda4259e057c8d2106e69b0e694e87888e96',
    xml: avisoLgpdXml,
  },
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.slug === slug);
}
