"use client";

import { useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingMesh({
  position,
  scale,
  color
}: {
  position: [number, number, number];
  scale: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.x += 0.0015;
    ref.current.rotation.y += 0.0022;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.12;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.28} wireframe />
    </mesh>
  );
}

export function BackgroundScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 38 }}>
      <ambientLight intensity={0.65} />
      <pointLight position={[4, 4, 6]} intensity={1.1} color="#7dd3fc" />
      <pointLight position={[-4, -3, 5]} intensity={0.85} color="#f9a8d4" />
      <FloatingMesh position={[-2.6, 1.6, 0]} scale={1.4} color="#7dd3fc" />
      <FloatingMesh position={[2.4, -1.3, -0.2]} scale={1.1} color="#f9a8d4" />
      <FloatingMesh position={[0.4, 2.2, -1]} scale={0.8} color="#86efac" />
    </Canvas>
  );
}
