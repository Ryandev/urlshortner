export interface IConfiguration {
    deployment: 'development' | 'production';
    networkPort: number;
    urlPrefix: string;
    mongoDB: {
        connectionString: string;
        /* Timeout in milliseconds */
        connectionTimeout: number;
        databaseName: string;
    };
    sentry: {
        dsn: string;
        traceSampleRate: number;
    };
    graphql: {
        playground: boolean;
    };
    jwt: {
        secret: string;
        expiryDelay: number;
    };
    healthCheck: {
        urlCheck: string;
        memoryHeapMaximum: number;
        memoryRSSMaximum: number;
        /*
         * This is for the entire disk & not the local path,
         * underlying library does not support disk space used
         * for just local dir
         * https://github.com/Alex-D/check-disk-space
         */
        diskSpaceUsed: number;
        diskSpacePercent: number;
    };
    logging: {
        levels: Readonly<('debug' | 'error' | 'log' | 'verbose' | 'warn')[]>;
    };
}
