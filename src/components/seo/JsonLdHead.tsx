import { useEffect } from 'react';
import { BlogArticle } from '../../types/blog.js';

interface JsonLdHeadProps {
  article?: BlogArticle;
}

export function JsonLdHead({ article }: JsonLdHeadProps) {
  useEffect(() => {
    if (!article) return;

    // Atualiza title e meta tags no documento
    document.title = `${article.title} | Auto Catálogo Blog`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.metaDescription);

    // Schema.org Article
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description: article.metaDescription,
      image: [article.heroImage],
      datePublished: '2026-03-14T08:00:00+00:00',
      dateModified: '2026-03-14T10:00:00+00:00',
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Auto Catálogo SaaS',
        logo: {
          '@type': 'ImageObject',
          url: 'https://autocatalogo.com.br/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://autocatalogo.com.br/blog/${article.slug}`,
      },
    };

    // Schema.org FAQPage se houver perguntas
    const faqSchema =
      article.faq && article.faq.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: article.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }
        : null;

    // Remove scripts antigos injetados
    const existingScripts = document.querySelectorAll('script[data-jsonld="auto-catalogo"]');
    existingScripts.forEach((s) => s.remove());

    // Injeta Schema de Artigo
    const scriptArticle = document.createElement('script');
    scriptArticle.type = 'application/ld+json';
    scriptArticle.setAttribute('data-jsonld', 'auto-catalogo');
    scriptArticle.text = JSON.stringify(articleSchema);
    document.head.appendChild(scriptArticle);

    // Injeta Schema de FAQ
    if (faqSchema) {
      const scriptFaq = document.createElement('script');
      scriptFaq.type = 'application/ld+json';
      scriptFaq.setAttribute('data-jsonld', 'auto-catalogo');
      scriptFaq.text = JSON.stringify(faqSchema);
      document.head.appendChild(scriptFaq);
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-jsonld="auto-catalogo"]');
      scripts.forEach((s) => s.remove());
    };
  }, [article]);

  return null;
}
