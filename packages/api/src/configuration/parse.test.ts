import { parseBoolean, parseNumber, parseString } from './parse';

describe('parseNumber', () => {
    it('should return null for undefined input', () => {
        expect(parseNumber(undefined)).toBeNull();
    });

    it('should return null for string "null"', () => {
        expect(parseNumber('null')).toBeNull();
    });

    it('should return null for NaN input', () => {
        expect(parseNumber(NaN)).toBeNull();
    });

    it('should return parsed number for valid number input', () => {
        expect(parseNumber('123')).toBe(123);
    });
});

describe('parseBoolean', () => {
    it('should return null for undefined input', () => {
        expect(parseBoolean(undefined)).toBeNull();
    });

    it('should return boolean value for boolean input', () => {
        expect(parseBoolean(true)).toBe(true);
        expect(parseBoolean(false)).toBe(false);
    });

    it('should return correct boolean value for string input', () => {
        expect(parseBoolean('true')).toBe(true);
        expect(parseBoolean('false')).toBe(false);
        expect(parseBoolean('yes')).toBe(true);
        expect(parseBoolean('no')).toBe(false);
        expect(parseBoolean('on')).toBe(true);
        expect(parseBoolean('off')).toBe(false);
        expect(parseBoolean('1')).toBe(true);
        expect(parseBoolean('0')).toBe(false);
        expect(parseBoolean('test')).toBe(true);
    });

    it('should return boolean value for number input', () => {
        expect(parseBoolean(1)).toBe(true);
        expect(parseBoolean(0)).toBe(false);
    });

    it('should return boolean value for other input types', () => {
        expect(parseBoolean([])).toBe(true);
        expect(parseBoolean({})).toBe(true);
        expect(parseBoolean(null)).toBe(false);
    });
});

describe('parseString', () => {
    it('should return null for undefined input', () => {
        expect(parseString(undefined)).toBeNull();
    });

    it('should return null for string "null"', () => {
        expect(parseString('null')).toBeNull();
    });

    it('should return string value for other input types', () => {
        expect(parseString(true)).toBe('true');
        expect(parseString(123)).toBe('123');
        expect(parseString(['a', 'b', 'c'])).toBe('a,b,c');
        expect(parseString({ key: 'value' })).toBe('[object Object]');
    });
});
