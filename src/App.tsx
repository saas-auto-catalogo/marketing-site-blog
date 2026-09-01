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
import { SelectedPlan, BillingInterval } from './types/checkout.js';

export function App() {
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

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-typography-body font-sans selection:bg-brand-primary selection:text-white">
      {/* Navbar Superior com Links e CTAs */}
      <Navbar />

      {/* Conteúdo Principal da Landing Page */}
      <main className="flex-1">
        {/* 1. Hero Section com Simulador Interativo do Instagram DAA */}
        <HeroSection />

        {/* 2. Grid de Recursos & Diferenciais Técnicos */}
        <FeaturesGrid />

        {/* 3. Calculadora Interativa de ROI com Slider Dinâmico */}
        <RoiCalculator />

        {/* 4. Tabela de Planos e Preços com Trigger para o Checkout Modal */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* 5. Depoimentos e Prova Social de Concessionárias */}
        <TestimonialsSection />

        {/* 6. FAQ Acordeon com Dúvidas Frequentes */}
        <FaqSection />
      </main>

      {/* Modal de Checkout Transparente Stripe */}
      <TransparentCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        plan={selectedPlan}
        billingInterval={billingInterval}
      />

      {/* Footer Institucional */}
      <Footer />
    </div>
  );
}
