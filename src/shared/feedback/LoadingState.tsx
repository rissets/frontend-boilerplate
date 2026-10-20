import { LoaderCircle } from '@/shared/icons';
import { cn } from '@/shared/lib/utils';
export function LoadingState({
  label = 'Memuat...',
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex items-center gap-2 py-6 text-sm text-muted-foreground', className)}
    >
      <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
      <span>{label}</span>
    </div>
  );
}
