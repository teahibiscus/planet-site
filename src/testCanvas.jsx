import { Canvas } from "@react-three/fiber";

export default function TestCanvas() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}
