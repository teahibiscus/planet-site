import { useParams, useNavigate } from "react-router-dom";
import PlanetDetailScene from "../components/PlanetDetailScene";
import { planetData } from "../data/planetData";

export default function PlanetDetail() {
  const { id } = useParams();
  const data = planetData[id];
  if (!data) {
  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">Planet not found</h1>
      <p>Missing or invalid planet data.</p>
    </div>
  );
}


  return (
    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* COLUMN 1: SIDEBAR */}
      <div style={{ padding: '2rem', color: 'white', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{data.name}</h1>
        <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>{data.description}</p>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>Key Facts</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.9 }}>
          {data.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>

      <button 
        onClick={() => navigate(-1)}
        style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10, padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid white', borderRadius: '5px', cursor: 'pointer' }}
      >
        ← Back
      </button>

      {/* COLUMN 2: THE 3D CANVAS */}
      <div style={{ height: '100%', minHeight: 0 }}>
        <PlanetDetailScene planetId={id} />
      </div>

    </div>
  );
}
