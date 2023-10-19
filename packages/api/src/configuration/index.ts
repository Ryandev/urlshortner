import merge from 'ts-deepmerge';
import DEFAULTS from './defaults';
import type { IConfiguration } from './interface';
import loadFromProcess from './process';
import validate from './validate';

function _load(): Readonly<Required<IConfiguration>> {
    const processEnvironment = loadFromProcess();

    const result: Readonly<IConfiguration> = Object.freeze({
        deployment: processEnvironment.deployment ?? DEFAULTS.deployment,
        networkPort: processEnvironment.networkPort ?? DEFAULTS.networkPort,
        urlPrefix: processEnvironment.urlPrefix ?? DEFAULTS.urlPrefix,
        mongoDB: {
            connectionString:
                processEnvironment.mongoDB?.connectionString ??
                DEFAULTS.mongoDB.connectionString,
            connectionTimeout:
                processEnvironment.mongoDB?.connectionTimeout ??
                DEFAULTS.mongoDB.connectionTimeout,
            databaseName:
                processEnvironment.mongoDB?.databaseName ?? DEFAULTS.mongoDB.databaseName,
        },
        graphql: {
            playground:
                processEnvironment.graphql?.playground ?? DEFAULTS.graphql.playground,
        },
        jwt: {
            secret: processEnvironment.jwt?.secret ?? DEFAULTS.jwt.secret,
            expiryDelay: processEnvironment.jwt?.expiryDelay ?? DEFAULTS.jwt.expiryDelay,
        },
        sentry: {
            dsn: processEnvironment.sentry?.dsn ?? DEFAULTS.sentry.dsn,
            traceSampleRate:
                processEnvironment.sentry?.traceSampleRate ??
                DEFAULTS.sentry.traceSampleRate,
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

    if (!validate(result)) {
        throw new Error(`Invalid env: ${JSON.stringify(result)}`);
    }

    return result;
}

let configuration: IConfiguration | null = null;

export default {
    load: () => {
        if (configuration === null) {
            configuration = _load();
        }
        return configuration;
    },
    unload: () => {
        configuration = null;
    },
    apply: (partial: Partial<IConfiguration>) => {
        configuration = merge(
            configuration ?? _load(),
            partial as unknown as IConfiguration,
        ) as IConfiguration;
    },
};
