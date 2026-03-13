import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { planetModels } from "../planets";
import PlanetGLTF from "./PlanetGLTF";

export default function PlanetDetailScene({ planetId }) {
  const planetData = planetModels[planetId];

  if (!planetData) return null;

  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={50} depth={20} count={5000} factor={4} fade />

      <Suspense fallback={null}>
        {planetData.type === 'texture' && planetData.component && <planetData.component />}
        {planetData.type === 'gltf' && planetData.path && <PlanetGLTF path={planetData.path} scale={2} />}
      </Suspense>

      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
