import isEnvironment from './validate';

describe('isEnvironment', () => {
    it('should return false for values that are not objects', () => {
        const value = undefined;
        expect(isEnvironment(value)).toBe(false);
    });

    it('should return false for objects that do not have the required properties', () => {
        const value: unknown = {
            deployment: 'production',
            networkPort: 3000,
        };
        expect(isEnvironment(value)).toBe(false);
    });

    it('should return false if mongoDB.connectionString is not defined or has length less than 2', () => {
        const value: unknown = {
            deployment: 'production',
            mongoDB: {},
            networkPort: 3000,
            urlPrefix: '/api',
            sentry: {
                dsn: 'your-dsn',
                traceSampleRate: 0.5,
            },
        };
        expect(isEnvironment(value)).toBe(false);
    });

    it('should return false if sentry.dsn is not defined or has length less than 2', () => {
        const value: unknown = {
            deployment: 'production',
            mongoDB: {
                connectionString: 'mongodb://localhost:27017/MyDB',
            },
            networkPort: 3000,
            urlPrefix: '/api',
            sentry: {
                traceSampleRate: 0.5,
            },
        };
        expect(isEnvironment(value)).toBe(false);
    });

    it('should return true for a valid environment object', () => {
        const value: unknown = {
            deployment: 'production',
            mongoDB: {
                connectionString: 'mongodb://localhost:27017/MyDB',
            },
            networkPort: 3000,
            urlPrefix: '/api',
            sentry: {
                dsn: 'your-dsn',
                traceSampleRate: 0.5,
            },
        };
        expect(isEnvironment(value)).toBe(true);
    });
});
