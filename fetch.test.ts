import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { beforeEach } from 'node:test';
import { afterAll, afterEach, beforeAll, expect, it, vi } from 'vitest';

const spy = vi.fn();

const handlers = [
    http.get('https://example.com/resource', () => {
        spy('resource');
        return HttpResponse.arrayBuffer(new Uint8Array([1, 2, 3]));
    }),

    http.get('https://example.com/notFound', () => {
        return HttpResponse.text('NotFound', {
            status: 404,
        });
    }),

    http.get('https://example.com/redirect', () => {
        spy('redirect');
        return new HttpResponse(null, {
            status: 302,
            headers: {
                Location: 'https://example.com/resource',
            },
        });
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => spy.mockClear());

it('should manage to get an arrayBuffer', async () => {
    const res = await fetch('https://example.com/resource');
    const buffer = await res.arrayBuffer();

    expect(spy).toHaveBeenCalledWith('resource');

    const uint8Array = new Uint8Array(buffer);

    expect(uint8Array).toHaveLength(3);
    expect(uint8Array).toContain(1);
    expect(uint8Array).toContain(2);
    expect(uint8Array).toContain(3);
});

it('should manage to turn the response into an array buffer, even though the response is a 404 (Response still have a body)', async () => {
    const res = await fetch('https://example.com/notFound');
    const buffer = await res.arrayBuffer();

    const uint8Array = new Uint8Array(buffer);
    expect(res.ok).toBeFalsy();
    expect(res.status).toBe(404);

    expect(uint8Array).toBeDefined();
});

it('should response with ok even if the request is redirected (300)', async () => {
    const res = await fetch('https://example.com/redirect');

    expect(spy).toHaveBeenNthCalledWith(1, 'redirect');
    expect(spy).toHaveBeenNthCalledWith(2, 'resource');
    expect(res.ok).toBeTruthy();

    // Why redirected is not set to true ??
    expect(res.redirected).not.toBeTruthy();
});
