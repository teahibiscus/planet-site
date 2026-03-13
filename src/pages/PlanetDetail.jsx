import { useParams } from "react-router-dom";
import PlanetDetailScene from "../components/PlanetDetailScene";
import { planetData } from "../data/planetData";

export default function PlanetDetail() {
  const { id } = useParams();
  const data = planetData[id];

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
      <PlanetDetailScene planetId={id} />

      <div className="p-8 text-white bg-black/40 backdrop-blur">
        <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
        <p className="opacity-80 mb-6">{data.description}</p>

        <h2 className="text-xl font-semibold mb-2">Key Facts</h2>
        <ul className="space-y-2 opacity-90">
          {data.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
