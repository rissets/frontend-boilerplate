import { itemsSchema } from '../model/item.schema';
export const initialItems = itemsSchema.parse([
  {
    id: '10000000-0000-4000-8000-000000000001',
    title: 'Catatan pertama',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z',
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    title: 'Referensi tampilan',
    status: 'archived',
    createdAt: '2026-01-02T08:00:00.000Z',
  },
]);
