import type { CreateItemInput, Item, UpdateItemStatusInput } from '../model/item.types';
export interface ItemRepository {
  readonly source: 'local' | 'http';
  list(signal?: AbortSignal): Promise<Item[]>;
  create(input: CreateItemInput): Promise<Item>;
  updateStatus(input: UpdateItemStatusInput): Promise<Item>;
  reset?(): Promise<void>;
}
