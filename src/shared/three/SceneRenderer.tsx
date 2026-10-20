import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SceneFallback } from './SceneFallback';
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}
function ContextGuard({ onLost }: { onLost: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => gl.domElement.removeEventListener('webglcontextlost', lost);
  }, [gl, onLost]);
  return null;
}
export default function SceneRenderer({
  children,
  label,
  onReady,
  onUnavailable,
}: {
  children: ReactNode;
  label: string;
  onReady: () => void;
  onUnavailable: () => void;
}) {
  const [lost, setLost] = useState(false);
  const handleLost = () => {
    setLost(true);
    onUnavailable();
  };
  if (lost)
    return (
      <SceneFallback description="Konteks grafis berhenti. Muat ulang halaman untuk mencoba lagi." />
    );
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [3, 2.2, 4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={<SceneFallback />}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute('role', 'img');
        gl.domElement.setAttribute('aria-label', label);
      }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 3]} intensity={2.5} />
      <ContextGuard onLost={handleLost} />
      <Suspense fallback={null}>
        {children}
        <SceneReady onReady={onReady} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping={false}
        minDistance={2.5}
        maxDistance={8}
      />
    </Canvas>
  );
}
