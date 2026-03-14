import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Text, useGLTF } from "@react-three/drei";
import { Suspense, useState, useRef, useMemo } from "react";
import { planetModels } from "../planets";
import PlanetGLTF from "./PlanetGLTF";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { planetData } from "../data/planetData";
import Loader from "./Loader";

function PerspectiveZoom() {
  useFrame((state) => {
    // Smoothly interpolate the camera position from wherever it is to [0, 0, 4]
    state.camera.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function PlanetDetailScene({ planetId }) {
  const planetModelData = planetModels[planetId];
  const planetName = planetData[planetId]?.name || "Unknown Planet";
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  if (!planetModelData) return null;

  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <PerspectiveZoom />
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={50} depth={20} count={5000} factor={4} fade />

      <Suspense fallback={<Loader />}>
        <group 
          onPointerOver={() => {
            setHovered(true);
            // Change the cursor to a pointer when hovering
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            // Reset the cursor
            document.body.style.cursor = 'default';
          }}
          // 4. Click leads to the additional info page
          onClick={() => navigate(`/life-on-planet/${planetId}`)}
        >
          {/* 5. The Billboard instruction (floats above the planet) */}
          <Billboard position={[0, 1, 0]} follow={true}>
            <Text 
              fontSize={0.1}
              color={hovered ? "#60a5fa" : "white"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
              font="/fonts/Quantico-Regular.ttf"
            >
              {`Now can we live on ${planetName}?`}
            </Text>
          </Billboard>
          {planetModelData.type === 'texture' && planetModelData.component && <planetModelData.component />}
        {planetModelData.type === 'gltf' && planetModelData.path && <PlanetGLTF path={planetModelData.path} scale={20}/>}
          
        </group>

        
      </Suspense>

      <OrbitControls enablePan={false} 
        minDistance={2}   // Closest they can get
        maxDistance={10}  // Furthest they can go
        autoRotate={true}         // Enables the spin
        autoRotateSpeed={0.5}     // Adjust this for "very slow" (default is 2.0)
      />
    </Canvas>
  );
}
