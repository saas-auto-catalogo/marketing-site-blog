import { getCheckoutCancelUrl, getCheckoutSuccessUrl, CHECKOUT_SESSION_STORAGE_KEY } from '../config/env.js';
import {
  SelectedPlan,
  BillingInterval,
  CustomerFormData,
  CardFormData,
  PixPaymentData,
  StripeCardResponse,
  CheckoutContext,
} from '../types/checkout.js';
import { checkoutApiService } from './checkoutApiService.js';

function buildApiPayload(
  plan: SelectedPlan,
  billingInterval: BillingInterval,
  customer: CustomerFormData
) {
  return {
    plan: plan.key,
    billingInterval,
    customer,
  };
}

export function saveCheckoutContext(context: CheckoutContext): void {
  sessionStorage.setItem(CHECKOUT_SESSION_STORAGE_KEY, JSON.stringify(context));
}

export function loadCheckoutContext(): CheckoutContext | null {
  const raw = sessionStorage.getItem(CHECKOUT_SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CheckoutContext;
  } catch {
    return null;
  }
}

export function clearCheckoutContext(): void {
  sessionStorage.removeItem(CHECKOUT_SESSION_STORAGE_KEY);
}

export const checkoutService = {
  async startHostedCheckout(
    plan: SelectedPlan,
    billingInterval: BillingInterval,
    customer: CustomerFormData
  ): Promise<string> {
    saveCheckoutContext({ plan, billingInterval, customer });

    const session = await checkoutApiService.createCheckoutSession({
      ...buildApiPayload(plan, billingInterval, customer),
      successUrl: getCheckoutSuccessUrl(),
      cancelUrl: getCheckoutCancelUrl(),
    });

    return session.url;
  },

  async createStripePix(
    plan: SelectedPlan,
    billingInterval: BillingInterval,
    customer: CustomerFormData
  ): Promise<PixPaymentData> {
    const response = await checkoutApiService.createPixPayment(
      buildApiPayload(plan, billingInterval, customer)
    );

    return {
      ...response,
      amount: response.amount / 100,
    };
  },

  async processStripeCard(
    plan: SelectedPlan,
    billingInterval: BillingInterval,
    customer: CustomerFormData,
    card: CardFormData
  ): Promise<StripeCardResponse & { success: boolean }> {
    const response = await checkoutApiService.createCardSubscription({
      ...buildApiPayload(plan, billingInterval, customer),
      installments: card.installments,
    });

    return {
      ...response,
      success: response.status === 'active' || response.status === 'trialing',
      amount: response.amount / 100,
    };
  },
};
