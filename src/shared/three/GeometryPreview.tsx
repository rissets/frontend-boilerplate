import { lazy, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { SceneCanvas, type SceneStatus } from './SceneCanvas';
import { SceneControls } from './SceneControls';
const GeometryScene = lazy(() => import('./GeometryScene'));
export function GeometryPreview() {
  const [angle, setAngle] = useState(0);
  const [status, setStatus] = useState<SceneStatus>('loading');
  const reduced = !!useReducedMotion();
  return (
    <div className="space-y-4">
      <SceneCanvas
        label="Kubus dengan material biru"
        description="Kubus dari geometri bawaan. Seret untuk mengubah kamera, atau gunakan tombol putar."
        onStatusChange={setStatus}
      >
        <GeometryScene angle={angle} reduced={reduced} />
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
