import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Planet({
  id,
  color,
  orbitRadius = 0,
  orbitSpeed = 0,
}) {
  const navigate = useNavigate();
  const meshRef = useRef();
  const labelRef = useRef();
  const [hovered, setHovered] = useState(false);

  const orbitAngle = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    const mesh = meshRef.current;

    mesh.rotation.y += 0.003;

    const scaleBase = hovered ? 1.35 : 1.2;
    mesh.scale.setScalar(scaleBase + Math.sin(state.clock.elapsedTime * 2) * 0.03);

    mesh.material.emissive = new THREE.Color(hovered ? color : "black");
    mesh.material.emissiveIntensity = hovered ? 0.6 : 0;

    if (orbitRadius > 0) {
      orbitAngle.current += orbitSpeed * delta;
      mesh.position.x = Math.cos(orbitAngle.current) * orbitRadius;
      mesh.position.z = Math.sin(orbitAngle.current) * orbitRadius;
    }

    if (labelRef.current) {
      labelRef.current.position.copy(mesh.position).add(new THREE.Vector3(0, 1.5, 0));
      labelRef.current.material.opacity = hovered ? 1 : 0;
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => navigate(`/planet/${id}`)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh ref={labelRef}>
        <textGeometry args={[id.toUpperCase(), { size: 0.3, height: 0.05 }]} />
        <meshBasicMaterial color="white" transparent opacity={0} />
      </mesh>
    </>
  );
}
