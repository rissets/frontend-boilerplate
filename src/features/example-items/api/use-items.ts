import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { itemKeys } from '../model/item.keys';
import { itemRepository } from './get-item.repository';
import type { ItemRepository } from './item.repository';
export function useItems(repository: ItemRepository = itemRepository) {
  const client = useQueryClient();
  const queryKey = itemKeys.all(repository.source);
  const query = useQuery({
    queryKey,
    queryFn: ({ signal }) => repository.list(signal),
    retry: false,
  });
  const refresh = () => client.invalidateQueries({ queryKey });
  const create = useMutation({ mutationFn: repository.create, onSuccess: refresh });
  const updateStatus = useMutation({ mutationFn: repository.updateStatus, onSuccess: refresh });
  const reset = useMutation({
    mutationFn: async () => {
      await repository.reset?.();
    },
    onSuccess: refresh,
  });
  return {
    query,
    create,
    updateStatus,
    reset,
    source: repository.source,
    canReset: !!repository.reset,
  };
}
