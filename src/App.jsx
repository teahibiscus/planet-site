import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlanetDetail from "./pages/PlanetDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planet/:id" element={<PlanetDetail />} />
    </Routes>
  );
}
