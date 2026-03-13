import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export default function PlanetGLTF({ path, scale = 1, hovered }) {
  const { scene } = useGLTF(path);

  // Use useMemo to handle the heavy lifting of cloning and centering
  const processedScene = useMemo(() => {
    if (!scene) return null;
    const clone = scene.clone();

    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Reset local position so the center of the mesh is at [0,0,0]
    clone.position.set(-center.x, -center.y, -center.z);

    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizationFactor = maxDim > 0 ? 2.5 / maxDim : 1;
    
    // We create a wrapper group to hold the centered/scaled clone
    const wrapper = new THREE.Group();
    clone.scale.setScalar(normalizationFactor);
    wrapper.add(clone);
    
    return wrapper;
  }, [scene]);

  const finalScale = hovered ? scale * 1.2 : scale;

  useEffect(() => {
    if (!processedScene) return;
    processedScene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive.set(hovered ? 0xffffff : 0x000000);
        child.material.emissiveIntensity = hovered ? 0.6 : 0;
      }
    });
  }, [processedScene, hovered]);

  if (!processedScene) return null;

  // Use the scale prop on the wrapper
  return <primitive object={processedScene} scale={scale} />;
}