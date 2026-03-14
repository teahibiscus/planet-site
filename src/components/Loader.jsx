// src/components/Loader.jsx
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <p>EXPLORING SPACE...</p>
        <div style={{ width: '150px', height: '2px', background: '#333' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: 'yellow',
            transition: 'width 0.2s'
          }} />
        </div>
        <span>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}