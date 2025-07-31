import { setTimeout } from 'timers/promises';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, reactive, ref, watch } from 'vue';

describe('computed', () => {
    it('should call the getter in a lazy mean', async () => {
        let obj = {} as { props?: number };

        const c = computed(() => {
            return obj.props;
        });

        obj.props = 1;

        expect(c.value).toBe(1);
    });

    it('should not recall the getter if their is no ref inside', async () => {
        let obj = {} as { props?: number };

        const c = computed(() => {
            return obj.props;
        });
        c.value;

        obj.props = 1;

        expect(c.value).toBeUndefined();
    });
});

describe('ref from ref', () => {
    let store = ref({
        x: 1,
        y: 10,
    });
    let inComp = ref(store.value);

    beforeEach(() => {
        store = ref({
            x: 1,
            y: 10,
        });
        inComp = ref(store.value);
    });

    it('should work when modifying individual props', () => {
        store.value.x = 3;
        store.value.y = 30;

        expect(inComp.value.x).toBe(3);
        expect(inComp.value.y).toBe(30);
    });

    it.fails('should work when changing the complete value', () => {
        store.value = {
            x: 4,
            y: 40,
        };

        expect(inComp.value.x).toBe(4);
        expect(inComp.value.y).toBe(40);
    });

    it.fails('should call the watcher when modifying a props', async () => {
        const aRef = ref({ x: 1 });
        const spy = vi.fn();
        watch(aRef, spy);

        aRef.value.x = 4;
        await setTimeout(500);

        expect(spy).toHaveBeenCalled();
    });

    it('should call the watcher when modifying a props if using a getter', async () => {
        const aRef = ref({ x: 1 });
        const spy = vi.fn();
        watch(() => aRef.value.x, spy);

        aRef.value.x = 4;
        await setTimeout(500);

        expect(spy).toHaveBeenCalled();
    });
});

describe('ref from a reactive', () => {
    it('should loose reactivity as soon as raf value is swap', () => {
        const b = reactive({ a: 1 });

        const a = ref(b);

        expect(a.value.a).toBe(1);

        a.value = { a: 2 };

        expect(b.a).toBe(1);

        b.a = 3;

        expect(a.value.a).toBe(2);
    });

    it('should not loose reactivity if we swap an inner object', () => {
        const b = reactive({ o: { x: 0, y: 0 } });

        const a = ref(b);

        expect(a.value.o).toEqual({ x: 0, y: 0 });

        a.value.o = { x: 2, y: 3 };

        expect(b.o).toEqual({ x: 2, y: 3 });

        b.o.x = 3;

        expect(a.value.o).toEqual({ x: 3, y: 3 });
    });
});
