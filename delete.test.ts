import { expect, it } from 'vitest';

it('should keep the ref alive if given to another variable when deleting an array element', () => {
    const a = [{ x: 1 }, { x: 2 }, { x: 3 }];

    const elem = a[0];

    delete a[0];

    expect(elem).toEqual({ x: 1 });
    expect(a[0]).toBeUndefined();
});
