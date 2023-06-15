/* Ref https://docs.sentry.io/platforms/javascript/guides/nextjs/ */
import * as Sentry from '@sentry/nextjs';
import { dsn } from './sentry.util';

Sentry.init({
    dsn,
    tracesSampleRate: 1,
    debug: false,
});
