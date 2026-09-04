import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();

Sentry.init({
  dsn: dsn || undefined,
  enabled: Boolean(dsn),
  environment:
    import.meta.env.VITE_SENTRY_ENVIRONMENT?.trim() ||
    import.meta.env.MODE ||
    'development',
  release: import.meta.env.VITE_SENTRY_RELEASE?.trim() || undefined,
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
});

export { Sentry };
