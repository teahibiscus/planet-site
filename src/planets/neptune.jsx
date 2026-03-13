// src/planets/neptune.jsx
import PlanetModel from "../components/PlanetModel";

export default function Neptune() {
  return (
    <PlanetModel
      texture="/textures/neptune/color.jpg"
      normal="/textures/neptune/normal.jpg"
      roughness="/textures/neptune/roughness.jpg"
      radius={1.7}
    />
  );
}
