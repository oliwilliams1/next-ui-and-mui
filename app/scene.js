import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';

function Scene() {
  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function SceneCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Scene />
    </Canvas>
  );
}