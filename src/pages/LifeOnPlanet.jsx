import PlanetLife from "../components/PlanetLife";
import { useParams, useNavigate } from "react-router-dom";
import { planetData } from "../data/planetData";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function LifeOnPlanet() {
  const { id } = useParams();
  const data = planetData[id];
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="text-white p-10">
        Planet data not found.
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#020617' }}>
      {/* Back Button Overlay */}
      <button 
        onClick={() => navigate(-1)}
        style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10, padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid white', borderRadius: '5px', cursor: 'pointer' }}
      >
        ← Back
      </button>

      {/* The 3D World */}
      <PlanetLife planetId={id} />
    </div>
  );
} 