import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./Planet";

export default function Scene() {
  const sunPosition = [0, 0, 0];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", top: 20, left: 500, zIndex: 1, color: "#fff", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ margin: 0, fontSize: "3rem" }}>What it would be like on...</h1>
        <p style={{ margin: "20px 0 0", fontSize: "0.9rem", color: "#ccc" }}>Click on a planet to explore</p>
      </div>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 40, 80], fov: 45 }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />

        {/* Sun */}
        <mesh position={sunPosition}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshStandardMaterial emissive="yellow" color="orange" emissiveIntensity={2} />
        </mesh>
        <pointLight position={sunPosition} intensity={3} distance={100} decay={2} color="#ffeaa7" />

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

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
