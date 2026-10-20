import { useState } from 'react';
import { useItems } from '../api/use-items';
import { filterItems } from '../lib/filter-items';
import type { ItemFilter } from '../model/item.types';
import { ItemForm } from './ItemForm';
import { ItemList } from './ItemList';
import { Search, RotateCcw } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ContentSkeleton, EmptyState, ErrorState } from '@/shared/feedback';
import { PresenceMessage } from '@/shared/motion';
export function ExampleItems() {
  const { query, create, updateStatus, reset, source, canReset } = useItems();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ItemFilter>('all');
  const [notice, setNotice] = useState<string | null>(null);
  const items = filterItems(query.data ?? [], search, status);
  const mutationError = create.error ?? updateStatus.error ?? reset.error;
  const submit = async (input: Parameters<typeof create.mutateAsync>[0]) => {
    await create.mutateAsync(input);
    setNotice('Item berhasil ditambahkan.');
  };
  return (
    <section aria-label="Koleksi item" className="space-y-6">
      <p className="max-w-2xl text-sm text-muted-foreground">
        {source === 'local'
          ? 'Data ilustratif disimpan pada browser ini.'
          : 'Menggunakan kontrak HTTP yang dikonfigurasi.'}{' '}
        Contoh ini menunjukkan satu alur fitur dari model hingga tampilan.
      </p>
      <ItemForm onSubmit={submit} pending={create.isPending || query.isPending || query.isError} />
      <PresenceMessage message={notice} />
      {mutationError && (
        <ErrorState message="Perubahan belum tersimpan. Periksa koneksi atau penyimpanan browser, lalu ulangi aksi." />
      )}
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-40 flex-1 space-y-2">
          <Label htmlFor="item-search">Cari item</Label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground"
            />
            <Input
              id="item-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="item-status">Status</Label>
          <select
            id="item-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as ItemFilter)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">Semua</option>
            <option value="active">Aktif</option>
            <option value="archived">Diarsipkan</option>
          </select>
        </div>
      </div>
      <div aria-busy={query.isFetching}>
        {query.isPending ? (
          <ContentSkeleton label="Memuat item" />
        ) : query.isError ? (
          <ErrorState
            message={
              source === 'local'
                ? 'Data lokal belum dapat dibaca. Coba lagi atau pulihkan sampel.'
                : 'Item belum dapat dimuat dari server.'
            }
            onRetry={() => void query.refetch()}
          />
        ) : items.length ? (
          <ItemList
            items={items}
            pending={updateStatus.isPending || reset.isPending}
            onStatusChange={(id, status) =>
              updateStatus.mutate(
                { id, status },
                { onSuccess: () => setNotice('Status item berhasil diubah.') },
              )
            }
          />
        ) : (
          <EmptyState
            title={search || status !== 'all' ? 'Tidak ada item yang cocok' : 'Belum ada item'}
            description={
              search || status !== 'all'
                ? 'Ubah kata pencarian atau filter status.'
                : 'Tambahkan item pertama melalui formulir.'
            }
          />
        )}
      </div>
      {canReset && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={reset.isPending || create.isPending || updateStatus.isPending}
          onClick={() =>
            reset.mutate(undefined, {
              onSuccess: () => {
                setSearch('');
                setStatus('all');
                setNotice('Koleksi sampel dipulihkan.');
              },
            })
          }
        >
          <RotateCcw aria-hidden="true" />
          Pulihkan sampel
        </Button>
      )}
    </section>
  );
}
