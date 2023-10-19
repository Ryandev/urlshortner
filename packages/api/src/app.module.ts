import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import type { DynamicModule, MiddlewareConsumer, Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configuration';
import middlewares from './middleware';
import { guards, modules } from './modules';

const settings = configuration.load();

const providers: Provider[] = [];

const imports: DynamicModule[] = [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: settings.mongoDB.connectionString,
        database: settings.mongoDB.databaseName,
        autoLoadEntities: true,
        // Entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        retryAttempts: settings.deployment !== 'production' ? 10 : 0,
        retryDelay: settings.mongoDB.connectionTimeout,
        /* Use migrations in production, sync changes live in dev */
        synchronize: settings.deployment !== 'production',
        appname: 'api-url_shortner',
        logging: true,
    }),
];

if (settings.deployment === 'production') {
    imports.push(
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    );
    imports.push(
        CacheModule.register({
            isGlobal: true,
        }),
    );
    providers.push({
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor,
    });
}

providers.push(...guards);

@Module({
    imports: [...imports, ...modules],
    providers,
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class AppModule {
    /* eslint-disable-next-line class-methods-use-this */
    configure(consumer: MiddlewareConsumer) {
        for (const middleware of middlewares) {
            consumer.apply(middleware).forRoutes('*');
        }
    }
}
