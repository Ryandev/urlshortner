/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { init as sentryInit } from '@sentry/node';
import AppModule from './app/app.module';

const DEFAULT_PORT = 3333;
const SENTRY_DSN = String(process.env.SENTRY_DSN);

if (SENTRY_DSN.length > 0) {
    sentryInit({
        dsn: SENTRY_DSN,
        tracesSampleRate: 1.0,
    });
}

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT ?? DEFAULT_PORT;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error: Readonly<Error>) => {
    /* eslint-disable-next-line no-console */
    console.error(`Failed to start, error: ${JSON.stringify(error)}`);
});
