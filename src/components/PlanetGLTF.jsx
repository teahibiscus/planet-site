import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export default function PlanetGLTF({ path, scale = 1, hovered }) {
  const { scene } = useGLTF(path);

  const processedScene = useMemo(() => {
    if (!scene) return null;
    const clone = scene.clone();

    // 1. Unique materials for independent hover effects
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });

    // 2. Measure and Center
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const modelSize = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(modelSize);

    // Pivot correction: ensure it rotates around its center
    clone.position.set(-center.x, -center.y, -center.z);

    // 3. Normalize to 1 unit base
    const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
    const normalizationFactor = maxDim > 0 ? 1 / maxDim : 1;
    
    const wrapper = new THREE.Group();
    clone.scale.setScalar(normalizationFactor);
    wrapper.add(clone);
    
    return wrapper;
  }, [scene]);

  // Apply the 'scale' prop passed from the Planet component
  // We also add a slight boost on hover for visual feedback
  const finalDisplayScale = hovered ? scale * 1.15 : scale;

  useEffect(() => {
    if (!processedScene) return;
    processedScene.traverse((child) => {
      if (child.isMesh) {
        // Subtle glow when not hovered, bright glow when hovered
        child.material.emissive.set(hovered ? 0xffffff : 0x444444);
        child.material.emissiveIntensity = hovered ? 0.8 : 0.2;
      }
    });
  }, [processedScene, hovered]);

  if (!processedScene) return null;

  return <primitive object={processedScene} scale={finalDisplayScale} />;
}