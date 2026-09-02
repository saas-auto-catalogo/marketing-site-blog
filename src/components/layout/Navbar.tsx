import { useState } from 'react';
import { Layers, ArrowRight, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { getAppLoginUrl, getAppRegisterUrl } from '../../config/env.js';

interface NavbarProps {
  currentView?: 'LANDING' | 'BLOG' | 'ARTICLE';
  onNavigate?: (view: 'LANDING' | 'BLOG') => void;
}

export function Navbar({ currentView = 'LANDING', onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: 'LANDING' | 'BLOG', hash?: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => handleNav('LANDING')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-typography-heading flex items-center gap-1.5">
                Auto Catálogo <span className="w-2 h-2 rounded-full bg-brand-price"></span>
              </span>
              <span className="text-[10px] text-typography-muted font-bold tracking-wider uppercase">
                Meta Automotive DAA
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-typography-body">
            <button
              onClick={() => handleNav('LANDING', 'como-funciona')}
              className="hover:text-brand-primary transition-colors font-semibold"
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleNav('LANDING', 'calculadora-roi')}
              className="hover:text-brand-primary transition-colors flex items-center gap-1.5 font-semibold"
            >
              <span>Calculadora ROI</span>
              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">
                Novo
              </span>
            </button>
            <button
              onClick={() => handleNav('LANDING', 'integradores')}
              className="hover:text-brand-primary transition-colors font-semibold"
            >
              Integradores DMS
            </button>
            <button
              onClick={() => handleNav('LANDING', 'planos')}
              className="hover:text-brand-primary transition-colors font-semibold"
            >
              Planos & Preços
            </button>
            <button
              onClick={() => handleNav('BLOG')}
              className={`hover:text-brand-primary transition-colors flex items-center gap-1 font-semibold ${
                currentView === 'BLOG' || currentView === 'ARTICLE'
                  ? 'text-brand-primary font-extrabold'
                  : ''
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog & Guias</span>
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <a
              href={getAppLoginUrl()}
              className="text-sm font-bold text-typography-heading hover:text-brand-primary transition-colors px-3 py-2"
            >
              Entrar
            </a>
            <a
              href={getAppRegisterUrl('trial')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-price hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all hover:translate-y-[-1px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Teste Grátis 14 Dias</span>
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-typography-heading hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-white px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => handleNav('LANDING', 'como-funciona')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Como Funciona
          </button>
          <button
            onClick={() => handleNav('LANDING', 'calculadora-roi')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Calculadora de ROI
          </button>
          <button
            onClick={() => handleNav('LANDING', 'planos')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Planos & Preços
          </button>
          <button
            onClick={() => handleNav('BLOG')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-brand-primary hover:bg-slate-50 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Portal do Blog</span>
          </button>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={getAppLoginUrl()}
              className="w-full text-center py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-typography-heading"
            >
              Entrar
            </a>
            <a
              href={getAppRegisterUrl('trial')}
              className="w-full text-center py-2.5 rounded-lg bg-brand-price text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>Começar Teste Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
