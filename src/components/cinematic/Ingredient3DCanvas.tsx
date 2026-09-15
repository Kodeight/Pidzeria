import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural 3D floating pizza ingredients using Three.js mesh geometry
function FloatingBasil({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale * 1.5, scale * 0.1]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#22c55e" roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function FloatingTomato({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.2;
    meshRef.current.position.y = position[1] + Math.cos(t * 0.8) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

function FloatingOlive({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale * 0.8, scale * 1.1, scale * 0.8]}>
      <torusGeometry args={[0.8, 0.4, 16, 24]} />
      <meshStandardMaterial color="#1c1917" roughness={0.1} metalness={0.2} />
    </mesh>
  );
}

function FlourParticles({ count = 80 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#fef3c7"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const Ingredient3DCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-5, -5, -2]} intensity={0.5} color="#ef4444" />
        
        {/* Floating background 3D food items */}
        <FloatingBasil position={[-3.2, 2.1, -1]} scale={0.35} speed={0.8} />
        <FloatingBasil position={[3.5, -1.8, -0.5]} scale={0.4} speed={0.6} />
        <FloatingTomato position={[3.1, 2.4, -1.5]} scale={0.45} speed={0.7} />
        <FloatingTomato position={[-2.8, -2.2, -0.8]} scale={0.38} speed={0.9} />
        <FloatingOlive position={[-3.5, -0.5, -1.2]} scale={0.3} speed={0.85} />
        <FloatingOlive position={[2.8, 0.8, -0.8]} scale={0.28} speed={0.75} />
        
        <FlourParticles count={100} />
      </Canvas>
    </div>
  );
};
