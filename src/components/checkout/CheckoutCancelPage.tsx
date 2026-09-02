import { XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { loadCheckoutContext } from '../../services/checkoutService.js';

interface CheckoutCancelPageProps {
  onRetryCheckout: () => void;
}

export function CheckoutCancelPage({ onRetryCheckout }: CheckoutCancelPageProps) {
  const context = loadCheckoutContext();

  const handleRetry = () => {
    onRetryCheckout();
    window.history.pushState({ view: 'LANDING' }, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const planosSection = document.getElementById('planos');
    if (planosSection) {
      planosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto ring-8 ring-slate-50">
          <XCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-typography-heading">
            Pagamento Cancelado
          </h1>
          <p className="text-sm text-typography-muted leading-relaxed">
            {context
              ? `O checkout do plano ${context.plan.name} foi cancelado. Nenhuma cobrança foi realizada.`
              : 'O checkout foi cancelado. Nenhuma cobrança foi realizada.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
          <a
            href="/#planos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            <span>Ver Planos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
