import { useState } from 'react';
import { Check, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { FlameSvg } from '../icons/DmsLogos.js';
import { PlanKey } from '../../types/plan.js';
import { getAppRegisterUrl } from '../../config/env.js';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans: Array<{
    key: PlanKey | 'trial';
    name: string;
    isPopular: boolean;
    badge: string | null;
    monthlyPrice: number;
    yearlyPrice: number;
    carsLimit: string;
    annualBilled: string;
    description: string;
    features: string[];
    primaryCtaText: string;
    secondaryCtaText?: string;
    primaryRegisterPlan: 'STARTER' | 'PRO' | 'ENTERPRISE' | 'trial';
    secondaryRegisterPlan?: 'STARTER' | 'PRO' | 'ENTERPRISE';
    ctaHighlight: boolean;
  }> = [
    {
      key: 'STARTER',
      name: 'Starter Catalog',
      isPopular: false,
      badge: null,
      monthlyPrice: 490,
      yearlyPrice: 4900,
      carsLimit: 'Até 50 veículos',
      annualBilled: 'R$ 4.900 cobrados anualmente',
      description: 'Ideal para lojas boutique e revendas com estoque compacto de até 50 veículos.',
      features: [
        'Até 50 veículos ativos no catálogo',
        '1 integrador DMS conectado',
        'Sincronização diária de estoque',
        'Normalização de preços e tags XSD',
        'Suporte por email e base de ajuda',
      ],
      primaryCtaText: 'Contratar Starter',
      primaryRegisterPlan: 'STARTER',
      ctaHighlight: false,
    },
    {
      key: 'PRO',
      name: 'Pro Automotive',
      isPopular: true,
      badge: 'Mais Escolhido pelas Revendas',
      monthlyPrice: 890,
      yearlyPrice: 8900,
      carsLimit: 'Até 200 veículos',
      annualBilled: 'R$ 8.900 cobrados anualmente',
      description: 'O plano perfeito para concessionárias que buscam alta performance de vendas e escala no Meta Ads.',
      features: [
        'Até 200 veículos ativos no catálogo',
        'Sincronização a cada 15 minutos',
        'Normalização avançada de fotos 1:1',
        'Mapeamento De/Para customizado de DMS',
        'Suporte prioritário via WhatsApp',
        'Alertas de veículos vendidos e falhas',
      ],
      primaryCtaText: 'Testar Pro Grátis por 14 Dias',
      secondaryCtaText: 'Contratar Pro',
      primaryRegisterPlan: 'trial',
      secondaryRegisterPlan: 'PRO',
      ctaHighlight: true,
    },
    {
      key: 'ENTERPRISE',
      name: 'Enterprise DAA',
      isPopular: false,
      badge: 'Para Grupos e Multi-Lojas',
      monthlyPrice: 1490,
      yearlyPrice: 14900,
      carsLimit: 'Veículos Ilimitados',
      annualBilled: 'R$ 14.900 cobrados anualmente',
      description: 'Para grandes redes de concessionárias, grupos automotivos e agências de performance.',
      features: [
        'Veículos e catálogos ilimitados',
        'Suporte a múltiplas filiais e CNPJs',
        'Sincronização contínua em tempo real (sub-hora)',
        'Gerente de contas e onboarding dedicado',
        'SLA garantido de 99.9% de uptime',
        'API de Webhooks e relatórios executivos',
      ],
      primaryCtaText: 'Assinar Plano Enterprise',
      primaryRegisterPlan: 'ENTERPRISE',
      ctaHighlight: false,
    },
  ];

  return (
    <section id="planos" className="py-20 bg-white border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-extrabold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investimento Transparente</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-typography-heading tracking-tight">
            Planos Sob Medida para o Tamanho do seu Estoque
          </h2>
          <p className="text-base text-typography-muted leading-relaxed">
            Escolha o plano ideal. Teste grátis por 14 dias no Pro — contrate quando estiver pronto.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-typography-heading' : 'text-typography-muted'}`}>
              Mensal
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAnnual ? 'bg-brand-primary' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-bold flex items-center gap-1.5 ${isAnnual ? 'text-typography-heading' : 'text-typography-muted'}`}>
              <span>Anual</span>
              <span className="text-[10px] bg-green-100 text-green-700 font-extrabold px-2 py-0.5 rounded-full">
                2 Meses Grátis
              </span>
            </span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const displayPrice = isAnnual ? Math.round(p.yearlyPrice / 12) : p.monthlyPrice;

            return (
              <div
                key={p.key}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  p.ctaHighlight
                    ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white shadow-2xl ring-2 ring-brand-primary scale-105 z-10'
                    : 'bg-surface-canvas border border-surface-border text-typography-body shadow-sm hover:shadow-lg'
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
                    {p.isPopular ? (
                      <FlameSvg className="w-3.5 h-3.5 fill-current text-red-400" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                    )}
                    <span>{p.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-extrabold ${p.ctaHighlight ? 'text-white' : 'text-typography-heading'}`}>
                      {p.name}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed ${p.ctaHighlight ? 'text-slate-300' : 'text-typography-muted'}`}>
                      {p.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-typography-muted">R$</span>
                      <span className={`text-4xl font-extrabold font-mono tracking-tight ${p.ctaHighlight ? 'text-white' : 'text-brand-price'}`}>
                        {displayPrice.toLocaleString('pt-BR')}
                      </span>
                      <span className={`text-xs font-bold ${p.ctaHighlight ? 'text-slate-400' : 'text-typography-muted'}`}>
                        /mês
                      </span>
                    </div>
                    <p className={`text-[11px] ${p.ctaHighlight ? 'text-slate-400' : 'text-typography-muted'}`}>
                      {isAnnual ? p.annualBilled : 'Cobrança mensal sem fidelidade'}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-surface-border/50 text-xs">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.ctaHighlight ? 'text-green-400' : 'text-green-600'}`} />
                        <span className={p.ctaHighlight ? 'text-slate-200' : 'text-typography-body font-medium'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6 space-y-2">
                  <a
                    href={getAppRegisterUrl(p.primaryRegisterPlan)}
                    className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      p.ctaHighlight
                        ? 'bg-brand-price hover:bg-red-700 text-white shadow-red-500/25 hover:shadow-red-500/35 hover:scale-[1.02]'
                        : 'bg-white hover:bg-slate-100 text-typography-heading border border-slate-200'
                    }`}
                  >
                    <span>{p.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {p.secondaryCtaText && p.secondaryRegisterPlan && (
                    <a
                      href={getAppRegisterUrl(p.secondaryRegisterPlan)}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/20 text-white hover:bg-white/10"
                    >
                      <span>{p.secondaryCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs text-typography-muted flex items-center justify-center gap-2 font-semibold">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Garantia de 14 dias de teste grátis com suporte técnico completo de homologação.</span>
        </div>

      </div>
    </section>
  );
}
