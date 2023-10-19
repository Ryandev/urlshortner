export const isObject = (object: unknown): object is Record<string, unknown> =>
    typeof object !== 'undefined' && object !== null && typeof object === 'object';

function _omitWithKey<T>(
    sourceObject: T,
    omitKey: number | string | symbol | null | undefined,
    recursive = true,
): T {
    let returnValue = sourceObject;

    if (typeof returnValue === 'undefined' || returnValue === null) {
        /* Return original value */
    } else if (typeof omitKey === 'undefined' || omitKey === null) {
        /* Return original value */
    } else if (Array.isArray(returnValue)) {
        returnValue = returnValue.map(item =>
            _omitWithKey<T>(item as T, omitKey, recursive),
        ) as unknown as T;
    } else if (typeof returnValue === 'object') {
        const newObject = {} as Record<string, unknown>;
        for (const currentKey of Object.keys(returnValue).filter(key => key !== omitKey)) {
            let currentValue = Object.getOwnPropertyDescriptor(returnValue, currentKey)
                ?.value as unknown;

            if (recursive) {
                currentValue = _omitWithKey(currentValue, omitKey, recursive);
            }

            newObject[currentKey] = currentValue;
        }

        returnValue = newObject as T;
    } else {
        /* Return original value */
    }

    return returnValue;
}

export function omit<T extends object, K extends keyof T>(
    sourceObject: T,
    keySearch: K,
    recursive = true,
): Omit<T, K> {
    return _omitWithKey(sourceObject, keySearch, recursive) as Omit<T, K>;
}
