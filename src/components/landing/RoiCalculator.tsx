import { useState } from 'react';
import { Calculator, Clock, DollarSign, MessageSquare, TrendingUp, Sparkles } from 'lucide-react';

export function RoiCalculator() {
  const [vehicles, setVehicles] = useState(80);

  // Cálculos dinâmicos com base em dados de mercado
  const hoursSaved = Math.round(vehicles * 0.52);
  const moneySavedMedia = Math.round(vehicles * 47.5);
  const extraLeads = Math.round(vehicles * 0.85);
  const estimatedRoi = ((moneySavedMedia * 12) / (890 * 12)).toFixed(1);

  return (
    <section id="calculadora-roi" className="py-20 bg-white border-y border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-brand-accent text-xs font-bold border border-green-200">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Eficiência Operacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-typography-heading tracking-tight">
            Calcule o Retorno sobre o Investimento da sua Concessionária
          </h2>
          <p className="text-base text-typography-muted leading-relaxed">
            Arraste o slider para informar o tamanho do seu pátio e veja o impacto financeiro imediato da automação de catálogo.
          </p>
        </div>

        {/* Card Principal da Calculadora */}
        <div className="mt-12 max-w-4xl mx-auto bg-surface-canvas rounded-3xl p-6 sm:p-10 border border-surface-border shadow-xl">
          
          {/* Controle do Slider */}
          <div className="space-y-4 pb-8 border-b border-surface-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="vehicle-slider" className="text-sm font-bold text-typography-heading">
                Volume Médio de Veículos em Estoque:
              </label>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-brand-primary text-white font-extrabold font-mono text-lg shadow-sm">
                <span>{vehicles} Carros no Pátio</span>
              </div>
            </div>

            <input
              id="vehicle-slider"
              type="range"
              min="20"
              max="500"
              step="5"
              value={vehicles}
              onChange={(e) => setVehicles(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />

            <div className="flex justify-between text-xs font-bold text-typography-muted font-mono">
              <span>20 Veículos (Boutique)</span>
              <span>150 Veículos (Médio Porte)</span>
              <span>500+ Veículos (Mega Store)</span>
            </div>
          </div>

          {/* Grid de Resultados Dinâmicos */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Horas Economizadas */}
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-2 group hover:border-brand-primary transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-typography-muted uppercase tracking-wider block">
                Tempo de Equipe Salvo
              </span>
              <p className="text-2xl font-extrabold text-typography-heading font-mono">
                {hoursSaved} Horas / Mês
              </p>
              <p className="text-xs text-typography-muted">
                Sem cadastro manual repetitivo no Gerenciador de Anúncios.
              </p>
            </div>

            {/* Card 2: Verba Salva em Carros Vendidos */}
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-2 group hover:border-brand-price transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-price flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-typography-muted uppercase tracking-wider block">
                Desperdício Evitado
              </span>
              <p className="text-2xl font-extrabold text-brand-price font-mono">
                R$ {moneySavedMedia.toLocaleString('pt-BR')} / Mês
              </p>
              <p className="text-xs text-typography-muted">
                Em cliques de anúncios em veículos que já foram vendidos.
              </p>
            </div>

            {/* Card 3: Novos Leads Qualificados */}
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-2 group hover:border-brand-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-brand-accent flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-typography-muted uppercase tracking-wider block">
                Leads Extras no WhatsApp
              </span>
              <p className="text-2xl font-extrabold text-brand-accent font-mono">
                +{extraLeads} Compradores
              </p>
              <p className="text-xs text-typography-muted">
                Gerados pelo formato dinâmico com fotos 1:1 e preço correto.
              </p>
            </div>

          </div>

          {/* Banner de ROI Estimado */}
          <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Retorno Médio Projetado</p>
                <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                  {estimatedRoi}x ROI sobre a Mensalidade do SaaS
                </p>
              </div>
            </div>

            <a
              href="#planos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-price hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-500/20 transition-all shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Garantir Essa Economia</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
