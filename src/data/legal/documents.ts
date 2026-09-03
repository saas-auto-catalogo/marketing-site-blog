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
    contentHash: 'sha256:79ce8991aed8438985c8ca198ad3c885092ced7ca0f61ac97fa3792b49bcad9c',
    xml: termosDeUsoXml,
  },
  {
    slug: 'politica-de-privacidade',
    title: 'Política de Privacidade',
    shortLabel: 'Privacidade',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:5f451b0c2dd2006274ef84fbd73c7ba1c917db459e9796c6591685fd7f09214a',
    xml: politicaPrivacidadeXml,
  },
  {
    slug: 'politica-de-cookies',
    title: 'Política de Cookies',
    shortLabel: 'Cookies',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:a9d558f08383c9376dc768803a49bea0c995a6da8b11ea7e40570561c27f8268',
    xml: politicaCookiesXml,
  },
  {
    slug: 'contrato-saas',
    title: 'Contrato SaaS',
    shortLabel: 'Contrato SaaS',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:4eb7821b4807f014475bcb0ddf1994a1bedccccc27cccdaf22b5ad1cb8c7a57c',
    xml: contratoSaasXml,
  },
  {
    slug: 'aviso-lgpd',
    title: 'Aviso LGPD',
    shortLabel: 'Aviso LGPD',
    version: '2026-09-02',
    publishedAt: '2026-09-02',
    contentHash: 'sha256:bc457032428b941c737af21c8f17feece63223cf0ab5fc6161b3c1e95bd6e1a5',
    xml: avisoLgpdXml,
  },
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.slug === slug);
}
