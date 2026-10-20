import {
  createItemSchema,
  itemSchema,
  itemsSchema,
  updateItemStatusSchema,
} from '../model/item.schema';
import { initialItems } from './item.fixtures';
import type { ItemRepository } from './item.repository';
type ItemStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export function createLocalItemRepository(
  storage: ItemStorage,
  key: string,
  delayMs = 180,
): ItemRepository {
  const read = () => {
    const value = storage.getItem(key);
    if (value === null) return itemsSchema.parse(initialItems);
    try {
      return itemsSchema.parse(JSON.parse(value));
    } catch {
      throw new Error('Data lokal tidak sesuai kontrak. Pulihkan sampel untuk memulai ulang.');
    }
  };
  const pause = (signal?: AbortSignal) =>
    new Promise<void>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
        return;
      }
      const abort = () => {
        clearTimeout(timer);
        reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'));
      };
      const timer = setTimeout(() => {
        signal?.removeEventListener('abort', abort);
        resolve();
      }, delayMs);
      signal?.addEventListener('abort', abort, { once: true });
    });
  return {
    source: 'local',
    async list(signal) {
      await pause(signal);
      return read();
    },
    async create(input) {
      const parsed = createItemSchema.parse(input);
      await pause();
      const item = itemSchema.parse({
        ...parsed,
        id: crypto.randomUUID(),
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      const items = read();
      storage.setItem(key, JSON.stringify(itemsSchema.parse([...items, item])));
      return item;
    },
    async updateStatus(input) {
      const parsed = updateItemStatusSchema.parse(input);
      await pause();
      const items = read();
      const index = items.findIndex((item) => item.id === parsed.id);
      if (index < 0) throw new Error('Item tidak ditemukan.');
      const item = itemSchema.parse({ ...items[index], status: parsed.status });
      items[index] = item;
      storage.setItem(key, JSON.stringify(itemsSchema.parse(items)));
      return item;
    },
    async reset() {
      await pause();
      storage.removeItem(key);
    },
  };
}
