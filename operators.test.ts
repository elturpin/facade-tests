import { describe, expect, it } from 'vitest';

describe('operator ! with ===', () => {
    it('should always be false with `!a === undefined`', () => {
        const operation = (a: unknown) => !a === undefined;

        expect(operation(undefined)).toBe(false);
        expect(operation(1)).toBe(false);
        expect(operation([])).toBe(false);
        expect(operation({})).toBe(false);
        expect(operation('')).toBe(false);
    });

    it('should be false only if a is undefined with `!(a === undefined)`', () => {
        const operation = (a: unknown) => !(a === undefined);

        expect(operation(1)).toBe(true);
        expect(operation([])).toBe(true);
        expect(operation({})).toBe(true);
        expect(operation('')).toBe(true);
        expect(operation(undefined)).toBe(false);
    });
});
