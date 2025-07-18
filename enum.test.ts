import { describe, expect, it } from 'vitest';

describe('Enums', () => {
    it('should returns the enum key as a string', () => {
        enum Color {
            Red,
            Green,
        }

        expect(Color[1]).toBe('Green');
        expect(Color[Color.Red]).toBe('Red');
    });
});
