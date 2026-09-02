export type AppRegisterPlan = 'STARTER' | 'PRO' | 'ENTERPRISE' | 'trial';

const appUrl = (import.meta.env.VITE_APP_URL ?? 'http://127.0.0.1:5173').replace(/\/$/, '');

export const env = {
  appUrl,
} as const;

export function getAppLoginUrl(): string {
  return `${env.appUrl}/login`;
}

export function getAppRegisterUrl(plan?: AppRegisterPlan): string {
  const url = new URL(`${env.appUrl}/register`);
  if (plan) {
    url.searchParams.set('plan', plan);
  }
  return url.toString();
}

export function getAppSubscribeSuccessUrl(sessionId: string): string {
  const url = new URL(`${env.appUrl}/subscribe/success`);
  url.searchParams.set('session_id', sessionId);
  return url.toString();
}

export function redirectLegacyCheckoutPath(pathname: string): boolean {
  const path = pathname.toLowerCase();

  if (path === '/checkout/success' || path === '/checkout/success/') {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    window.location.replace(
      sessionId ? getAppSubscribeSuccessUrl(sessionId) : getAppRegisterUrl()
    );
    return true;
  }

  if (path === '/checkout/cancel' || path === '/checkout/cancel/') {
    window.location.replace(getAppRegisterUrl());
    return true;
  }

  return false;
}
