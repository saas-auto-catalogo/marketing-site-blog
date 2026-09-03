import { Layers, ShieldCheck, CheckCircle2, Heart, BookOpen } from 'lucide-react';
import type { MouseEvent } from 'react';
import { getAppLoginUrl } from '../../config/env.js';
import { LEGAL_DOCUMENTS } from '../../data/legal/documents.js';

interface FooterProps {
  onNavigate?: (view: 'LANDING' | 'BLOG') => void;
  onOpenLegal?: (slug: string) => void;
}

export function Footer({ onNavigate, onOpenLegal }: FooterProps) {
  const handleLegalClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (!onOpenLegal) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onOpenLegal(slug);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Coluna 1 & 2: Identidade & Selos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Auto Catálogo <span className="text-red-500">•</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A plataforma líder no Brasil em automação e sincronização de feeds de estoque para Meta Automotive Inventory Ads no Instagram e Facebook.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>SSL 256-Bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Meta Business Partner Ready</span>
              </div>
            </div>
          </div>

          {/* Coluna 3: Produto */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Navegação</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate?.('LANDING')} className="hover:text-white transition-colors">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('BLOG')} className="hover:text-white transition-colors flex items-center gap-1.5 text-blue-400 font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Portal do Blog</span>
                </button>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#calculadora-roi" className="hover:text-white transition-colors">Calculadora de ROI</a>
              </li>
              <li>
                <a href="#planos" className="hover:text-white transition-colors">Planos & Preços</a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Integradores */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Integradores DMS</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">AutoCerto XML</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Altimus Hub</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Sisvag DMS</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">BomControle ERP</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Webmotors Custom Feed</span></li>
            </ul>
          </div>

          {/* Coluna 5: Conectar */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Acesso Direto</p>
            <div className="space-y-2">
              <a
                href={getAppLoginUrl()}
                className="block w-full text-center py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
              >
                Painel da Concessionária
              </a>
              <a
                href="http://127.0.0.1:5174"
                className="block w-full text-center py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
              >
                Portal Super Admin
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col gap-4 text-xs text-slate-500">
          <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2">
            {LEGAL_DOCUMENTS.map((doc, index) => (
              <span key={doc.slug} className="inline-flex items-center gap-3">
                {index > 0 && <span aria-hidden="true" className="text-slate-700">·</span>}
                <a
                  href={`/legal/${doc.slug}`}
                  onClick={(event) => handleLegalClick(event, doc.slug)}
                  className="hover:text-white transition-colors"
                >
                  {doc.shortLabel}
                </a>
              </span>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Auto Catálogo SaaS. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito para o ecossistema automotivo brasileiro <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
