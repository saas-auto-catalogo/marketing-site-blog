import { Zap, ShieldCheck, Cpu, RefreshCw, Smartphone, BarChart3 } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: <RefreshCw className="w-6 h-6 text-brand-primary" />,
      title: 'Sincronização Sub-Hora Contínua',
      description:
        'Carro vendido no pátio é removido do Instagram em minutos, eliminando de vez o desperdício com leads frustrados no WhatsApp.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
      title: 'Normalização Automática XSD',
      description:
        'Higienização em tempo real de preços, fotos 1:1 de alta resolução, marcas e anos compostos para 100% de aprovação no Meta Commerce Manager.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      title: 'Conexão 100% No-Code & Plug-and-Play',
      description:
        'Selecione seu integrador (AutoCerto, Altimus ou Sisvag), cole a URL do feed e nossa plataforma gera o catálogo Meta de forma autônoma.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-500" />,
      title: 'Carrossel Dinâmico Hiper-Personalizado',
      description:
        'Exiba automaticamente para cada comprador os modelos exatos que ele tem interesse em comprar, aumentando em 2.4x o CTR dos anúncios.',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Zero Latência na CDN Edge',
      description:
        'Feeds públicos com cache global de alta performance, suportando milhões de requisições diárias dos crawlers da Meta sem sobrecarregar seu DMS.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-brand-price" />,
      title: 'Telemetria e Diagnóstico de Feeds',
      description:
        'Monitore a saúde das sincronizações, volume de veículos ativos e histórico de requisições em tempo real pelo seu painel.',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-surface-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            Engenharia de Alto Desempenho
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-typography-heading tracking-tight">
            Tudo o que sua Concessionária Precisa para Dominar o Meta Ads
          </h2>
          <p className="text-base text-typography-muted leading-relaxed">
            Elimine planilhas manuais, suporte técnico demorado e ferramentas genéricas. O DriveSync foi desenhado exclusivamente para o mercado automotivo nacional.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm hover:shadow-xl hover:border-brand-primary/40 transition-all duration-300 group hover:-translate-y-1 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface-canvas border border-surface-border flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-extrabold text-typography-heading group-hover:text-brand-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-typography-body leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
