import { describe, expect, it } from 'vitest';

describe('arrow constructor', () => {
    it('should define this correctly when returning an object', () => {
        const factory = () => ({
            a: 'plop',
            b: {
                plip: 'plip',
            },
            get plop() {
                return this.a;
            },

            get plip() {
                return this.b.plip;
            },
        });

        const o = factory();

        expect(o.plop).toBe('plop');
        expect(o.plip).toBe('plip');
    });
});
