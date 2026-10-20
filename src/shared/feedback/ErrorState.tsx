import { CircleAlert } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
export function ErrorState({
  message = 'Data belum dapat dimuat.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="space-y-3 py-6">
      <p className="flex items-center gap-2 text-sm text-destructive">
        <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
        {message}
      </p>
      {onRetry && (
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          Coba lagi
        </Button>
      )}
    </div>
  );
}
