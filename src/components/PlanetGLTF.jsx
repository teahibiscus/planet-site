import { useGLTF } from "@react-three/drei";

export default function PlanetGLTF({ path, scale = 1.5 }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} />;
}
