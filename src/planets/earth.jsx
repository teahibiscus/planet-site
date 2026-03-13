// earth.js
import PlanetModel from "../components/Planet";

export default function Earth() {
  return (
    <PlanetModel
      texture="/textures/earth/color.jpg"
      normal="/textures/earth/normal.jpg"
      roughness="/textures/earth/roughness.jpg"
    />
  );
}
