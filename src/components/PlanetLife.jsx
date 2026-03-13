import { OrbitControls, Stars, Billboard, Text, Html } from "@react-three/drei";
import { planetModels } from "../planets"; 
import { planetData } from "../data/planetData";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import { planetSurvivalData } from "../data/planetSurvival";
import { useState } from "react";

// HELPER: This component handles the cinematic zoom-in
function PerspectiveZoom() {
    
  useFrame((state) => {
    // The "Sweet Spot" for the horizon look
    const targetPos = new THREE.Vector3(0, 1.5, 2); 
    state.camera.position.lerp(targetPos, 0.03); // Adjust 0.03 for speed
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function PlanetLife({ planetId }) {
  const planetEntry = planetModels[planetId];
  if (!planetEntry) return null;
  const [showTips, setShowTips] = useState(false); // Toggle state
  const data = planetSurvivalData[planetId];
  if (!data || !planetEntry) return null;
  

  const PlanetComponent = planetEntry.component;

  // Normalization logic: adjust scale based on planetId if some are way too big
  // Gas giants usually need a smaller scale multiplier than rocky planets to look the same
  const isGasGiant = ["jupiter", "saturn", "uranus", "neptune"].includes(planetId.toLowerCase());
  const normalizedScale = isGasGiant ? 1.8 : 2.5; 

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
      <PerspectiveZoom />
      
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

      <Suspense fallback={null}>
        {/* We use normalizedScale to keep the curve consistent across planets */}
        <group position={[0, -2.5, 0]} scale={normalizedScale}>
          <PlanetComponent />
        </group>

        <Billboard position={[0, 1.2, 0.5]}>
          {/* 1. MAIN TITLE */}
          <Text
            fontSize={0.12}
            position={[0, 0.4, 0]}
            color="#60a5fa" // Sci-fi blue
            outlineWidth={0.02}
            outlineColor="black"
          >
            {data.title.toUpperCase()}
          </Text>

          {/* 2. DYNAMIC CONTENT AREA */}
          {!showTips ? (
            // SHORT VIEW: Description
            <Text
              fontSize={0.06}
              maxWidth={1.6}
              textAlign="center"
              position={[0, 0.1, 0]}
              lineHeight={1.4}
            >
              {data.description}
            </Text>
          ) : (
            // EXPANDED VIEW: Survival Tips
            <group position={[0, 0.1, 0]}>
              {data.survivalTips.map((tip, i) => (
                <Text
                  key={i}
                  fontSize={0.05}
                  maxWidth={1.6}
                  position={[0, -i * 0.15, 0]} // Stacks them vertically
                  textAlign="center"
                  color="#fbbf24" // Amber warning color
                >
                  {`• ${tip}`}
                </Text>
              ))}
            </group>
          )}

          {/* 3. INTERACTIVE BUTTON (using an invisible Text component as a trigger) */}
          <Text
            fontSize={0.07}
            position={[0, -0.6, 0]}
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              setShowTips(!showTips);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            {showTips ? "[ CLICK TO CLOSE LOGS ]" : "[ CLICK TO VIEW SURVIVAL TIPS ]"}
          </Text>
        </Billboard>
      </Suspense>

      <OrbitControls 
        enablePan={false}
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={1.5}
        maxDistance={5}
      />
    </Canvas>
  );
}