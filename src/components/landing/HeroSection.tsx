import { useState } from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2, RefreshCw, Zap } from 'lucide-react';
import {
  AutoCertoLogo,
  AltimusLogo,
  SisvagLogo,
  BomControleLogo,
  WebmotorsLogo,
  FlameSvg
} from '../icons/DmsLogos.js';
import { getAppRegisterUrl } from '../../config/env.js';

const PREVIEW_CARS = [
  {
    id: '1',
    make: 'BMW',
    model: '320i M Sport',
    year: '2026',
    price: 'R$ 349.900',
    km: '14.200 KM',
    plate: 'BRA-2E26',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    status: 'Disponível no Pátio',
  },
  {
    id: '2',
    make: 'Porsche',
    model: 'Macan GTS 2.9 Turbo',
    year: '2025',
    price: 'R$ 689.000',
    km: '8.900 KM',
    plate: 'SPO-9G80',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    status: 'Sincronizado Agora',
  },
  {
    id: '3',
    make: 'Mercedes-Benz',
    model: 'GLC 300 4MATIC',
    year: '2026',
    price: 'R$ 429.900',
    km: '5.100 KM',
    plate: 'GLC-3026',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
    status: 'Feed Atualizado',
  },
];

export function HeroSection() {
  const [activeCarIdx, setActiveCarIdx] = useState(0);
  const activeCar = PREVIEW_CARS[activeCarIdx];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-surface-canvas to-surface-canvas">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-100/40 via-indigo-100/30 to-red-100/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: TEXTO COMERCIAL DE ALTA CONVERSÃO */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Flutuante de Benefício com SVG Flame */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-primary text-xs font-extrabold shadow-sm">
              <span className="text-red-500 flex items-center">
                <FlameSvg className="w-3.5 h-3.5 fill-current" />
              </span>
              <span>Atualização em Tempo Real • -38% no Custo por Lead (CPL)</span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-typography-heading tracking-tight leading-[1.15]">
              Automatize seu Catálogo de Veículos no Instagram com{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-indigo-600">
                Feeds XML em Tempo Real
              </span>
            </h1>

            {/* Subtítulo com Dores Claras do Lojista */}
            <p className="text-base sm:text-lg text-typography-body max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Conecte seu estoque do <strong>AutoCerto, Altimus ou Sisvag</strong> ao <strong>Meta Automotive Ads (DAA)</strong> em 3 minutos. Nunca mais queime verba de anúncios em carros já vendidos.
            </p>

            {/* CTAs de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={getAppRegisterUrl('trial')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-price hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-500/25 hover:shadow-red-500/35 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Começar Teste Grátis de 14 Dias</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#calculadora-roi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-brand-primary font-bold text-base border-2 border-brand-primary/20 hover:border-brand-primary transition-all shadow-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Simular Meu ROI</span>
              </a>
            </div>

            {/* Micro Prova Social Abaixo do Botão */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-6 text-xs text-typography-muted">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Sem cartão de crédito
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Setup em 3 minutos
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Cancelamento livre
              </span>
            </div>
          </div>

          {/* LADO DIREITO: SIMULADOR INTERATIVO META DAA (CARROSSEL DO INSTAGRAM) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl bg-slate-900 p-4 shadow-2xl ring-1 ring-slate-800">
              
              {/* Header do Mockup do Instagram */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-[2px]">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-bold">
                      AC
                    </div>
                  </div>
                  <div>
                    <p className="font-bold leading-tight">Saga Motors Seminovos</p>
                    <p className="text-[10px] text-slate-400">Patrocinado • Meta DAA</p>
                  </div>
                </div>

                <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Live Feed
                </span>
              </div>

              {/* Card do Veículo no Carrossel */}
              <div className="mt-3 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={activeCar.image}
                    alt={activeCar.model}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded">
                    Placa: {activeCar.plate}
                  </div>
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    {activeCar.status}
                  </div>
                </div>

                {/* Dados do Carro */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{activeCar.make}</p>
                      <h4 className="text-sm font-extrabold text-white">{activeCar.model}</h4>
                    </div>
                    <span className="text-base font-extrabold text-red-500 font-mono">
                      {activeCar.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                    <span>Ano: {activeCar.year}</span>
                    <span>{activeCar.km}</span>
                    <span className="text-green-400 font-bold">100% In Stock</span>
                  </div>
                </div>
              </div>

              {/* Botão de Enviar Mensagem no WhatsApp (Simulado Meta Ads) */}
              <div className="mt-3">
                <button
                  onClick={() => setActiveCarIdx((prev) => (prev + 1) % PREVIEW_CARS.length)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Alternar Carro do Feed XML ({activeCarIdx + 1}/3)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BAR: HOMOLOGAÇÃO COM INTEGRADORES DMS BRASILEIROS (SVGs VETORIAIS) */}
        <div id="integradores" className="mt-16 pt-10 border-t border-surface-border text-center">
          <p className="text-xs font-bold text-typography-muted uppercase tracking-widest">
            Sincronização 100% Homologada com os Principais Integradores do Brasil:
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-extrabold text-xs sm:text-sm text-slate-700">
            <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-brand-primary hover:shadow-md transition-all">
              <AutoCertoLogo className="w-5 h-5" />
              <span>AutoCerto XML</span>
            </div>
            
            <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-brand-primary hover:shadow-md transition-all">
              <AltimusLogo className="w-5 h-5" />
              <span>Altimus Hub</span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-brand-primary hover:shadow-md transition-all">
              <SisvagLogo className="w-5 h-5" />
              <span>Sisvag DMS</span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-brand-primary hover:shadow-md transition-all">
              <BomControleLogo className="w-5 h-5" />
              <span>BomControle ERP</span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-brand-primary hover:shadow-md transition-all">
              <WebmotorsLogo className="w-5 h-5" />
              <span>Webmotors Feed</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
