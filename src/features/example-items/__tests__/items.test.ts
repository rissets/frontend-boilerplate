import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLocalItemRepository } from '../api/local-item.repository';
import { httpItemRepository } from '../api/http-item.repository';
import { itemSchema, itemsSchema, createItemSchema } from '../model/item.schema';
import { initialItems } from '../api/item.fixtures';
import { filterItems } from '../lib/filter-items';
function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };
}
afterEach(() => vi.unstubAllGlobals());
describe('example feature data contract', () => {
  it('rejects invalid identifiers, states, dates and empty names', () => {
    expect(createItemSchema.safeParse({ title: '   ' }).success).toBe(false);
    expect(itemSchema.safeParse({ ...initialItems[0], id: 'bad' }).success).toBe(false);
    expect(itemSchema.safeParse({ ...initialItems[0], status: 'unknown' }).success).toBe(false);
    expect(itemSchema.safeParse({ ...initialItems[0], createdAt: 'not a timestamp' }).success).toBe(
      false,
    );
    expect(itemsSchema.safeParse([initialItems[0], initialItems[0]]).success).toBe(false);
  });
  it('persists create/status changes across repository instances', async () => {
    const storage = memoryStorage();
    const repository = createLocalItemRepository(storage, 'items', 0);
    const created = await repository.create({ title: '  Baru  ' });
    expect(created.title).toBe('Baru');
    await repository.updateStatus({ id: created.id, status: 'archived' });
    const reopened = createLocalItemRepository(storage, 'items', 0);
    expect(await reopened.list()).toContainEqual({ ...created, status: 'archived' });
    expect(initialItems).toHaveLength(2);
  });
  it('keeps corrupt storage until an explicit reset and preserves other keys', async () => {
    const storage = memoryStorage();
    storage.setItem('items', 'broken');
    storage.setItem('other', 'keep');
    const repository = createLocalItemRepository(storage, 'items', 0);
    await expect(repository.list()).rejects.toThrow('Data lokal');
    expect(storage.getItem('items')).toBe('broken');
    await repository.reset?.();
    expect(await repository.list()).toEqual(initialItems);
    expect(storage.getItem('other')).toBe('keep');
  });
  it('does not report a successful save when storage fails', async () => {
    const repository = createLocalItemRepository(
      {
        ...memoryStorage(),
        setItem: () => {
          throw new Error('Quota exceeded');
        },
      },
      'items',
      0,
    );
    await expect(repository.create({ title: 'Baru' })).rejects.toThrow('Quota exceeded');
  });
  it('cancels pending reads', async () => {
    const repository = createLocalItemRepository(memoryStorage(), 'items', 100);
    const controller = new AbortController();
    const request = repository.list(controller.signal);
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
  });
  it('rejects an unknown item instead of creating it by update', async () => {
    const repository = createLocalItemRepository(memoryStorage(), 'items', 0);
    await expect(
      repository.updateStatus({ id: '20000000-0000-4000-8000-000000000001', status: 'archived' }),
    ).rejects.toThrow('tidak ditemukan');
  });
  it('filters by name and state without modifying the collection', () => {
    expect(filterItems(initialItems, 'CATATAN', 'active')).toEqual([initialItems[0]]);
    expect(filterItems(initialItems, 'catatan', 'archived')).toEqual([]);
    expect(initialItems).toHaveLength(2);
  });
  it('validates HTTP responses instead of falling back to local data', async () => {
    const fetch = vi.fn(async () => new Response(JSON.stringify({ id: 'bad' })));
    vi.stubGlobal('fetch', fetch);
    await expect(httpItemRepository.create({ title: 'Baru' })).rejects.toMatchObject({
      status: 502,
    });
    expect(fetch).toHaveBeenCalledWith(
      '/api/example-items',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ title: 'Baru' }) }),
    );
  });
});
