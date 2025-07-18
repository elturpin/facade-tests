import { setTimeout } from 'timers/promises';
import { expect, it, vi } from 'vitest';

it('should not chain promise when they are called in parallel', async () => {
    const spy = vi.fn();
    const promise = Promise.resolve();

    promise.then(() => setTimeout(100)).then(() => spy('first'));
    promise.then(() => spy('second'));

    await setTimeout(300);

    expect(spy).toHaveBeenNthCalledWith(1, 'second');
    expect(spy).toHaveBeenNthCalledWith(2, 'first');
});

it('should unwrap the then', async () => {
    const spy = vi.fn();
    const a = Promise.resolve();
    const b = a.then(() => Promise.resolve(4));

    await b.then((v) => spy(v));

    expect(spy).toHaveBeenCalledWith(4);
});

it('should not reject if all promise are caught returning undefined', async () => {
    const promises = [
        Promise.reject().catch(() => {}),
        Promise.reject().catch(() => {}),
        Promise.reject().catch(() => {}),
    ];

    const all = Promise.all(promises);
    await expect(all).resolves.toEqual([undefined, undefined, undefined]);
});
