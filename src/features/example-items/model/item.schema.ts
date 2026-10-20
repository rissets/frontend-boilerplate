import { z } from 'zod';
export const itemStatusSchema = z.enum(['active', 'archived']);
export const itemSchema = z
  .object({
    id: z.uuid(),
    title: z.string().trim().min(1, 'Nama wajib diisi').max(80, 'Maksimal 80 karakter'),
    status: itemStatusSchema,
    createdAt: z.iso.datetime(),
  })
  .strict();
export const createItemSchema = itemSchema.pick({ title: true });
export const updateItemStatusSchema = itemSchema.pick({ id: true, status: true });
export const itemsSchema = z
  .array(itemSchema)
  .refine(
    (items) => new Set(items.map((item) => item.id)).size === items.length,
    'ID item harus unik',
  );
