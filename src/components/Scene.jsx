import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useProgress } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "../planets/sun";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "./Loader";

function PerspectiveZoom() {
  useFrame((state) => {
    // Zoom to 15 units away so you can see the 10-unit planet + the text above it
    state.camera.position.lerp(new THREE.Vector3(0, 10, 20), 0.05);
    state.camera.lookAt(0, 0, 3);
  });
  return null;
}

export default function Scene() {
  const sunPosition = [0, 0, 0];
  const { active, progress } = useProgress();
  // 'active' is true while loading, false when finished
  const isLoaded = !active && progress === 100;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ 
        position: "absolute", 
        top: '10%', 
        left: '50%', 
        transform: 'translateX(-50%)', // Center it perfectly
        zIndex: 1, 
        textAlign: 'center',
        color: "#fff",
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translate(-50%, 0)' : 'translate(-50%, -20px)',
        transition: 'all 1.2s ease-out', // Smooth fade and slide down
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',

      }}>
        <h1 style={{ margin: 0, fontSize: "3rem", textShadow: '0 0 20px rgba(255,255,255,0.3)', fontFamily: "'Kirang Haerang', system-ui, sans-serif" }}>
          What it would be like on...
        </h1>
        <p style={{ color: "#ccc" }}>Click on a planet to explore</p>
      </div>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 40, 80], fov: 45 }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />

        {/* Sun */}
        <Suspense fallback={<Loader/>}>
        <PerspectiveZoom />
        <pointLight position={sunPosition} intensity={10} distance={100} decay={2} color="#ffeaa7" />
        <group scale={4}> {/* Scale it up so it's bigger than the planets */}
          <Sun />
        </group>
        <Stars radius={50} depth={20} count={5000} factor={4} fade />

        <Planet
          id="mercury"
          color="#b8b8b8"
          center={sunPosition}
          orbitRadius={8}
          orbitSpeed={0.4}
        />
        <Planet
          id="venus"
          color="#e0c16c"
          center={sunPosition}
          orbitRadius={10}
          orbitSpeed={0.3}
        />
        <Planet
          id="earth"
          color="#4a90e2"
          center={sunPosition}
          orbitRadius={10 }
          orbitSpeed={0.25}
        />
        <Planet
          id="mars"
          color="#d14b3a"
          center={sunPosition}
          orbitRadius={10}
          orbitSpeed={0.2}
        />
        <Planet
          id="jupiter"
          color="#d9a066"
          center={sunPosition}
          orbitRadius={13}
          orbitSpeed={0.15}
        />
        <Planet
          id="saturn"
          color="#c8b28e"
          center={sunPosition}
          orbitRadius={16}
          orbitSpeed={0.12}
        />
        <Planet
          id="uranus"
          color="#7dd3fc"
          center={sunPosition}
          orbitRadius={19}
          orbitSpeed={0.1}
        />
        <Planet
          id="neptune"
          color="#60a5fa"
          center={sunPosition}
          orbitRadius={22}
          orbitSpeed={0.08}
        />
        </ Suspense>

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
