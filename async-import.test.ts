import { expect, it } from 'vitest';
import { A, B } from './async-module';

it('should import A', () => {
    expect(A).toBe(42);
});

it('should also import B', () => {
    expect(B).toBe(1337);
});
