import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import PlanetGLTF from "./PlanetGLTF";
import PlanetParticles from './PlanetParticles';

export default function Planet({
  id,
  color,
  center = [0, 0, 0],
  orbitRadius = 0,
  orbitSpeed = 0,
}) {
  const navigate = useNavigate();
  const orbitRef = useRef(); // Rotates the entire orbit
  const planetRef = useRef(); // Rotates the actual planet mesh
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    // 1. Handle Orbiting
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed * delta;
    }

    // 2. Handle Local Planet Rotation & Pulse
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003;
      const scaleBase = hovered ? 1.35 : 1.2;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.03;
      planetRef.current.scale.setScalar(scaleBase + pulse);
    }
  });

  const label = id ? id.charAt(0).toUpperCase() + id.slice(1) : "";
  const hasModel = ["earth", "mars", "jupiter", "saturn", "mercury", "venus", "uranus", "neptune"].includes(id);

  return (
    // This group stays at the center of the solar system
    <group position={center}>
      
      {/* This group rotates, moving everything inside it in a circle */}
      <group ref={orbitRef}>
        
        {/* This group is offset by the orbitRadius */}
        <group 
          position={[orbitRadius, 0, 0]} 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => navigate(`/planet/${id}`)}
        >
          {/* The Actual Planet Visuals */}
          <group ref={planetRef}>
            {hasModel ? (
              <PlanetGLTF path={`/models/${id}.glb`} scale={0.3} hovered={hovered} />
            ) : (
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial 
                  color={color} 
                  emissive={color} 
                  emissiveIntensity={hovered ? 0.5 : 0} 
                />
              </mesh>
            )}
          </group>

          {/* Particles & Billboard move with the planet group because they are children of it */}
          {hovered && <PlanetParticles position={[0, 0, 0]} color={color} planetId={id} />}

          <Billboard position={[0, 1.8, 0]}>
            <Text fontSize={0.35} color="white" anchorX="center" anchorY="bottom">
              {label}
            </Text>
          </Billboard>
        </group>
      </group>
    </group>
  );
}