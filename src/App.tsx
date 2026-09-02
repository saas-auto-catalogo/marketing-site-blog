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
import { BlogArticle } from './types/blog.js';
import { SAMPLE_ARTICLES } from './data/sampleArticles.js';
import { redirectLegacyCheckoutPath } from './config/env.js';

type AppView = 'LANDING' | 'BLOG' | 'ARTICLE';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('LANDING');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle>(SAMPLE_ARTICLES[0]);

  const parseCurrentUrl = useCallback(() => {
    const path = window.location.pathname;

    if (redirectLegacyCheckoutPath(path)) {
      return;
    }

    const normalizedPath = path.toLowerCase();

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
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
