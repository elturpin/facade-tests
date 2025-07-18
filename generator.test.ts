import { expect, it } from 'vitest';

it('should be able to use destructuring with a generator', () => {
    function* aGenerator() {
        yield 1;
        yield 3;
        yield 'a';
        return;
    }

    const a = aGenerator();

    const b = [...a];

    expect(b).toEqual([1, 3, 'a']);
});
