import type { DeepNullable } from 'ts-essentials';
import type { IConfiguration } from './interface';
import { parseBoolean, parseNumber, parseString } from './parse';

function loadFromProcess(): Partial<DeepNullable<IConfiguration>> {
    return {
        deployment:
            parseString(process.env.NODE_ENV) === 'production'
                ? 'production'
                : 'development',
        networkPort: parseNumber(process.env.PORT),
        urlPrefix: parseString(process.env.URL_PREFIX),
        mongoDB: {
            connectionString: parseString(process.env.MONGO_DB_CONNECTION_STRING),
            connectionTimeout: parseNumber(process.env.MONGO_DB_CONNECTION_TIMEOUT),
            databaseName: parseString(process.env.MONGO_DB_NAME),
        },
        graphql: {
            playground: parseBoolean(process.env.GRAPHQL_PLAYGROUND),
        },
        jwt: {
            secret: parseString(process.env.JWT_SECRET),
            expiryDelay: parseNumber(process.env.JWT_EXPIRY_DELAY),
        },
        healthCheck: {
            urlCheck: parseString(process.env.HEALTH_URL_CHECK),
            memoryHeapMaximum: parseNumber(process.env.HEALTH_MEMORY_HEAP_MAX),
            memoryRSSMaximum: parseNumber(process.env.HEALTH_MEMORY_RSS_MAX),
            diskSpaceUsed: parseNumber(process.env.HEALTH_DISK_SPACE_USED),
            diskSpacePercent: parseNumber(process.env.HEALTH_DISK_SPACED_FREE_PC),
        },
        sentry: {
            dsn: parseString(process.env.BACKEND_SENTRY_DSN ?? process.env.SENTRY_DSN),
            traceSampleRate: parseNumber(process.env.SENTRY_TRACE_SAMPLE_RATE),
        },
    } as const;
}

export default loadFromProcess;
