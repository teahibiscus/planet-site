import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useProgress } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "../planets/sun";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function PerspectiveZoom() {
  useFrame((state) => {
    // Y=15 is high enough for a top-down feel
    // Z=20 gives it enough depth to see the planet spheres properly
    state.camera.position.lerp(new THREE.Vector3(0, 15, 40), 0.15);
    
    // Looking at (0, 0, 3) tilts the "neck" of the camera up slightly
    state.camera.lookAt(0, 0, 3);
  });
  return null;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const planets = ["Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
  
  return (
    <div style={{
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100, // Ensure it's above the Canvas
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      background: 'rgba(2, 6, 23, 0.6)',
      padding: '15px',
      borderRadius: '12px',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontFamily: "Atma, system-ui, sans-serif"
    }}>
      <p style={{ color: '#f0fa60', fontSize: '0.8rem', marginBottom: '5px', letterSpacing: '1px' }}>NAVIGATION</p>
      
      {planets.map(name => (
        <button 
          key={name}
          // Navigate to the dynamic route (e.g., /planet/mars)
          onClick={() => navigate(`/planet/${name.toLowerCase()}`)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '5px 0',
            opacity: 0.7,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = 1;
            e.target.style.transform = 'translateX(5px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = 0.7;
            e.target.style.transform = 'translateX(0)';
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};



export default function Scene() {
  const sunPosition = [0, 0, 0];
  const { active, progress } = useProgress();
  // 'active' is true while loading, false when finished
  const isLoaded = !active && progress === 100;
  const [selectedPlanet, setSelectedPlanet] = useState('sun');

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
      backdropFilter: 'blur(8px)',
      background: 'rgba(2, 6, 23, 0.6)',
      padding: '20px 40px',
      borderRadius: '12px',

      }}>
        <h1 style={{ margin: 0, fontSize: "3rem", textShadow: '0 0 20px rgba(255,255,255,0.3)', fontFamily: "'Kirang Haerang', system-ui, sans-serif" }}>
          What it would be like on...
        </h1>
        <p style={{ color: "#bebaba" }}>Click on a planet or the navigation to explore</p>
      </div>

      <Sidebar />
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
          orbitRadius={5}
          orbitSpeed={0.4}
        />
        <Planet
          id="venus"
          color="#e0c16c"
          center={sunPosition}
          orbitRadius={7}
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
          orbitRadius={15}
          orbitSpeed={0.2}
        />
        <Planet
          id="jupiter"
          color="#d9a066"
          center={sunPosition}
          orbitRadius={40}
          orbitSpeed={0.15}
        />
        <Planet
          id="saturn"
          color="#c8b28e"
          center={sunPosition}
          orbitRadius={65}
          orbitSpeed={0.12}
        />
        <Planet
          id="uranus"
          color="#7dd3fc"
          center={sunPosition}
          orbitRadius={80}
          orbitSpeed={0.1}
        />
        <Planet
          id="neptune"
          color="#60a5fa"
          center={sunPosition}
          orbitRadius={100}
          orbitSpeed={0.08}
        />
        </ Suspense>

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
