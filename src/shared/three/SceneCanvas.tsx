import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { AsyncBoundary, ErrorState, LoadingState } from '@/shared/feedback';
import { cn } from '@/shared/lib/utils';
import { supportsWebGL } from './webgl';
import { SceneFallback } from './SceneFallback';
const SceneRenderer = lazy(() => import('./SceneRenderer'));
export type SceneStatus = 'loading' | 'ready' | 'unavailable';
export type SceneCanvasProps = {
  children: ReactNode;
  label: string;
  description: string;
  className?: string;
  onStatusChange?: (status: SceneStatus) => void;
  onRetry?: () => void | Promise<void>;
};
export function SceneCanvas({
  children,
  label,
  description,
  className,
  onStatusChange,
  onRetry,
}: SceneCanvasProps) {
  const [supported] = useState(supportsWebGL);
  const [status, setStatus] = useState<SceneStatus>(supported ? 'loading' : 'unavailable');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);
  const retry = async () => {
    await onRetry?.();
    setStatus('loading');
    setAttempt((value) => value + 1);
  };
  return (
    <figure className={cn('space-y-3', className)}>
      <div
        data-scene-state={status}
        className="relative h-80 overflow-hidden rounded-lg border bg-card sm:h-96"
      >
        {!supported ? (
          <SceneFallback description={description} />
        ) : (
          <AsyncBoundary
            key={attempt}
            onError={() => setStatus('unavailable')}
            fallback={
              <div className="flex h-full items-center justify-center p-6">
                <ErrorState
                  message="Objek 3D belum dapat dimuat. Periksa aset atau dukungan grafis perangkat."
                  onRetry={() => void retry()}
                />
              </div>
            }
          >
            <Suspense fallback={null}>
              <SceneRenderer
                label={label}
                onReady={() => setStatus('ready')}
                onUnavailable={() => setStatus('unavailable')}
              >
                {children}
              </SceneRenderer>
            </Suspense>
          </AsyncBoundary>
        )}
        {status === 'loading' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-card/90">
            <LoadingState label="Memuat objek 3D" />
          </div>
        )}
      </div>
      <figcaption className="text-sm text-muted-foreground">{description}</figcaption>
    </figure>
  );
}
