import { setTimeout } from 'timers/promises';
import { expect, it } from 'vitest';

it('should not update the already returned value if modify after', async () => {
    const { promise, resolve } = Promise.withResolvers<void>();
    function returnsAndModifyVariable() {
        let variable = 1337;

        promise.then(() => {
            variable = 42;
        });

        return variable;
    }

    const value = returnsAndModifyVariable();

    resolve();

    await setTimeout(100);

    expect(value).toBe(1337);
});
