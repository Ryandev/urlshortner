/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { IConfiguration } from './interface';

const Kibibyte = 1024;
const Mebibyte = 1024 * Kibibyte;
const Gibibyte = 1024 * Mebibyte;

const DEFAULTS: Required<IConfiguration> = {
    deployment: 'development',
    networkPort: 3001,
    urlPrefix: 'api',
    mongoDB: {
        connectionString: '',
        connectionTimeout: 5000,
        databaseName: '',
    },
    sentry: {
        dsn: '',
        traceSampleRate: 1.0,
    },
    graphql: {
        playground: false,
    },
    jwt: {
        secret: 'TODO change me',
        expiryDelay: 3600,
    },
    healthCheck: {
        urlCheck: 'http://www.google.com',
        memoryHeapMaximum: 1500 * Mebibyte,
        memoryRSSMaximum: 1500 * Mebibyte,
        diskSpaceUsed: 500 * Gibibyte,
        diskSpacePercent: 0.8,
    },
    logging: {
        levels: ['debug', 'error', 'log', 'verbose', 'warn'],
    },
} as const;

export default DEFAULTS;
