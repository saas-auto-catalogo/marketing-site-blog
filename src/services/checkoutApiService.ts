import { env } from '../config/env.js';
import {
  CreateCheckoutSessionPayload,
  CreatePixPayload,
  CreateCardPayload,
  StripeCheckoutSessionResponse,
  PixPaymentData,
  StripeCardResponse,
} from '../types/checkout.js';

interface ApiErrorBody {
  error?: string;
  message?: string;
  detail?: string;
  title?: string;
}

export class CheckoutApiError extends Error {
  readonly status: number;
  readonly retryable: boolean;
  readonly isStripeConfigError: boolean;

  constructor(status: number, message: string, options?: { retryable?: boolean; isStripeConfigError?: boolean }) {
    super(message);
    this.name = 'CheckoutApiError';
    this.status = status;
    this.retryable = options?.retryable ?? status >= 500;
    this.isStripeConfigError = options?.isStripeConfigError ?? status === 503;
  }
}

async function request<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new CheckoutApiError(0, 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.', {
      retryable: true,
    });
  }

  if (response.ok) {
    return response.json() as Promise<T>;
  }

  let errorBody: ApiErrorBody = {};
  try {
    errorBody = (await response.json()) as ApiErrorBody;
  } catch {
    // response body may not be JSON
  }

  const message =
    errorBody.detail ??
    errorBody.message ??
    errorBody.title ??
    `Erro ao processar checkout (${response.status})`;

  if (response.status === 503) {
    throw new CheckoutApiError(response.status, message, {
      retryable: false,
      isStripeConfigError: true,
    });
  }

  if (response.status === 422) {
    throw new CheckoutApiError(response.status, message, { retryable: false });
  }

  throw new CheckoutApiError(response.status, message, { retryable: response.status >= 500 });
}

export const checkoutApiService = {
  createCheckoutSession(payload: CreateCheckoutSessionPayload): Promise<StripeCheckoutSessionResponse> {
    return request<StripeCheckoutSessionResponse>('/api/v1/checkout/stripe/session', payload);
  },

  createPixPayment(payload: CreatePixPayload): Promise<PixPaymentData> {
    return request<PixPaymentData>('/api/v1/checkout/stripe/pix', payload);
  },

  createCardSubscription(payload: CreateCardPayload): Promise<StripeCardResponse> {
    return request<StripeCardResponse>('/api/v1/checkout/stripe/card', payload);
  },
};
