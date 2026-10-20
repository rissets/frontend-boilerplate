import { useState } from 'react';
import { PageFrame } from '@/shared/layout/PageFrame';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { ContentSkeleton, EmptyState, ErrorState, LoadingState } from '@/shared/feedback';
import { GeometryPreview, ModelViewer } from '@/shared/three';
import { PresenceMessage, Reveal } from '@/shared/motion';
export default function VisualExamplePage() {
  const [scene, setScene] = useState<'model' | 'geometry'>('model');
  const [feedback, setFeedback] = useState('loading');
  const [message, setMessage] = useState<string | null>(null);
  return (
    <PageFrame>
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">3D, motion, dan loading</h1>
        <p className="mt-3 text-muted-foreground">
          Komponen reusable dengan tema terang/gelap, reduced motion, dan fallback perangkat.
        </p>
      </div>
      <div className="space-y-12">
        <section aria-labelledby="scene-heading" className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="scene-heading" className="text-xl font-semibold">
              Pratinjau objek
            </h2>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={scene === 'model' ? 'default' : 'outline'}
                aria-pressed={scene === 'model'}
                onClick={() => setScene('model')}
              >
                Model GLB
              </Button>
              <Button
                type="button"
                size="sm"
                variant={scene === 'geometry' ? 'default' : 'outline'}
                aria-pressed={scene === 'geometry'}
                onClick={() => setScene('geometry')}
              >
                Geometri dasar
              </Button>
            </div>
          </div>
          <Reveal>
            {scene === 'model' ? (
              <ModelViewer
                src="/models/box.glb"
                label="Model Box dari Cesium"
                description="Box: satu mesh dan satu material. Kontrol DOM tetap menyediakan nama objek ketika 3D tidak tersedia."
              />
            ) : (
              <GeometryPreview />
            )}
          </Reveal>
          <p className="text-xs text-muted-foreground">
            Model Box oleh Cesium, 2017,{' '}
            <a
              className="underline underline-offset-4"
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY 4.0
            </a>
            .{' '}
            <a
              className="underline underline-offset-4"
              href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Box"
              target="_blank"
              rel="noreferrer"
            >
              Sumber Khronos
            </a>
            . File tidak diubah.
          </p>
        </section>
        <section aria-labelledby="feedback-heading" className="space-y-5">
          <h2 id="feedback-heading" className="text-xl font-semibold">
            Status konten
          </h2>
          <div className="space-y-2">
            <Label htmlFor="feedback-state">Tampilkan status</Label>
            <select
              id="feedback-state"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="loading">Loading</option>
              <option value="skeleton">Skeleton</option>
              <option value="empty">Empty</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="min-h-36 border-t border-b">
            {feedback === 'loading' ? (
              <LoadingState label="Memuat konten" />
            ) : feedback === 'skeleton' ? (
              <ContentSkeleton />
            ) : feedback === 'empty' ? (
              <EmptyState />
            ) : (
              <ErrorState
                message="Konten contoh belum tersedia."
                onRetry={() => setFeedback('loading')}
              />
            )}
          </div>
        </section>
        <section aria-labelledby="motion-heading" className="space-y-4">
          <h2 id="motion-heading" className="text-xl font-semibold">
            Feedback dengan motion
          </h2>
          <p className="text-sm text-muted-foreground">
            Satu transisi singkat untuk perubahan pesan. Preferensi pengurangan gerak dihormati.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setMessage('Pesan ditampilkan dengan transisi singkat.')}
            >
              Tampilkan pesan
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={!message}
              onClick={() => setMessage(null)}
            >
              Sembunyikan pesan
            </Button>
          </div>
          <PresenceMessage message={message} />
        </section>
      </div>
    </PageFrame>
  );
}
