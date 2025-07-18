import { describe, expect, it, vi } from 'vitest';
import { A } from './A';

vi.mock('./A');

describe('method', () => {
    it('should spy on method using instance', () => {
        const a = new A();
        const spy = vi.spyOn(a, 'method');

        a.method();

        expect(spy).toHaveBeenCalled();
    });

    it('should spy on method using prototype', () => {
        const spy = vi.spyOn(A.prototype, 'method');
        const a = new A();

        a.method();

        expect(spy).toHaveBeenCalled();
    });
});

describe('setter', () => {
    it('should spy on setter using instance', () => {
        const a = new A();
        const spy = vi.spyOn(a, 'setter', 'set');

        a.setter = 5;

        expect(spy).toHaveBeenCalledWith(5);
    });

    it('should spy on setter using prototype', () => {
        const spy = vi.spyOn(A.prototype, 'setter', 'set');
        const a = new A();

        a.setter = 7;

        expect(spy).toHaveBeenCalledWith(7);
    });
});

describe('getter', () => {
    it('should spy on getter using instance', () => {
        const a = new A();
        const spy = vi.spyOn(a, 'getter', 'get');

        a.getter;

        expect(spy).toHaveBeenCalled();
    });

    it('should spy on getter using prototype', () => {
        const spy = vi.spyOn(A.prototype, 'getter', 'get');
        const a = new A();

        a.getter;

        expect(spy).toHaveBeenCalled();
    });
});
