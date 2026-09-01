import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { HeroSection } from './components/landing/HeroSection.js';
import { RoiCalculator } from './components/landing/RoiCalculator.js';
import { FeaturesGrid } from './components/landing/FeaturesGrid.js';
import { PricingSection } from './components/landing/PricingSection.js';
import { TestimonialsSection } from './components/landing/TestimonialsSection.js';
import { FaqSection } from './components/landing/FaqSection.js';
import { TransparentCheckoutModal } from './components/checkout/TransparentCheckoutModal.js';
import { BlogPortal } from './components/blog/BlogPortal.js';
import { ArticleReader } from './components/blog/ArticleReader.js';
import { SelectedPlan, BillingInterval } from './types/checkout.js';
import { BlogArticle } from './types/blog.js';
import { SAMPLE_ARTICLES } from './data/sampleArticles.js';

export function App() {
  const [currentView, setCurrentView] = useState<'LANDING' | 'BLOG' | 'ARTICLE'>('LANDING');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle>(SAMPLE_ARTICLES[0]);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>({
    key: 'PRO',
    name: 'Pro Automotive',
    monthlyPrice: 890,
    yearlyPrice: 8900,
    carsLimit: 'Até 200 veículos',
  });
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('MONTHLY');

  // Parser de URL inicial e sincronizador com a History API
  const parseCurrentUrl = useCallback(() => {
    const path = window.location.pathname.toLowerCase();

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').replace(/\/$/, '');
      const found = SAMPLE_ARTICLES.find((a) => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
        setCurrentView('ARTICLE');
        return;
      }
    }

    if (path === '/blog' || path === '/blog/') {
      setCurrentView('BLOG');
      return;
    }

    setCurrentView('LANDING');
  }, []);

  // Inicialização e escuta de eventos popstate (botões Voltar/Avançar do navegador)
  useEffect(() => {
    parseCurrentUrl();

    const handlePopState = () => {
      parseCurrentUrl();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseCurrentUrl]);

  // Transição de rotas com pushState
  const handleOpenArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setCurrentView('ARTICLE');
    window.history.pushState({ view: 'ARTICLE', slug: article.slug }, '', `/blog/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'LANDING' | 'BLOG') => {
    setCurrentView(view);
    const newPath = view === 'BLOG' ? '/blog' : '/';
    window.history.pushState({ view }, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (plan: SelectedPlan, interval: BillingInterval) => {
    setSelectedPlan(plan);
    setBillingInterval(interval);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-typography-body font-sans selection:bg-brand-primary selection:text-white">
      {/* Navbar Superior com Links e Controle de Roteamento */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Conteúdo Dinâmico */}
      <main className="flex-1">
        {/* VIEW 1: LANDING PAGE COMERCIAL (/) */}
        {currentView === 'LANDING' && (
          <>
            <HeroSection />
            <FeaturesGrid />
            <RoiCalculator />
            <PricingSection onSelectPlan={handleSelectPlan} />
            <TestimonialsSection />
            <FaqSection />
          </>
        )}

        {/* VIEW 2: PORTAL DO BLOG AUDIENCE FIRST (/blog) */}
        {currentView === 'BLOG' && (
          <BlogPortal
            onSelectArticle={handleOpenArticle}
            onGoToLanding={() => handleNavigate('LANDING')}
          />
        )}

        {/* VIEW 3: LEITOR DE ARTIGO SEO LONG-FORM (/blog/:slug) */}
        {currentView === 'ARTICLE' && (
          <ArticleReader
            article={selectedArticle}
            onBackToBlog={() => handleNavigate('BLOG')}
            onGoToLanding={() => handleNavigate('LANDING')}
            onSelectArticle={handleOpenArticle}
          />
        )}
      </main>

      {/* Modal de Checkout Transparente Stripe */}
      <TransparentCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        plan={selectedPlan}
        billingInterval={billingInterval}
      />

      {/* Footer Institucional */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
