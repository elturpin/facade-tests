import { setTimeout } from 'timers/promises';
import { describe, expect, it, vi } from 'vitest';
import { reactive, ref, watch } from 'vue';

describe('ref from array', () => {
    it('should work', () => {
        const arrayRef = ref([1]);

        expect(arrayRef.value[0]).toBe(1);
    });

    describe('in a watch', () => {
        it('should call the watcher when changing one value if deep option is set', async () => {
            const arrayRef = ref([1, 2]);
            const spy = vi.fn();
            watch(arrayRef, spy, { deep: 1 });

            arrayRef.value[0] = 42;
            await setTimeout(100);

            expect(spy).toHaveBeenCalled();
        });
    });
});

describe('reactive from array', () => {
    it('should call the watcher when changing one value', async () => {
        const arrayRef = reactive([1, 2]);
        const spy = vi.fn();
        watch(arrayRef, spy);

        arrayRef[0] = 42;
        await setTimeout(100);

        expect(spy).toHaveBeenCalled();
    });
});
