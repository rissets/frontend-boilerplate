import { apiRequest } from '@/shared/api/client';
import {
  createItemSchema,
  itemSchema,
  itemsSchema,
  updateItemStatusSchema,
} from '../model/item.schema';
import type { ItemRepository } from './item.repository';
export const httpItemRepository: ItemRepository = {
  source: 'http',
  list: (signal) => apiRequest('/example-items', itemsSchema, { signal }),
  create: (input) =>
    apiRequest('/example-items', itemSchema, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createItemSchema.parse(input)),
    }),
  updateStatus: (input) => {
    const parsed = updateItemStatusSchema.parse(input);
    return apiRequest('/example-items/' + encodeURIComponent(parsed.id), itemSchema, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: parsed.status }),
    });
  },
};
