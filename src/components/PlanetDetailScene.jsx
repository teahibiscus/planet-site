import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { planetModels } from "../planets";
import PlanetGLTF from "./PlanetGLTF";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

function PerspectiveZoom() {
  useFrame((state) => {
    // Smoothly interpolate the camera position from wherever it is to [0, 0, 4]
    state.camera.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function PlanetDetailScene({ planetId }) {
  const planetData = planetModels[planetId];
  const navigate = useNavigate();

  if (!planetData) return null;

  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <PerspectiveZoom />
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={50} depth={20} count={5000} factor={4} fade />

      <Suspense fallback={null}>
        {planetData.type === 'texture' && planetData.component && <planetData.component />}
        {planetData.type === 'gltf' && planetData.path && <PlanetGLTF path={planetData.path} scale={20}/>}
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
