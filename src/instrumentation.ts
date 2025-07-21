import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Only load Sentry in production to prevent HMR issues
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('../sentry.server.config');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      await import('../sentry.edge.config');
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
