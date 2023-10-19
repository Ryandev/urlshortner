import type { INestApplication } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { init as sentryInit } from '@sentry/node';
import AppModule from './app.module';
import configuration from './configuration';

async function bootstrap(): Promise<INestApplication> {
    const settings = configuration.load();

    Logger.overrideLogger([...settings.logging.levels]);

    const sentryDSN = settings.sentry.dsn;
    if (sentryDSN.length > 0) {
        sentryInit({
            dsn: sentryDSN,
            tracesSampleRate: settings.sentry.traceSampleRate,
        });
    }

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
            enableDebugMessages: settings.deployment === 'development',
        }),
    );
    app.setGlobalPrefix(settings.urlPrefix);
    /*
     * App.enableVersioning({
     *     defaultVersion: '1',
     *     type: VersioningType.URI,
     * });
     */

    await app.listen(settings.networkPort).catch((error: unknown) => {
        Logger.error(`App error occurred: ${String(error)}`);
        if (settings.deployment === 'development') {
            throw error;
        }

        app.close().catch((closeError: unknown) => {
            Logger.error(`Failed to close app, ${String(closeError)}`);
        });
    });

    return app;
}

export default bootstrap;
