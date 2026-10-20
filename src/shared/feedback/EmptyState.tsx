import { FolderOpen } from '@/shared/icons';
export function EmptyState({
  title = 'Belum ada item',
  description = 'Tambahkan item pertama untuk memulai.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="space-y-2 py-10 text-center">
      <FolderOpen aria-hidden="true" className="mx-auto size-6 text-muted-foreground" />
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
