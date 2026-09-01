import {
  SelectedPlan,
  BillingInterval,
  CustomerFormData,
  CardFormData,
  PixPaymentData
} from '../types/checkout.js';

export const checkoutService = {
  /**
   * Gera cobrança Stripe Pix
   */
  async createStripePix(
    plan: SelectedPlan,
    billingInterval: BillingInterval,
    customer: CustomerFormData
  ): Promise<PixPaymentData> {
    const amount = billingInterval === 'YEARLY' ? plan.yearlyPrice : plan.monthlyPrice;
    const paymentIntentId = `pi_stripe_${Date.now()}`;
    const sanitizedPhone = customer.phone.replace(/\D/g, '');
    const emvCode = `00020126580014br.gov.bcb.pix0136${paymentIntentId}520400005303986540${amount.toFixed(2)}5802BR5925AUTO CATALOGO SAAS STRIPE6009SAO PAULO62140510${sanitizedPhone || 'STORE'}6304`;

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(emvCode)}`;

    return {
      paymentIntentId,
      qrCodeUrl,
      qrCodeText: emvCode,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      amount,
    };
  },

  /**
   * Processa pagamento de Cartão no Stripe
   */
  async processStripeCard(
    plan: SelectedPlan,
    billingInterval: BillingInterval,
    customer: CustomerFormData,
    card: CardFormData
  ): Promise<{ success: boolean; subscriptionId: string; amount: number; customerId: string }> {
    const amount = billingInterval === 'YEARLY' ? plan.yearlyPrice : plan.monthlyPrice;

    // Simula tokenização segura e criação de customer/subscription no Stripe
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
      success: true,
      subscriptionId: `sub_stripe_${Date.now()}`,
      customerId: `cus_${customer.document.replace(/\D/g, '') || Date.now()}_${card.cardHolder.substring(0, 3)}`,
      amount,
    };
  },
};
