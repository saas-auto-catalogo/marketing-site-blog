import { useMemo, type MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { LEGAL_DOCUMENTS, getLegalDocument } from '../../data/legal/documents.js';
import { aknToHtml } from '../../lib/aknToHtml.js';
import { LegalJsonLdHead } from '../seo/LegalJsonLdHead.js';

interface LegalDocumentPageProps {
  slug: string;
  onGoToLanding: () => void;
  onOpenLegal: (slug: string) => void;
}

export function LegalDocumentPage({ slug, onGoToLanding, onOpenLegal }: LegalDocumentPageProps) {
  const document = getLegalDocument(slug);
  const parsed = useMemo(
    () => (document ? aknToHtml(document.xml) : { html: '', firstParagraph: '' }),
    [document]
  );

  const handleContentClick = (event: MouseEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href?.startsWith('/legal/')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    const nextSlug = href.replace(/^\/legal\//, '').replace(/\/$/, '');
    onOpenLegal(nextSlug);
  };

  if (!document) {
    return (
      <div className="bg-surface-canvas min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <h1 className="text-3xl font-extrabold text-typography-heading">Documento não encontrado</h1>
          <p className="text-typography-muted">
            Não há página jurídica em <span className="font-mono text-sm">/legal/{slug || '…'}</span>.
          </p>
          <button
            onClick={onGoToLanding}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary-dark transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const related = LEGAL_DOCUMENTS.filter((item) => item.slug !== document.slug);

  return (
    <article className="bg-surface-canvas min-h-screen py-10">
      <LegalJsonLdHead
        title={document.title}
        slug={document.slug}
        description={parsed.firstParagraph}
        dateModified={document.publishedAt}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={onGoToLanding}
            className="hover:text-brand-primary transition-colors"
          >
            Início
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-typography-heading font-bold">{document.title}</span>
        </nav>

        <header className="space-y-3 border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-typography-heading tracking-tight">
            {document.title}
          </h1>
          <p className="text-sm text-typography-muted">
            Versão {document.version}
          </p>
        </header>

        <div
          onClick={handleContentClick}
          className="text-base leading-relaxed text-typography-body
            [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-typography-heading [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-28
            [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
            [&_li_p]:mb-0
            [&_a]:text-brand-primary [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2
            [&_strong]:text-typography-heading
            [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:min-w-[36rem]
            [&_th]:text-left [&_th]:bg-slate-50 [&_th]:font-bold [&_th]:text-typography-heading [&_th]:px-3 [&_th]:py-2 [&_th]:border [&_th]:border-slate-200
            [&_td]:px-3 [&_td]:py-2 [&_td]:border [&_td]:border-slate-200 [&_td]:align-top"
          dangerouslySetInnerHTML={{ __html: parsed.html }}
        />

        <nav className="pt-6 border-t border-slate-200">
          <p className="text-xs font-bold uppercase tracking-wider text-typography-muted mb-3">
            Outros documentos
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <a
                  href={`/legal/${item.slug}`}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                      return;
                    }
                    event.preventDefault();
                    onOpenLegal(item.slug);
                  }}
                  className="text-brand-primary font-semibold hover:underline"
                >
                  {item.shortLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
