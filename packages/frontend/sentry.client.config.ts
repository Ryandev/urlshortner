/* Ref https://docs.sentry.io/platforms/javascript/guides/nextjs/ */
import * as Sentry from '@sentry/nextjs';
import { dsn } from './sentry.util';

const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
    dsn,
    tracesSampleRate: 1,
    debug: false,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: isProduction ? 0.1 : 1.0,
    integrations: [
        new Sentry.Replay({
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
