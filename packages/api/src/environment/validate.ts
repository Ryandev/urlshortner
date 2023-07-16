import type { IEnvironment } from './interface';

function isEnvironment(object: unknown): object is IEnvironment {
    const isValidValue = (item: unknown) => item !== null && typeof item !== 'undefined';

    if (!isValidValue(object)) {
        return false;
    }

    if (typeof object !== 'object') {
        return false;
    }

    const value = object as Partial<IEnvironment>;

    return (
        isValidValue(value.deployment) &&
        isValidValue(value.mongoDB) &&
        isValidValue(value.mongoDB?.connectionString) &&
        (value.mongoDB?.connectionString.length ?? 0) > 1 &&
        isValidValue(value.networkPort) &&
        isValidValue(value.urlPrefix) &&
        isValidValue(value.sentry) &&
        isValidValue(value.sentry?.dsn) &&
        (value.sentry?.dsn.length ?? 0) > 1 &&
        isValidValue(value.sentry?.traceSampleRate)
    );
}

export default isEnvironment;
