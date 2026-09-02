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
import { CheckoutSuccessPage } from './components/checkout/CheckoutSuccessPage.js';
import { CheckoutCancelPage } from './components/checkout/CheckoutCancelPage.js';
import { BlogPortal } from './components/blog/BlogPortal.js';
import { ArticleReader } from './components/blog/ArticleReader.js';
import { SelectedPlan, BillingInterval, PlanKey } from './types/checkout.js';
import { BlogArticle } from './types/blog.js';
import { SAMPLE_ARTICLES } from './data/sampleArticles.js';
import { loadCheckoutContext } from './services/checkoutService.js';

type AppView = 'LANDING' | 'BLOG' | 'ARTICLE' | 'CHECKOUT_SUCCESS' | 'CHECKOUT_CANCEL';

const DEFAULT_PLAN: SelectedPlan = {
  key: 'PRO',
  name: 'Pro Automotive',
  monthlyPrice: 890,
  yearlyPrice: 8900,
  carsLimit: 'Até 200 veículos',
};

const PLAN_DEFAULTS: Record<PlanKey, SelectedPlan> = {
  STARTER: {
    key: 'STARTER',
    name: 'Starter Catalog',
    monthlyPrice: 490,
    yearlyPrice: 4900,
    carsLimit: 'Até 50 veículos',
  },
  PRO: DEFAULT_PLAN,
  ENTERPRISE: {
    key: 'ENTERPRISE',
    name: 'Enterprise DAA',
    monthlyPrice: 1490,
    yearlyPrice: 14900,
    carsLimit: 'Veículos Ilimitados',
  },
};

function parsePlanFromQuery(): { plan: SelectedPlan; interval: BillingInterval } | null {
  const params = new URLSearchParams(window.location.search);
  const planKey = params.get('plan')?.toUpperCase() as PlanKey | undefined;
  const interval = params.get('interval')?.toUpperCase();

  if (!planKey || !PLAN_DEFAULTS[planKey]) return null;

  return {
    plan: PLAN_DEFAULTS[planKey],
    interval: interval === 'YEARLY' ? 'YEARLY' : 'MONTHLY',
  };
}

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('LANDING');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle>(SAMPLE_ARTICLES[0]);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>(DEFAULT_PLAN);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('MONTHLY');

  const parseCurrentUrl = useCallback(() => {
    const path = window.location.pathname.toLowerCase();

    if (path === '/checkout/success' || path === '/checkout/success/') {
      setCurrentView('CHECKOUT_SUCCESS');
      return;
    }

    if (path === '/checkout/cancel' || path === '/checkout/cancel/') {
      setCurrentView('CHECKOUT_CANCEL');
      return;
    }

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

  useEffect(() => {
    parseCurrentUrl();

    const handlePopState = () => {
      parseCurrentUrl();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseCurrentUrl]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('checkout') === '1') {
      const fromQuery = parsePlanFromQuery();
      const fromStorage = loadCheckoutContext();

      if (fromQuery) {
        setSelectedPlan(fromQuery.plan);
        setBillingInterval(fromQuery.interval);
      } else if (fromStorage) {
        setSelectedPlan(fromStorage.plan);
        setBillingInterval(fromStorage.billingInterval);
      }

      setCheckoutModalOpen(true);
    } else {
      const fromQuery = parsePlanFromQuery();
      if (fromQuery) {
        setSelectedPlan(fromQuery.plan);
        setBillingInterval(fromQuery.interval);
      }
    }
  }, []);

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

  const handleRetryCheckout = () => {
    const context = loadCheckoutContext();
    if (context) {
      setSelectedPlan(context.plan);
      setBillingInterval(context.billingInterval);
    }
    setCurrentView('LANDING');
    setCheckoutModalOpen(true);
  };

  const showLandingChrome = currentView === 'LANDING' || currentView === 'BLOG' || currentView === 'ARTICLE';

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-typography-body font-sans selection:bg-brand-primary selection:text-white">
      {showLandingChrome && (
        <Navbar currentView={currentView === 'ARTICLE' ? 'ARTICLE' : currentView === 'BLOG' ? 'BLOG' : 'LANDING'} onNavigate={handleNavigate} />
      )}

      <main className="flex-1">
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

        {currentView === 'BLOG' && (
          <BlogPortal
            onSelectArticle={handleOpenArticle}
            onGoToLanding={() => handleNavigate('LANDING')}
          />
        )}

        {currentView === 'ARTICLE' && (
          <ArticleReader
            article={selectedArticle}
            onBackToBlog={() => handleNavigate('BLOG')}
            onGoToLanding={() => handleNavigate('LANDING')}
            onSelectArticle={handleOpenArticle}
          />
        )}

        {currentView === 'CHECKOUT_SUCCESS' && <CheckoutSuccessPage />}

        {currentView === 'CHECKOUT_CANCEL' && (
          <CheckoutCancelPage onRetryCheckout={handleRetryCheckout} />
        )}
      </main>

      <TransparentCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        plan={selectedPlan}
        billingInterval={billingInterval}
      />

      {showLandingChrome && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
