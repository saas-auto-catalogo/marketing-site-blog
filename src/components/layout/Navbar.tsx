import { useState } from 'react';
import { Layers, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
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
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-typography-body">
            <a href="#como-funciona" className="hover:text-brand-primary transition-colors">
              Como Funciona
            </a>
            <a href="#calculadora-roi" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
              <span>Calculadora ROI</span>
              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">
                Novo
              </span>
            </a>
            <a href="#integradores" className="hover:text-brand-primary transition-colors">
              Integradores DMS
            </a>
            <a href="#planos" className="hover:text-brand-primary transition-colors">
              Planos & Preços
            </a>
            <a href="#faq" className="hover:text-brand-primary transition-colors">
              Dúvidas
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="http://127.0.0.1:5173"
              className="text-sm font-bold text-typography-heading hover:text-brand-primary transition-colors px-3 py-2"
            >
              Entrar
            </a>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-price hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all hover:translate-y-[-1px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Teste Grátis 14 Dias</span>
            </a>
          </div>

          {/* Botão Mobile */}
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

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-white px-4 pt-2 pb-6 space-y-3">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Como Funciona
          </a>
          <a
            href="#calculadora-roi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Calculadora de ROI
          </a>
          <a
            href="#integradores"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Integradores DMS
          </a>
          <a
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-typography-heading hover:bg-slate-50"
          >
            Planos & Preços
          </a>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="http://127.0.0.1:5173"
              className="w-full text-center py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-typography-heading"
            >
              Acessar Plataforma
            </a>
            <a
              href="#planos"
              onClick={() => setMobileMenuOpen(false)}
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
