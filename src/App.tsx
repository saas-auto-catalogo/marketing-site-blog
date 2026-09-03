import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { HeroSection } from './components/landing/HeroSection.js';
import { RoiCalculator } from './components/landing/RoiCalculator.js';
import { FeaturesGrid } from './components/landing/FeaturesGrid.js';
import { PricingSection } from './components/landing/PricingSection.js';
import { TestimonialsSection } from './components/landing/TestimonialsSection.js';
import { FaqSection } from './components/landing/FaqSection.js';
import { BlogPortal } from './components/blog/BlogPortal.js';
import { ArticleReader } from './components/blog/ArticleReader.js';
import { LegalDocumentPage } from './components/legal/LegalDocumentPage.js';
import { BlogArticle } from './types/blog.js';
import { SAMPLE_ARTICLES } from './data/sampleArticles.js';
import { redirectLegacyCheckoutPath } from './config/env.js';

type AppView = 'LANDING' | 'BLOG' | 'ARTICLE' | 'LEGAL';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('LANDING');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle>(SAMPLE_ARTICLES[0]);
  const [legalSlug, setLegalSlug] = useState('');

  const parseCurrentUrl = useCallback(() => {
    const path = window.location.pathname;

    if (redirectLegacyCheckoutPath(path)) {
      return;
    }

    const normalizedPath = path.toLowerCase();

    if (normalizedPath.startsWith('/legal/')) {
      const slug = normalizedPath.replace('/legal/', '').replace(/\/$/, '');
      setLegalSlug(slug);
      setCurrentView('LEGAL');
      return;
    }

    if (normalizedPath === '/legal' || normalizedPath === '/legal/') {
      setLegalSlug('');
      setCurrentView('LEGAL');
      return;
    }

    if (normalizedPath.startsWith('/blog/')) {
      const slug = normalizedPath.replace('/blog/', '').replace(/\/$/, '');
      const found = SAMPLE_ARTICLES.find((a) => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
        setCurrentView('ARTICLE');
        return;
      }
    }

    if (normalizedPath === '/blog' || normalizedPath === '/blog/') {
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

  const handleOpenArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setCurrentView('ARTICLE');
    window.history.pushState({ view: 'ARTICLE', slug: article.slug }, '', `/blog/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (slug: string) => {
    setLegalSlug(slug);
    setCurrentView('LEGAL');
    window.history.pushState({ view: 'LEGAL', slug }, '', `/legal/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'LANDING' | 'BLOG') => {
    setCurrentView(view);
    const newPath = view === 'BLOG' ? '/blog' : '/';
    window.history.pushState({ view }, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-typography-body font-sans selection:bg-brand-primary selection:text-white">
      <Navbar
        currentView={currentView === 'ARTICLE' ? 'ARTICLE' : currentView === 'BLOG' ? 'BLOG' : 'LANDING'}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {currentView === 'LANDING' && (
          <>
            <HeroSection />
            <FeaturesGrid />
            <RoiCalculator />
            <PricingSection />
            <TestimonialsSection />
            <FaqSection />
          </>
        )}

        {currentView === 'BLOG' && (
          <BlogPortal onSelectArticle={handleOpenArticle} />
        )}

        {currentView === 'ARTICLE' && (
          <ArticleReader
            article={selectedArticle}
            onBackToBlog={() => handleNavigate('BLOG')}
            onGoToLanding={() => handleNavigate('LANDING')}
            onSelectArticle={handleOpenArticle}
          />
        )}

        {currentView === 'LEGAL' && (
          <LegalDocumentPage
            slug={legalSlug}
            onGoToLanding={() => handleNavigate('LANDING')}
            onOpenLegal={handleOpenLegal}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} onOpenLegal={handleOpenLegal} />
    </div>
  );
}
