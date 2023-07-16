import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import environment from './environment';
import { modules } from './modules';

const imports: DynamicModule[] = [];

imports.push(
    MongooseModule.forRoot(environment.mongoDB.connectionString, {
        dbName: environment.mongoDB.databaseName,
    }),
);

if (environment.deployment === 'production') {
    imports.push(
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    );
}

@Module({
    imports: [...imports, ...modules],
})

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export default class AppModule {}
