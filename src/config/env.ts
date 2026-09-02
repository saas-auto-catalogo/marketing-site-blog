const apiUrl = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3333';
const appUrl = import.meta.env.VITE_APP_URL ?? 'http://127.0.0.1:5173';

export const env = {
  apiUrl: apiUrl.replace(/\/$/, ''),
  appUrl: appUrl.replace(/\/$/, ''),
} as const;

export function getCheckoutSuccessUrl(): string {
  return `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
}

export function getCheckoutCancelUrl(): string {
  return `${window.location.origin}/checkout/cancel`;
}

export const CHECKOUT_SESSION_STORAGE_KEY = 'autocatalogo_checkout_context';
