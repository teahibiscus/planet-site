import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Text, useGLTF } from "@react-three/drei";
import { Suspense, useState, useRef, useMemo } from "react";
import { planetModels } from "../planets";
import PlanetGLTF from "./PlanetGLTF";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { planetData } from "../data/planetData";
import Loader from "./Loader";
import PlanetParticles from "./PlanetParticles";

function PerspectiveZoom({ targetZ, onFinished, controlsRef }) {
  const target = useMemo(() => new THREE.Vector3(0, 0, targetZ), [targetZ]);
  const [active, setActive] = useState(true);

  useFrame((state) => {
    if (!active) return;

    const distance = state.camera.position.distanceTo(target);
    
    if (distance > 0.05) { // Tightened the threshold
      state.camera.position.lerp(target, 0.05);
      state.camera.lookAt(0, 0, 0);
    } else {
      // 1. Hard-set final position to avoid the "floaty" lerp tail
      state.camera.position.copy(target);
      state.camera.lookAt(0, 0, 0);
      
      // 2. CRITICAL: Update OrbitControls so it doesn't "jump"
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      setActive(false);
      if (onFinished) onFinished();
    }
  });
  return null;
}

function FloatingText({ planetName, DETAIL_SCALE, hovered }) {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      // Radius + slight offset + sin wave
      const baseHeight = DETAIL_SCALE / 2 - 0.5;
      const bob = Math.sin(state.clock.elapsedTime * 2) * 0.03;
      textRef.current.position.y = baseHeight + bob;
    }
  });

  return (
    <Billboard ref={textRef} follow={true}>
      <Text
        fontSize={0.16}
        color={hovered ? "#60a5fa" : "white"}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#000000"
        font="/fonts/Quantico-Regular.ttf"
      >
        {`Now can we live on ${planetName}?`}
      </Text>
    </Billboard>
  );
}

export default function PlanetDetailScene({ planetId }) {
  const planetModelData = planetModels[planetId];
  const planetName = planetData[planetId]?.name || "Unknown Planet";
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const DETAIL_SCALE = 4;

  const controlsRef = useRef();
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <PerspectiveZoom targetZ={3} onFinished={() => setIsZoomed(true)} controlsRef={controlsRef}/>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={50} depth={20} count={5000} factor={4} fade />

      <Suspense fallback={<Loader />}>
        <group 
          onPointerOver={() => {
            setHovered(true);
            // Change the cursor to a pointer when hovering
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            // Reset the cursor
            document.body.style.cursor = 'default';
          }}
          // 4. Click leads to the additional info page
          onClick={() => navigate(`/life-on-planet/${planetId}`)}
        >
          <FloatingText 
            planetName={planetName} 
            DETAIL_SCALE={DETAIL_SCALE} 
            hovered={hovered} 
          />
          {planetModelData.type === 'texture' && planetModelData.component && <planetModelData.component />}
        {planetModelData.type === 'gltf' && planetModelData.path && <PlanetGLTF path={planetModelData.path} scale={DETAIL_SCALE}/>}
          
          {hovered && <PlanetParticles position={[0, 0, 0]} color='white' planetId={planetId} />} {/* Optional: Add some particle effects on hover */}
        </group>

        
      </Suspense>

      <OrbitControls 
      ref={controlsRef}
      enabled={isZoomed}
      enablePan={false} 
        minDistance={2}   // Closest they can get
        maxDistance={10}  // Furthest they can go
        autoRotate={isZoomed}         // Enables the spin
        autoRotateSpeed={0.5}     // Adjust this for "very slow" (default is 2.0)
      />
    </Canvas>
  );
}
