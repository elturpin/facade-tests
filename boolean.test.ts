import { expect, it } from 'vitest';

it('should', () => {
    const A = false;
    const B = false;
    const C = true;

    const res = A || B || !C;

    expect(res).toBeFalsy();
});

it('should be inverted', () => {
    const A = false;
    const B = false;
    const C = true;

    const res = !A && !B && C;

    expect(res).toBeTruthy();
});
