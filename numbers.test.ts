import { expect, it } from 'vitest';

it('should be an integer', () => {
    expect(Math.floor(1.1)).toEqual(1);
});
