import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

export default function Planet({
  id,
  color,
  center = [0, 0, 0],
  orbitRadius = 0,
  orbitSpeed = 0,
}) {
  const navigate = useNavigate();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const orbitAngle = useRef(0);

  useEffect(() => {
    orbitAngle.current = Math.random() * Math.PI * 2;
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += 0.003;

    const scaleBase = hovered ? 1.35 : 1.2;
    mesh.scale.setScalar(scaleBase + Math.sin(state.clock.elapsedTime * 2) * 0.03);

    if (mesh.material) {
      mesh.material.emissive = new THREE.Color(hovered ? color : "black");
      mesh.material.emissiveIntensity = hovered ? 0.6 : 0;
    }

    if (orbitRadius > 0) {
      orbitAngle.current += orbitSpeed * delta;
      const x = center[0] + Math.cos(orbitAngle.current) * orbitRadius;
      const z = center[2] + Math.sin(orbitAngle.current) * orbitRadius;
      mesh.position.set(x, center[1], z);
    } else {
      mesh.position.set(center[0], center[1], center[2]);
    }
  });

  const label = id ? id.charAt(0).toUpperCase() + id.slice(1) : "";

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => navigate(`/planet/${id}`)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />

      <Billboard
        position={[0, 1.5, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text fontSize={0.35} color="white" anchorX="center" anchorY="bottom">
          {label}
        </Text>
      </Billboard>
    </mesh>
  );
}
