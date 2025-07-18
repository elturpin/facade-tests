import { expect, it } from 'vitest';

it('should join all element of a2 with each element of a1', () => {
    const a1 = [1, 2];
    const a2 = [10, 20, 30];

    const r = a1.flatMap((x) => a2.map((y) => [x, y]));

    expect(r).toEqual([
        [1, 10],
        [1, 20],
        [1, 30],
        [2, 10],
        [2, 20],
        [2, 30],
    ]);
});

it('should merge nth element of each array', () => {
    const a1 = [1, 2, 3];
    const a2 = [10, 20, 30];

    const r = a1.map((x, index) => [x, a2[index]]);

    expect(r).toEqual([
        [1, 10],
        [2, 20],
        [3, 30],
    ]);
});
