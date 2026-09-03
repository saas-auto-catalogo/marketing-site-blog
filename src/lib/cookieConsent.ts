export const COOKIE_CONSENT_STORAGE_KEY = 'autocatalogo.cookie-consent';

export interface CookieConsentPreferences {
  version: 1;
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export function createCookieConsent(
  analytics: boolean,
  marketing: boolean
): CookieConsentPreferences {
  return {
    version: 1,
    essential: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
}

export function readCookieConsent(): CookieConsentPreferences | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookieConsentPreferences>;
    if (parsed.version !== 1 || typeof parsed.analytics !== 'boolean' || typeof parsed.marketing !== 'boolean') {
      return null;
    }

    return {
      version: 1,
      essential: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function writeCookieConsent(prefs: CookieConsentPreferences): void {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(prefs));
  applyCookieConsent(prefs);
}

/** Analytics vendors must only be injected here when prefs.analytics is true. No vendor is active yet. */
export function applyCookieConsent(prefs: CookieConsentPreferences): void {
  if (!prefs.analytics) {
    return;
  }
}
