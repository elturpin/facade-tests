import { beforeEach, expect, it, vi } from 'vitest';

const spy = vi.fn();

beforeEach(() => {
    spy.mockReset();
});

function spreadCall(...args: unknown[]) {
    spy(...args);
}

function notSpreadArgs(arg: number | number[]) {
    if (Array.isArray(arg)) {
        spy(...arg);
    } else {
        spy(arg);
    }
}

it('should call with one argument', () => {
    spreadCall('plop');

    expect(spy).toHaveBeenCalledWith('plop');
});

it('should call with multiple arguments', () => {
    spreadCall('plop', 42);

    expect(spy).toHaveBeenCalledWith('plop', 42);
});

it('should call with each element of array', () => {
    notSpreadArgs([1337, 42]);

    expect(spy).toHaveBeenCalledWith(1337, 42);
});

it('should call with the given element', () => {
    notSpreadArgs(42);

    expect(spy).toHaveBeenCalledWith(42);
});
