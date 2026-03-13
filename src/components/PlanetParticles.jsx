import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PlanetParticles({ position, color, planetId }) {
  const particlesRef = useRef();
  const particleCount = 50;

  // Create particle geometry and material
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Random positions around the planet
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      // Velocities outward from planet
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.02 + 0.01;
      velocities[i * 3] = Math.cos(angle) * speed;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = Math.sin(angle) * speed;
    }

    return { positions, velocities };
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array;
    const velocities = particlesRef.current.geometry.attributes.velocity?.array;

    for (let i = 0; i < particleCount; i++) {
      // Update positions based on velocities
      positions[i * 3] += velocities[i * 3] * delta * 60;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

      // Reset particles that go too far
      const distance = Math.sqrt(
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2
      );

      if (distance > 3) {
        positions[i * 3] = (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Fade particles over time
    if (particlesRef.current.material.opacity > 0) {
      particlesRef.current.material.opacity -= delta * 0.5;
    }
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-velocity"
          count={particleCount}
          array={velocities}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}