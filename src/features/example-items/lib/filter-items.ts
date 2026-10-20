import type { Item, ItemFilter } from '../model/item.types';
export function filterItems(items: readonly Item[], search: string, status: ItemFilter) {
  const needle = search.trim().toLocaleLowerCase('id-ID');
  return items.filter(
    (item) =>
      (status === 'all' || item.status === status) &&
      item.title.toLocaleLowerCase('id-ID').includes(needle),
  );
}
