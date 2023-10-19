import { parseBoolean, parseNumber, parseString } from './parse';
import loadFromProcess from './process';

jest.mock('./parse', () => ({
    parseBoolean: jest.fn(),
    parseNumber: jest.fn(),
    parseString: jest.fn(),
}));

describe('loadFromProcess', () => {
    beforeEach(() => {
        (parseBoolean as jest.Mock).mockReset();
        (parseNumber as jest.Mock).mockReset();
        (parseString as jest.Mock).mockReset();
    });

    it('should load configuration from process.env with correct values', () => {
        process.env.NODE_ENV = 'production';
        process.env.PORT = '8080';
        process.env.URL_PREFIX = '/api';
        process.env.MONGO_DB_CONNECTION_STRING = 'mongodb://localhost:27017';
        process.env.MONGO_DB_CONNECTION_TIMEOUT = '30000';
        process.env.MONGO_DB_NAME = 'my_database';
        process.env.GRAPHQL_PLAYGROUND = 'true';
        process.env.JWT_SECRET = 'my_secret';
        process.env.JWT_EXPIRY_DELAY = '3600';
        process.env.HEALTH_URL_CHECK = '/health';
        process.env.HEALTH_MEMORY_HEAP_MAX = '500';
        process.env.HEALTH_MEMORY_RSS_MAX = '300';
        process.env.HEALTH_DISK_SPACE_USED = '1024';
        process.env.HEALTH_DISK_SPACED_FREE_PC = '30';
        process.env.BACKEND_SENTRY_DSN = 'sentry_dsn';
        process.env.SENTRY_TRACE_SAMPLE_RATE = '0.5';

        (parseString as jest.Mock).mockReturnValueOnce('production');
        (parseNumber as jest.Mock).mockReturnValueOnce(8080);
        (parseString as jest.Mock).mockReturnValueOnce('/api');
        (parseString as jest.Mock).mockReturnValueOnce('mongodb://localhost:27017');
        (parseNumber as jest.Mock).mockReturnValueOnce(30000);
        (parseString as jest.Mock).mockReturnValueOnce('my_database');
        (parseBoolean as jest.Mock).mockReturnValueOnce(true);
        (parseString as jest.Mock).mockReturnValueOnce('my_secret');
        (parseNumber as jest.Mock).mockReturnValueOnce(3600);
        (parseString as jest.Mock).mockReturnValueOnce('/health');
        (parseNumber as jest.Mock).mockReturnValueOnce(500);
        (parseNumber as jest.Mock).mockReturnValueOnce(300);
        (parseNumber as jest.Mock).mockReturnValueOnce(1024);
        (parseNumber as jest.Mock).mockReturnValueOnce(30);
        (parseString as jest.Mock).mockReturnValueOnce('sentry_dsn');
        (parseNumber as jest.Mock).mockReturnValueOnce(0.5);

        const expectedConfig = {
            deployment: 'production',
            networkPort: 8080,
            urlPrefix: '/api',
            mongoDB: {
                connectionString: 'mongodb://localhost:27017',
                connectionTimeout: 30000,
                databaseName: 'my_database',
            },
            graphql: {
                playground: true,
            },
            jwt: {
                secret: 'my_secret',
                expiryDelay: 3600,
            },
            healthCheck: {
                urlCheck: '/health',
                memoryHeapMaximum: 500,
                memoryRSSMaximum: 300,
                diskSpaceUsed: 1024,
                diskSpacePercent: 30,
            },
            sentry: {
                dsn: 'sentry_dsn',
                traceSampleRate: 0.5,
            },
        };

        const config = loadFromProcess();

        expect(config).toEqual(expectedConfig);
        expect(parseString).toHaveBeenCalledTimes(7);
        expect(parseNumber).toHaveBeenCalledTimes(8);
        expect(parseBoolean).toHaveBeenCalledTimes(1);
    });
});
