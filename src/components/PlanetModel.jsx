import { useTexture } from "@react-three/drei";

export default function PlanetModel({
  radius = 1.5,
  texture,
  normal,
  roughness,
}) {
  const maps = useTexture({
    map: texture,
    normalMap: normal,
    roughnessMap: roughness,
  });

  return (
    <mesh rotation={[0.4, 0, 0]}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial {...maps} />
    </mesh>
  );
}
