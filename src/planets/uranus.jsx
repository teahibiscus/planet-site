// src/planets/uranus.jsx
import PlanetModel from "../components/PlanetModel";

export default function Uranus() {
  return (
    <PlanetModel
      texture="/textures/uranus/color.jpg"
      normal="/textures/uranus/normal.jpg"
      roughness="/textures/uranus/roughness.jpg"
      radius={1.7}
    />
  );
}
