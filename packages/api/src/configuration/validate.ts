import { Logger } from '@nestjs/common';
import type { IConfiguration } from './interface';

const isValidValue = (item: unknown) => item !== null && typeof item !== 'undefined';
const isNonZeroLengthString = (item: unknown) =>
    typeof item === 'string' && item.length > 0;
const isNumberValue = (item: unknown) => typeof item === 'number';

const validators: Record<string, (env: Partial<IConfiguration>) => boolean> = {
    'env.deployment': value => isValidValue(value.deployment),
    'env.mongoDB': value => isValidValue(value.mongoDB),
    'env.mongoDB.connectionString': value =>
        isValidValue(value.mongoDB?.connectionString) &&
        isNonZeroLengthString(value.mongoDB?.connectionString),
    'value.networkPort': value =>
        isValidValue(value.networkPort) && isNumberValue(value.networkPort),
    'env.urlPrefix': value => isNonZeroLengthString(value.urlPrefix),
    'env.sentry': value => isValidValue(value.sentry),
    'env.sentry.dsn': value => isNonZeroLengthString(value.sentry?.dsn),
    'env.sentry.traceSampleRate': value =>
        isValidValue(value.sentry?.traceSampleRate) &&
        isNumberValue(value.sentry?.traceSampleRate),
};

function isEnvironment(object: unknown): object is IConfiguration {
    if (!isValidValue(object)) {
        return false;
    }

    if (typeof object !== 'object') {
        return false;
    }

    const value = object as Partial<IConfiguration>;

    for (const [name, validator] of Object.entries(validators)) {
        if (!validator(value)) {
            Logger.error(
                `Environment validation failed (${name}), ${JSON.stringify(value)}`,
            );
            return false;
        }
    }

    return true;
}

export default isEnvironment;
