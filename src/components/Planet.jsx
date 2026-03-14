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
  size = 1 // Added a default value so it never hits 0 or undefined
}) {
  const navigate = useNavigate();
  const orbitRef = useRef(); 
  const planetRef = useRef(); 
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitSpeed * delta;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003;
      
      // We multiply the BASE size by the dynamic modifiers
      const hoverScale = hovered ? 1.15 : 1.0;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      
      // This ensures the planet reflects the 'size' prop correctly
      planetRef.current.scale.setScalar(size * (hoverScale + pulse));
    }
  });

  const label = id ? id.charAt(0).toUpperCase() + id.slice(1) : "";
  const hasModel = ["earth", "mars", "jupiter", "saturn", "mercury", "venus", "uranus", "neptune"].includes(id);

  return (
    <group position={center}>
      <group ref={orbitRef}>
        <group 
          position={[orbitRadius, 0, 0]} 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => navigate(`/planet/${id}`)}
        >
          {/* Hitbox: Scaled to the planet size so it's always reachable */}
          <mesh visible={false}>
            <sphereGeometry args={[size * 1.5, 16, 16]} /> 
          </mesh>

          <group ref={planetRef}>
            {hasModel ? (
              <PlanetGLTF path={`/models/${id}.glb`} hovered={hovered} />
            ) : (
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.5 : 0} />
              </mesh>
            )}
          </group>

          {hovered && <PlanetParticles position={[0, 0, 0]} color={color} planetId={id} />}

          {/* Dynamic Billboard position based on planet size */}
          <Billboard position={[0, size + 1.2, 0]}>
            <Text 
              fontSize={hovered ? 0.6 : 0.4} 
              color={hovered ? "yellow" : "white"} 
              outlineWidth={0.02}
              outlineColor="black" 
              anchorX="center" 
              anchorY="bottom"
              font="/fonts/Quantico-Regular.ttf"
            >
              {label}
            </Text>
          </Billboard>
        </group>
      </group>
    </group>
  );
}