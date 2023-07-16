import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { init as sentryInit } from '@sentry/node';
import AppModule from './app.module';
import env from './environment';

export default async function bootstrap(): Promise<void> {
    Logger.overrideLogger([...env.logging.levels]);

    const sentryDSN = env.sentry.dsn;
    if (sentryDSN.length > 0) {
        sentryInit({
            dsn: sentryDSN,
            tracesSampleRate: env.sentry.traceSampleRate,
        });
    }

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(env.urlPrefix);
    /*
     * App.enableVersioning({
     *     defaultVersion: '1',
     *     type: VersioningType.URI,
     * });
     */

    await app.listen(env.networkPort);
}
