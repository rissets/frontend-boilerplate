import type { z } from 'zod';
import type {
  createItemSchema,
  itemSchema,
  itemStatusSchema,
  updateItemStatusSchema,
} from './item.schema';
export type Item = z.infer<typeof itemSchema>;
export type ItemStatus = z.infer<typeof itemStatusSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemStatusInput = z.infer<typeof updateItemStatusSchema>;
export type ItemFilter = ItemStatus | 'all';
