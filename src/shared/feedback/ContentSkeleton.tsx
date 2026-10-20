import { Skeleton } from '@/shared/ui/skeleton';
export function ContentSkeleton({ label = 'Memuat konten' }: { label?: string }) {
  return (
    <div role="status" aria-label={label} className="space-y-3 py-6">
      <span className="sr-only">{label}</span>
      <Skeleton aria-hidden="true" className="h-5 w-2/3 motion-reduce:animate-none" />
      <Skeleton aria-hidden="true" className="h-4 w-full motion-reduce:animate-none" />
      <Skeleton aria-hidden="true" className="h-4 w-4/5 motion-reduce:animate-none" />
    </div>
  );
}
