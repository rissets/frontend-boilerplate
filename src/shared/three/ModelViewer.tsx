import { lazy, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { SceneCanvas, type SceneStatus } from './SceneCanvas';
import { SceneControls } from './SceneControls';
const ModelScene = lazy(() => import('./ModelScene'));
export function ModelViewer({
  src,
  label,
  description,
}: {
  src: string;
  label: string;
  description: string;
}) {
  const [angle, setAngle] = useState(0);
  const [status, setStatus] = useState<SceneStatus>('loading');
  const reduced = !!useReducedMotion();
  const retry = async () => {
    const { useGLTF } = await import('@react-three/drei');
    useGLTF.clear(src);
  };
  return (
    <div className="space-y-4" data-motion-mode={reduced ? 'reduced' : 'full'}>
      <SceneCanvas
        key={src}
        label={label}
        description={description}
        onStatusChange={setStatus}
        onRetry={retry}
      >
        <ModelScene src={src} angle={angle} reduced={reduced} />
      </SceneCanvas>
      <SceneControls
        angle={angle}
        ready={status === 'ready'}
        onRotate={(direction) => setAngle((value) => value + (direction * Math.PI) / 4)}
        onReset={() => setAngle(0)}
      />
    </div>
  );
}
