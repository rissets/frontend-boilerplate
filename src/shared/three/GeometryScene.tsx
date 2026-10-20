import { animated, useSpring } from '@react-spring/three';
export default function GeometryScene({ angle, reduced }: { angle: number; reduced: boolean }) {
  const { rotation } = useSpring({
    rotation: angle,
    immediate: reduced,
    config: { tension: 170, friction: 26 },
  });
  return (
    <animated.group rotation-y={rotation}>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#3c82bb" roughness={0.65} metalness={0.05} />
      </mesh>
    </animated.group>
  );
}
