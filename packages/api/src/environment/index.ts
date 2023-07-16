import DEFAULTS from './defaults';
import type { IEnvironment } from './interface';
import processEnvironment from './process';
import validate from './validate';

const environment: Readonly<IEnvironment> = Object.freeze({
    deployment: processEnvironment.deployment ?? DEFAULTS.deployment,
    networkPort: processEnvironment.networkPort ?? DEFAULTS.networkPort,
    urlPrefix: processEnvironment.urlPrefix ?? DEFAULTS.urlPrefix,
    mongoDB: {
        connectionString:
            processEnvironment.mongoDB?.connectionString ??
            DEFAULTS.mongoDB.connectionString,
        databaseName:
            processEnvironment.mongoDB?.databaseName ?? DEFAULTS.mongoDB.databaseName,
    },
    graphql: {
        playground: processEnvironment.graphql?.playground ?? DEFAULTS.graphql.playground,
    },
    jwt: {
        secret: processEnvironment.jwt?.secret ?? DEFAULTS.jwt.secret,
        expiryDelay: processEnvironment.jwt?.expiryDelay ?? DEFAULTS.jwt.expiryDelay,
    },
    sentry: {
        dsn: processEnvironment.sentry?.dsn ?? DEFAULTS.sentry.dsn,
        traceSampleRate:
            processEnvironment.sentry?.traceSampleRate ?? DEFAULTS.sentry.traceSampleRate,
    },
    healthCheck: {
        urlCheck:
            processEnvironment.healthCheck?.urlCheck ?? DEFAULTS.healthCheck.urlCheck,
        memoryHeapMaximum:
            processEnvironment.healthCheck?.memoryHeapMaximum ??
            DEFAULTS.healthCheck.memoryHeapMaximum,
        memoryRSSMaximum:
            processEnvironment.healthCheck?.memoryRSSMaximum ??
            DEFAULTS.healthCheck.memoryRSSMaximum,
        diskSpaceUsed:
            processEnvironment.healthCheck?.diskSpaceUsed ??
            DEFAULTS.healthCheck.diskSpaceUsed,
        diskSpacePercent:
            processEnvironment.healthCheck?.diskSpacePercent ??
            DEFAULTS.healthCheck.diskSpacePercent,
    },
    logging: {
        levels: DEFAULTS.logging.levels,
    },
});

const result = environment;

if (!validate(result)) {
    throw new Error(`Invalid env: ${JSON.stringify(result)}`);
}

/* Type validation at #validate(), however TS does not reflect this in the export */
export default result as Required<IEnvironment>;
