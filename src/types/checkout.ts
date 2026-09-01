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
  qrCodeUrl: string;
  qrCodeText: string;
  expiresAt: string;
  amount: number;
}
