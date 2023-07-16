/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { IEnvironment } from './interface';

const Kibibyte = 1024;
const Mebibyte = 1024 * Kibibyte;
const Gibibyte = 1024 * Mebibyte;

const DEFAULTS: Required<IEnvironment> = {
    deployment: 'development',
    networkPort: 3333,
    urlPrefix: 'api',
    mongoDB: {
        connectionString: '',
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
        memoryHeapMaximum: 150 * Mebibyte,
        memoryRSSMaximum: 150 * Mebibyte,
        diskSpaceUsed: 500 * Gibibyte,
        diskSpacePercent: 0.8,
    },
    logging: {
        levels: ['debug', 'error', 'log', 'verbose', 'warn'],
    },
} as const;

export default DEFAULTS;
