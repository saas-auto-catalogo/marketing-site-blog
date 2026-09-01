import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Eduardo Silveira',
      role: 'Diretor de Marketing & CRM',
      dealership: 'Grupo Saga Seminovos (14 Lojas)',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      text: 'O Auto Catálogo mudou o patamar da nossa operação. Antes, nossa equipe gastava mais de 20 horas por semana subindo carros manualmente. Hoje, o estoque sincroniza direto do AutoCerto e nosso CPL no Instagram despencou 42%.',
    },
    {
      name: 'Marcela Vasconcelos',
      role: 'Gerente Geral de Vendas',
      dealership: 'Automec Prime Veículos',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      text: 'O maior benefício foi eliminar a queima de verba em carros vendidos. Quando um cliente entra no nosso WhatsApp pelo anúncio dinâmico, o carro está 100% disponível no pátio. A taxa de conversão em visita subiu mais de 30%.',
    },
    {
      name: 'Rodrigo Fontes',
      role: 'Head de Mídia de Performance',
      dealership: 'Motors Brasil Agency',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      text: 'Atendemos mais de 25 revendas em SP e o Auto Catálogo é nosso parceiro padrão. A normalização de XML do Sisvag e Altimus para o Meta DAA funciona de forma impecável sem quebrar nenhum anúncio.',
    },
  ];

  return (
    <section className="py-20 bg-surface-canvas border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            Resultados Comprovados
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-typography-heading tracking-tight">
            Quem Usa, Recomenda
          </h2>
          <p className="text-base text-typography-muted leading-relaxed">
            Mais de 128 concessionárias e grupos automotivos aceleram suas vendas todos os dias com o Auto Catálogo.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-sm text-typography-body leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-typography-heading">{t.name}</h4>
                  <p className="text-[11px] text-typography-muted">{t.role}</p>
                  <p className="text-[11px] font-bold text-brand-primary">{t.dealership}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
