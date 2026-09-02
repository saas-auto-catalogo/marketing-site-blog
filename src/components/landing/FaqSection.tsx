import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { getAppRegisterUrl } from '../../config/env.js';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como funciona o teste grátis de 14 dias?',
      a: 'Você cria sua conta em menos de 3 minutos, conecta o link do feed XML do seu DMS e começa a sincronizar seus veículos com o Meta Ads imediatamente. Não exigimos cartão de crédito durante o período de testes.',
    },
    {
      q: 'O que acontece quando um carro é vendido na loja física?',
      a: 'Assim que o veículo é marcado como vendido ou excluído no seu gestor de estoque (AutoCerto, Altimus ou Sisvag), nossa plataforma identifica a baixa e remove o carro automaticamente do catálogo da Meta, impedindo que novos clientes cliquem nele.',
    },
    {
      q: 'Meu integrador DMS atual é suportado?',
      a: 'Sim! Temos integração nativa e homologada com AutoCerto XML, Altimus Hub, Sisvag DMS, BomControle ERP e Webmotors. Além disso, nosso motor aceita qualquer feed XML, RSS, Atom ou JSON customizado.',
    },
    {
      q: 'Preciso ter conhecimentos de programação para configurar?',
      a: 'Absolutamente nenhum. O Auto Catálogo é uma solução 100% no-code. Basta colar o link do seu feed XML gerado pelo seu DMS e nossa plataforma cuida de toda a normalização de tags, fotos e regras do Facebook/Instagram.',
    },
    {
      q: 'Existe contrato de fidelidade ou multa de cancelamento?',
      a: 'Não. Todos os nossos planos funcionam em modelo de assinatura recorrente sem fidelidade. Você pode pausar ou cancelar sua conta a qualquer momento diretamente pelo seu painel.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-extrabold border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-typography-heading tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-typography-muted leading-relaxed">
            Respostas diretas para as principais dúvidas técnicas e comerciais de concessionárias e revendas.
          </p>
        </div>

        {/* Acordeon */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-surface-border bg-surface-canvas overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-base text-typography-heading hover:text-brand-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-primary' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-typography-body leading-relaxed border-t border-slate-200/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA de Fechamento */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl space-y-4">
          <h3 className="text-2xl font-extrabold text-white">
            Pronto para Reduzir o CPL da sua Concessionária?
          </h3>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Junte-se a mais de uma centena de concessionárias que escalam suas vendas de seminovos no Meta Ads com estoque em tempo real.
          </p>
          <div className="pt-2">
            <a
              href={getAppRegisterUrl('trial')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-price hover:bg-red-700 text-white font-extrabold text-base shadow-lg shadow-black/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Criar Minha Conta Grátis Agora</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
