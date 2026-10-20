import { Box } from '@/shared/icons';
export function SceneFallback({
  description = 'Informasi objek tetap tersedia melalui teks dan kontrol di halaman ini.',
}: {
  description?: string;
}) {
  return (
    <div
      role="status"
      className="flex h-full min-h-64 flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <Box aria-hidden="true" className="size-8 text-muted-foreground" />
      <p className="font-medium">Pratinjau 3D tidak tersedia</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
