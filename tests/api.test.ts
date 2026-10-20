import { it, expect, vi, afterEach } from 'vitest';
import { z } from 'zod';
import { apiRequest } from '@/shared/api/client';
afterEach(() => vi.unstubAllGlobals());
const schema = z.object({ status: z.literal('ok') });
it('rejects a successful HTTP response with an invalid feature model', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify({ status: 'unknown' }))),
  );
  await expect(apiRequest('/health', schema)).rejects.toMatchObject({ status: 502 });
});
it('preserves Headers and explicitly supplied request options', async () => {
  const fetch = vi.fn(async () => new Response(JSON.stringify({ status: 'ok' })));
  vi.stubGlobal('fetch', fetch);
  await expect(
    apiRequest('health', schema, {
      credentials: 'omit',
      headers: new Headers({ 'X-Request-ID': 'test-id' }),
    }),
  ).resolves.toEqual({ status: 'ok' });
  expect(fetch).toHaveBeenCalledWith(
    '/api/health',
    expect.objectContaining({ credentials: 'omit' }),
  );
  const options = fetch.mock.calls[0] as unknown as [string, RequestInit];
  expect(new Headers(options[1].headers).get('X-Request-ID')).toBe('test-id');
  expect(new Headers(options[1].headers).get('Accept')).toBe('application/json');
});
it('retains HTTP error status and rejects non-JSON responses', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('Not found', { status: 404 })),
  );
  await expect(apiRequest('/health', schema)).rejects.toMatchObject({ status: 404 });
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('invalid JSON')),
  );
  await expect(apiRequest('/health', schema)).rejects.toMatchObject({ status: 502 });
});
