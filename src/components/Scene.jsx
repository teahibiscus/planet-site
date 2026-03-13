// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";
// import Planet from "./Planet";

// export default function Scene() {
//   return (
//     <Canvas camera={{ position: [0, 0, 15] }}>
//         <mesh position={[0,0,0]}>
//         <boxGeometry args={[2,2,2]} />
//         <meshStandardMaterial color="hotpink" />
//         </mesh>
        
//       <color attach="background" args={["#020617"]} />
//       <ambientLight intensity={0.5} />
//       <Stars radius={50} depth={20} count={5000} factor={4} fade />

//       <Planet id="mercury" color="#b8b8b8" orbitRadius={4} orbitSpeed={0.4} />
//       <Planet id="venus" color="#e0c16c" orbitRadius={6} orbitSpeed={0.3} />
//       <Planet id="earth" color="#4a90e2" orbitRadius={8} orbitSpeed={0.25} />
//       <Planet id="mars" color="#d14b3a" orbitRadius={10} orbitSpeed={0.2} />
//       <Planet id="jupiter" color="#d9a066" orbitRadius={13} orbitSpeed={0.15} />
//       <Planet id="saturn" color="#c8b28e" orbitRadius={16} orbitSpeed={0.12} />
//       <Planet id="uranus" color="#7dd3fc" orbitRadius={19} orbitSpeed={0.1} />
//       <Planet id="neptune" color="#60a5fa" orbitRadius={22} orbitSpeed={0.08} />

//       <OrbitControls enablePan={false} />
//     </Canvas>
    
//   );
// }
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <ambientLight intensity={1} />
    </Canvas>
  );
}
