import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function PlanetGLTF({ path, scale = 1.5 }) {
  const gltf = useGLTF(path);
  console.log("GLTF for", path, gltf);
  console.log("Scene children:", gltf.scene.children);

  useEffect(() => {
    if (gltf.scene) {
      // Center the scene
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);

      // Optional: Scale to fit
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const fitScale = 3 / maxDim; // Fit to ~2 units
        gltf.scene.scale.multiplyScalar(fitScale);
      }
    }
  }, [gltf.scene]);

  if (!gltf.scene) {
    console.warn("GLB scene not loaded for path:", path);
    return (
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return <primitive object={gltf.scene} scale={scale} position={[0,0,0]} />;
}
