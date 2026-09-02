import { CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { env } from '../../config/env.js';
import { clearCheckoutContext } from '../../services/checkoutService.js';

export function CheckoutSuccessPage() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  clearCheckoutContext();

  const registerUrl = sessionId
    ? `${env.appUrl}/register?session_id=${encodeURIComponent(sessionId)}`
    : null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto ring-8 ring-green-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-typography-heading">
            Pagamento Confirmado!
          </h1>
          <p className="text-sm text-typography-muted leading-relaxed">
            Sua assinatura foi processada com sucesso. Crie sua conta para acessar o painel da concessionária.
          </p>
        </div>

        {registerUrl ? (
          <a
            href={registerUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition-all hover:scale-105"
          >
            <span>Criar Conta e Acessar Painel</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Não foi possível identificar a sessão de checkout. Entre em contato com o suporte ou tente novamente.
              </p>
            </div>
            <a
              href="/#planos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Ver planos novamente
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
