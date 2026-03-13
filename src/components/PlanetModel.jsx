import { useTexture } from "@react-three/drei";

export default function PlanetModel({
  radius = 1.5,
  texture,
}) {
  if (!texture) {
    return (
      <mesh rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  const maps = useTexture({
    map: texture,
  });

  return (
    <mesh rotation={[0.4, 0, 0]}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial {...maps} />
    </mesh>
  );
}
