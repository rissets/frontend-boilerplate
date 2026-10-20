import { useMemo } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
export default function ModelScene({
  src,
  angle,
  reduced,
}: {
  src: string;
  angle: number;
  reduced: boolean;
}) {
  const { scene } = useGLTF(src, false, false);
  const instance = useMemo(() => clone(scene), [scene]);
  const { rotation } = useSpring({
    rotation: angle,
    immediate: reduced,
    config: { tension: 170, friction: 26 },
  });
  return (
    <animated.group rotation-y={rotation}>
      <Center>
        <primitive object={instance} dispose={null} />
      </Center>
    </animated.group>
  );
}
