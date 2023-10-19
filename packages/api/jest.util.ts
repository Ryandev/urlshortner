import type { INestApplication } from '@nestjs/common';
import * as sentry from '@sentry/node';
import merge from 'ts-deepmerge';
import configuration from './src/configuration';
import type { IConfiguration } from './src/configuration/interface';
import bootstrap from './src/start';

const DEFAULT_CONFIGURATION: IConfiguration = Object.freeze({
    deployment: 'development',
    networkPort: 3000,
    urlPrefix: '/api',
    mongoDB: {
        connectionString:
            'mongodb://localhost:27017/?ssl=false&retryWrites=true&w=majority',
        connectionTimeout: 2000,
        databaseName: 'testDB',
    },
    sentry: {
        dsn: 'dummy-value',
        traceSampleRate: 1,
    },
    graphql: {
        playground: false,
    },
    jwt: {
        secret: 'none',
        expiryDelay: 10000,
    },
    healthCheck: {
        urlCheck: 'http://www.google.com',
        memoryHeapMaximum: 150000,
        memoryRSSMaximum: 150000,
        diskSpaceUsed: 150000,
        diskSpacePercent: 0.1,
    },
    logging: {
        levels: ['debug', 'error', 'log', 'verbose', 'warn'],
    },
} as const);

export const sleep = async (time: number) => {
    await new Promise(resolve => {
        setTimeout(resolve, time);
    });
};

export const setupApp = async (config: Partial<IConfiguration> = {}) => {
    configuration.apply(config);

    jest.spyOn(sentry, 'init').mockImplementation(jest.fn());
    const app = await bootstrap();

    return app;
};

export const teardownApp = async (app: INestApplication) => {
    await app.close();
    jest.clearAllMocks();
    configuration.unload();
};

export const dummyConfig = (overrides: Partial<IConfiguration> = {}): IConfiguration => {
    const result = merge(DEFAULT_CONFIGURATION, overrides) as IConfiguration;

    return result;
};

export const ResponseHttpStatusCodePayloads = Object.freeze({
    401: {
        statusCode: 401,
        message: 'Unauthorized',
    },
});
