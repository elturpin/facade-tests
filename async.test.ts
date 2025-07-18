import { vi, it, expect, beforeEach, expectTypeOf, describe } from 'vitest';

const spy = vi.fn();

beforeEach(() => {
    spy.mockReset();
});

describe('with a callback executer', () => {
    function executer(functionToCall: CallableFunction) {
        return functionToCall();
    }

    it('should not await for the sub execution', async () => {
        spy('start');

        executer(async () => {
            spy('sub start');
            await Promise.resolve();
            spy('sub stop');
        });

        spy('stop');

        await Promise.resolve();

        expect(spy).toHaveBeenNthCalledWith(1, 'start');
        expect(spy).toHaveBeenNthCalledWith(2, 'sub start');
        expect(spy).toHaveBeenNthCalledWith(3, 'stop');
        expect(spy).toHaveBeenNthCalledWith(4, 'sub stop');
    });

    it('should await for the sub execution', async () => {
        spy('start');

        await executer(async () => {
            spy('sub start');
            await Promise.resolve();
            spy('sub stop');
        });

        spy('stop');

        await Promise.resolve();

        expect(spy).toHaveBeenNthCalledWith(1, 'start');
        expect(spy).toHaveBeenNthCalledWith(2, 'sub start');
        expect(spy).toHaveBeenNthCalledWith(3, 'sub stop');
        expect(spy).toHaveBeenNthCalledWith(4, 'stop');
    });
});

describe('with a promise returner', () => {
    async function promiseReturner() {
        await Promise.resolve();
        return Promise.resolve('plop');
    }

    it('should unwrap the async promise return with a single promise', async () => {
        const plop = await promiseReturner();

        expectTypeOf(plop).toBeString();
        expect(plop).toBe('plop');
    });
});

describe('with a class with async method', () => {
    class TestAsyncMethod {
        public first = '';
        public second = 2;

        async process() {
            const firstPromise = Promise.resolve('first');
            const secondPromise = Promise.resolve(2);

            [this.first, this.second] = await Promise.all([
                firstPromise,
                secondPromise,
            ]);
        }
    }

    it('should assign member in async method and return a promise', async () => {
        const a = new TestAsyncMethod();

        await a.process();

        expect(a.first).toBe('first');
        expect(a.second).toBe(2);
    });
});

describe('with an unnecessary await', () => {
    function notAsync() {
        spy('notAsync');
    }

    async function withAUnnecessaryAwait() {
        spy('start');
        await notAsync();
        spy('stop');
    }

    /* Is equivalent to
    function withAPromise() {
        return new Promise<void>((resolve) => {
            spy("start");
            notAsync();
            resolve();
        }).then(() => spy("stop"));
    }
    */

    it('should still deferred execution of code after await, even if await is not necessary', async () => {
        const promise = withAUnnecessaryAwait();
        spy('outside');
        await promise;

        expect(spy).toHaveBeenNthCalledWith(1, 'start');
        expect(spy).toHaveBeenNthCalledWith(2, 'notAsync');
        expect(spy).toHaveBeenNthCalledWith(3, 'outside');
        expect(spy).toHaveBeenNthCalledWith(4, 'stop');
    });
});
