import { useEffect, useId, useState, type MouseEvent } from 'react';
import { cookieBanner } from '../../data/cookieMicrocopy.js';
import {
  createCookieConsent,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentPreferences,
} from '../../lib/cookieConsent.js';

interface CookieConsentBannerProps {
  forceOpen: boolean;
  onCloseManage: () => void;
  onOpenLegal: (slug: string) => void;
}

export function CookieConsentBanner({
  forceOpen,
  onCloseManage,
  onOpenLegal,
}: CookieConsentBannerProps) {
  const titleId = useId();
  const [prefs, setPrefs] = useState<CookieConsentPreferences | null>(() => readCookieConsent());
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!forceOpen) return;
    const current = readCookieConsent();
    setPrefs(current);
    setAnalytics(current?.analytics ?? false);
    setMarketing(current?.marketing ?? false);
    setCustomizing(true);
  }, [forceOpen]);

  const visible = forceOpen || prefs === null;
  if (!visible) {
    return null;
  }

  const persist = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const next = createCookieConsent(nextAnalytics, nextMarketing);
    writeCookieConsent(next);
    setPrefs(next);
    setCustomizing(false);
    onCloseManage();
  };

  const handlePolicyClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onOpenLegal(cookieBanner.policySlug);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-2">
            <h2 id={titleId} className="text-lg font-extrabold text-typography-heading tracking-tight">
              {cookieBanner.title}
            </h2>
            <p className="text-sm text-typography-muted leading-relaxed">
              {cookieBanner.bodyBeforeLink}
              <a
                href={cookieBanner.policyHref}
                onClick={handlePolicyClick}
                className="text-brand-primary font-semibold underline underline-offset-2 hover:text-brand-primary-dark"
              >
                {cookieBanner.bodyLinkLabel}
              </a>
              {cookieBanner.bodyAfterLink}
            </p>
          </div>

          {customizing && (
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 rounded border-slate-300 text-brand-primary"
                />
                <span className="space-y-1">
                  <span className="block text-sm font-bold text-typography-heading">
                    {cookieBanner.categoryEssential}
                  </span>
                  <span className="block text-xs text-typography-muted">
                    {cookieBanner.categoryEssentialHelp}
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-1 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="space-y-1">
                  <span className="block text-sm font-bold text-typography-heading">
                    {cookieBanner.categoryAnalytics}
                  </span>
                  <span className="block text-xs text-typography-muted">
                    {cookieBanner.categoryOptionalEmpty}
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-1 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="space-y-1">
                  <span className="block text-sm font-bold text-typography-heading">
                    {cookieBanner.categoryMarketing}
                  </span>
                  <span className="block text-xs text-typography-muted">
                    {cookieBanner.categoryOptionalEmpty}
                  </span>
                </span>
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-center sm:justify-end">
            {customizing ? (
              <button
                type="button"
                onClick={() => persist(analytics, marketing)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold transition-colors"
              >
                {cookieBanner.savePreferences}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const current = readCookieConsent();
                    setAnalytics(current?.analytics ?? false);
                    setMarketing(current?.marketing ?? false);
                    setCustomizing(true);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-typography-heading hover:bg-slate-50 transition-colors"
                >
                  {cookieBanner.customize}
                </button>
                <button
                  type="button"
                  onClick={() => persist(false, false)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-typography-heading hover:bg-slate-50 transition-colors"
                >
                  {cookieBanner.rejectNonEssential}
                </button>
                <button
                  type="button"
                  onClick={() => persist(true, true)}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold transition-colors"
                >
                  {cookieBanner.acceptAll}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
