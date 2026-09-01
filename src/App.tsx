import { useState } from 'react';
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

  const handleSelectPlan = (plan: SelectedPlan, interval: BillingInterval) => {
    setSelectedPlan(plan);
    setBillingInterval(interval);
    setCheckoutModalOpen(true);
  };

  const handleOpenArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setCurrentView('ARTICLE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'LANDING' | 'BLOG') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-typography-body font-sans selection:bg-brand-primary selection:text-white">
      {/* Navbar Superior com Links e Controle de Roteamento */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Conteúdo Dinâmico */}
      <main className="flex-1">
        {/* VIEW 1: LANDING PAGE COMERCIAL */}
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

        {/* VIEW 2: PORTAL DO BLOG AUDIENCE FIRST */}
        {currentView === 'BLOG' && (
          <BlogPortal
            onSelectArticle={handleOpenArticle}
            onGoToLanding={() => handleNavigate('LANDING')}
          />
        )}

        {/* VIEW 3: LEITOR DE ARTIGO SEO LONG-FORM */}
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
