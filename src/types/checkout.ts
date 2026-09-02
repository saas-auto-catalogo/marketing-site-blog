export type BillingInterval = 'MONTHLY' | 'YEARLY';
export type PlanKey = 'STARTER' | 'PRO' | 'ENTERPRISE';

export interface SelectedPlan {
  key: PlanKey;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  carsLimit: string;
}

export interface CustomerFormData {
  dealershipName: string;
  document: string; // CNPJ ou CPF
  email: string;
  phone: string;
}

export interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  installments: number;
}

export interface PixPaymentData {
  paymentIntentId: string;
  clientSecret?: string;
  qrCodeUrl: string;
  qrCodeText: string;
  expiresAt: string;
  amount: number;
  status?: 'requires_action' | 'processing' | 'succeeded';
}

export interface StripeCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface StripeCardResponse {
  subscriptionId: string;
  customerId: string;
  status: 'active' | 'trialing' | 'incomplete';
  currentPeriodEnd: string;
  amount: number;
}

export interface CreateCheckoutSessionPayload {
  plan: PlanKey;
  billingInterval: BillingInterval;
  customer: CustomerFormData;
  successUrl: string;
  cancelUrl: string;
}

export interface CreatePixPayload {
  plan: PlanKey;
  billingInterval: BillingInterval;
  customer: CustomerFormData;
}

export interface CreateCardPayload extends CreatePixPayload {
  installments?: number;
}

export interface CheckoutContext {
  plan: SelectedPlan;
  billingInterval: BillingInterval;
  customer: CustomerFormData;
}
