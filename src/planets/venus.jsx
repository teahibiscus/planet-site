// src/planets/venus.jsx
import PlanetModel from "../components/PlanetModel";

export default function Venus() {
  return (
    <PlanetModel
      texture="/textures/venus/color.jpg"
      normal="/textures/venus/normal.jpg"
      roughness="/textures/venus/roughness.jpg"
      radius={1.5}
    />
  );
}
