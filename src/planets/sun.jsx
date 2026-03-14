// src/planets/sun.jsx
import PlanetGLTF from "../components/PlanetGLTF";

export default function Sun() {
  return <PlanetGLTF 
      path="/models/sun.glb" 
      scale={2}      // Bigger than planets
      isSun={true}   // Triggers the glow logic
    />
}
