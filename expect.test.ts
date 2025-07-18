import { expect, it } from 'vitest';

it('should ', () => {
    expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([1, 2]));
});
