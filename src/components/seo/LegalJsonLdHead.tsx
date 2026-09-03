import { useEffect } from 'react';

const LANDING_TITLE = 'Auto Catálogo SaaS — Feeds XML para Meta Automotive Ads no Instagram';
const LANDING_DESCRIPTION =
  'Automatize seu catálogo de veículos no Instagram e Facebook com feeds XML em tempo real do AutoCerto, Altimus e Sisvag. Reduza em 38% o custo por lead.';
const SITE_ORIGIN = 'https://autocatalogo.com.br';
const JSON_LD_ATTR = 'auto-catalogo-legal';

interface LegalJsonLdHeadProps {
  title: string;
  slug: string;
  description: string;
  dateModified: string;
}

export function LegalJsonLdHead({ title, slug, description, dateModified }: LegalJsonLdHeadProps) {
  useEffect(() => {
    document.title = `${title} | Auto Catálogo`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    document.querySelectorAll(`script[data-jsonld="${JSON_LD_ATTR}"]`).forEach((script) => script.remove());

    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `${SITE_ORIGIN}/legal/${slug}`,
      dateModified,
      inLanguage: 'pt-BR',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Auto Catálogo',
        url: SITE_ORIGIN,
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', JSON_LD_ATTR);
    script.text = JSON.stringify(pageSchema);
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll(`script[data-jsonld="${JSON_LD_ATTR}"]`).forEach((node) => node.remove());
    };
  }, [title, slug, description, dateModified]);

  useEffect(() => {
    return () => {
      document.title = LANDING_TITLE;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', LANDING_DESCRIPTION);
      }
    };
  }, []);

  return null;
}
