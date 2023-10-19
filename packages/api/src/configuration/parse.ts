export function parseNumber(item: unknown) {
    let value: number | null = null;

    if (typeof item === 'undefined') {
        value = null;
    } else if (item === 'null') {
        value = null;
    } else if (!Number.isNaN(Number.parseInt(String(item), 10))) {
        value = Number.parseInt(String(item), 10);
    }

    return value;
}

export function parseBoolean(item: unknown) {
    let value: boolean | null = false;

    if (typeof item === 'undefined') {
        value = null;
    } else if (typeof item === 'boolean') {
        value = item;
    } else if (typeof item === 'string') {
        /* Support string typed boolean values: on,off,etc.. */
        const stringValue = item.toLowerCase();
        if (['true', 'yes', 'on'].includes(stringValue)) {
            value = true;
        } else if (['false', 'no', 'off'].includes(stringValue)) {
            value = false;
        } else if (!Number.isNaN(Number.parseInt(item, 10))) {
            value = Boolean(Number.parseInt(item, 10));
        } else {
            value = Boolean(item);
        }
    } else {
        value = Boolean(item);
    }

    return value;
}

export function parseString(item: unknown) {
    let returnValue: string | null = null;

    if (typeof item === 'undefined') {
        returnValue = null;
    } else if (item === 'null') {
        returnValue = null;
    } else {
        returnValue = String(item);
    }

    return returnValue;
}
