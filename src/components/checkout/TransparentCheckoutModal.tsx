import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Copy,
  Check,
  CreditCard,
  ArrowRight,
  Loader2,
  Building2,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import {
  SelectedPlan,
  BillingInterval,
  CustomerFormData,
  CardFormData,
  PixPaymentData
} from '../../types/checkout.js';
import { checkoutService } from '../../services/checkoutService.js';
import { StripeLogoSvg, PixLogoSvg, VisaLogoSvg, MastercardLogoSvg } from '../icons/PaymentIcons.js';

interface TransparentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SelectedPlan;
  billingInterval: BillingInterval;
}

export function TransparentCheckoutModal({
  isOpen,
  onClose,
  plan,
  billingInterval,
}: TransparentCheckoutModalProps) {
  const [step, setStep] = useState<'CUSTOMER' | 'PAYMENT' | 'SUCCESS'>('CUSTOMER');
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CARD'>('PIX');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [pixData, setPixData] = useState<PixPaymentData | null>(null);

  // Formulário do Cliente
  const [customer, setCustomer] = useState<CustomerFormData>({
    dealershipName: '',
    document: '',
    email: '',
    phone: '',
  });

  // Formulário do Cartão
  const [card, setCard] = useState<CardFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '12',
    expiryYear: '28',
    cvv: '',
    installments: 1,
  });

  if (!isOpen) return null;

  const totalAmount = billingInterval === 'YEARLY' ? plan.yearlyPrice : plan.monthlyPrice;

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (paymentMethod === 'PIX') {
        const pix = await checkoutService.createStripePix(plan, billingInterval, customer);
        setPixData(pix);
      }
      setStep('PAYMENT');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await checkoutService.processStripeCard(plan, billingInterval, customer, card);
      setStep('SUCCESS');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (!pixData?.qrCodeText) return;
    navigator.clipboard.writeText(pixData.qrCodeText);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleSimulatePixPaid = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('SUCCESS');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header do Modal */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Checkout Transparente Seguro</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Assinar {plan.name}
              </h3>
              <p className="text-xs text-slate-300">
                {billingInterval === 'YEARLY' ? 'Faturamento Anual (2 Meses Grátis)' : 'Faturamento Mensal sem fidelidade'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total a Pagar</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                R$ {totalAmount.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-800 pt-4 text-xs font-bold">
            <span className={`flex items-center gap-1.5 ${step === 'CUSTOMER' ? 'text-blue-400' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-[10px]">1</span>
              Dados da Revenda
            </span>
            <span className="text-slate-600">→</span>
            <span className={`flex items-center gap-1.5 ${step === 'PAYMENT' ? 'text-blue-400' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-[10px]">2</span>
              Pagamento Stripe
            </span>
            <span className="text-slate-600">→</span>
            <span className={`flex items-center gap-1.5 ${step === 'SUCCESS' ? 'text-green-400' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-400 flex items-center justify-center text-[10px]">3</span>
              Ativação
            </span>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 sm:p-8">
          {/* ETAPA 1: DADOS CADASTRAIS */}
          {step === 'CUSTOMER' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Razão Social ou Nome Fantasia da Concessionária
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Saga Prime Seminovos"
                  value={customer.dealershipName}
                  onChange={(e) => setCustomer({ ...customer, dealershipName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    CNPJ ou CPF
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="00.000.000/0001-00"
                    value={customer.document}
                    onChange={(e) => setCustomer({ ...customer, document: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    WhatsApp do Responsável
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  Email do Administrador da Conta
                </label>
                <input
                  type="email"
                  required
                  placeholder="gerencia@concessionaria.com.br"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>

              {/* Seleção do Método */}
              <div className="pt-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Escolha o Método de Pagamento (Stripe):
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PIX')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      paymentMethod === 'PIX'
                        ? 'border-brand-primary bg-blue-50/50 text-brand-primary shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <PixLogoSvg className="h-6" />
                      <div className="text-left">
                        <p className="text-xs font-extrabold text-slate-900">Pix Instantâneo</p>
                        <p className="text-[10px] text-slate-500">Aprovação em 3 segundos</p>
                      </div>
                    </div>
                    {paymentMethod === 'PIX' && <CheckCircle2 className="w-4 h-4 text-brand-primary" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-brand-primary bg-blue-50/50 text-brand-primary shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                      <div className="text-left">
                        <p className="text-xs font-extrabold text-slate-900">Cartão de Crédito</p>
                        <p className="text-[10px] text-slate-500">Até 12x no Anual</p>
                      </div>
                    </div>
                    {paymentMethod === 'CARD' && <CheckCircle2 className="w-4 h-4 text-brand-primary" />}
                  </button>
                </div>
              </div>

              {/* Botão de Avançar */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-price hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Continuar para Pagamento</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ETAPA 2: PAGAMENTO (PIX OU CARTÃO) */}
          {step === 'PAYMENT' && (
            <div className="space-y-6">
              {paymentMethod === 'PIX' && pixData && (
                <div className="space-y-6 text-center">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
                    <img
                      src={pixData.qrCodeUrl}
                      alt="QR Code Pix Stripe"
                      className="w-48 h-48 mx-auto rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <p className="text-xs font-bold text-slate-700">
                      Escaneie o QR Code no app do seu banco ou copie o código Pix:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixData.qrCodeText}
                        className="flex-1 px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-mono text-slate-700 truncate"
                      />
                      <button
                        onClick={handleCopyPix}
                        className="px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col items-center gap-3">
                    <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                      <span>Aguardando identificação do pagamento via Stripe Webhook...</span>
                    </div>

                    <button
                      onClick={handleSimulatePixPaid}
                      disabled={isLoading}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                    >
                      [Simular Pagamento Pix Confirmado no Stripe]
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'CARD' && (
                <form onSubmit={handleCardPayment} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Número do Cartão</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4532 0000 0000 0000"
                        value={card.cardNumber}
                        onChange={(e) => setCard({ ...card, cardNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <VisaLogoSvg className="h-3.5" />
                        <MastercardLogoSvg className="h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nome Impresso no Cartão</label>
                    <input
                      type="text"
                      required
                      placeholder="NOME COMO NO CARTAO"
                      value={card.cardHolder}
                      onChange={(e) => setCard({ ...card, cardHolder: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Validade (MM/AA)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={2}
                          placeholder="MM"
                          value={card.expiryMonth}
                          onChange={(e) => setCard({ ...card, expiryMonth: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-center font-mono"
                        />
                        <input
                          type="text"
                          maxLength={2}
                          placeholder="AA"
                          value={card.expiryYear}
                          onChange={(e) => setCard({ ...card, expiryYear: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-center font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Código CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="123"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-center font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 py-3.5 px-4 rounded-xl bg-brand-price hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pagar R$ {totalAmount.toLocaleString('pt-BR')} com Stripe</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => setStep('CUSTOMER')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 mx-auto"
              >
                ← Voltar e alterar dados cadastrais
              </button>
            </div>
          )}

          {/* ETAPA 3: SUCESSO & ATIVAÇÃO */}
          {step === 'SUCCESS' && (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto ring-8 ring-green-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-slate-900">
                  Assinatura Confirmada com Sucesso! 🎉
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  A conta da concessionária <strong>{customer.dealershipName || 'Sua Loja'}</strong> no plano <strong>{plan.name}</strong> foi provisionada.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1 font-mono text-left max-w-md mx-auto">
                <p><strong>Plano:</strong> {plan.name} ({plan.carsLimit})</p>
                <p><strong>Faturamento:</strong> {billingInterval === 'YEARLY' ? 'Anual' : 'Mensal'}</p>
                <p><strong>Status:</strong> <span className="text-green-600 font-bold">ATIVO / 100% Homologado</span></p>
              </div>

              <div className="pt-2">
                <a
                  href="http://127.0.0.1:5173"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition-all hover:scale-105"
                >
                  <span>Acessar Painel da Concessionária</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Seguro com Selo Stripe */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Processamento Seguro 256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <StripeLogoSvg className="h-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
