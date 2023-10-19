import { isObject, omit } from './object';

describe('isObject', () => {
    it('should return true when the input is an object', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ name: 'John', age: 30 })).toBe(true);
        expect(isObject([])).toBe(true); // Array is also an object in JavaScript
        expect(isObject(new Date())).toBe(true); // Date is an object as well
    });

    it('should return false when the input is not an object', () => {
        expect(isObject(undefined)).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject(5)).toBe(false);
        expect(isObject('hello')).toBe(false);
        expect(isObject(true)).toBe(false);
    });
});

describe('omit', () => {
    it('should omit a key from an object', () => {
        const sourceObject = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        };
        const omitKey = 'key2';

        const expectedResult = {
            key1: 'value1',
            key3: 'value3',
        };

        const result = omit(sourceObject, omitKey);

        expect(result).toEqual(expectedResult);
    });

    it('should return the same object if omitKey does not exist', () => {
        const sourceObject = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        };
        const omitKey = 'key4';

        const expectedResult = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        };

        const result = omit(sourceObject, omitKey as keyof typeof sourceObject);

        expect(result).toEqual(expectedResult);
    });
});
