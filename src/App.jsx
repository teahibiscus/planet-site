import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlanetDetail from "./pages/PlanetDetail";
import LifeOnPlanet from "./pages/LifeOnPlanet";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planet/:id" element={<PlanetDetail />} />
      <Route path="/life-on-planet/:id" element={<LifeOnPlanet />} />
    </Routes>
  );
}
