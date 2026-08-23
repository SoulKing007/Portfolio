import { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATH } from '../constants/scene.constants';
import { configureGLTFLoaderProgress } from '../utils/modelProgress';

export function ChamberModel() {
  const { scene } = useGLTF(
    MODEL_PATH,
    undefined,
    undefined,
    configureGLTFLoaderProgress
  );

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (
        child.name.toLowerCase().includes('statue') ||
        child.name.toLowerCase().includes('head') ||
        child.name.toLowerCase().includes('bust') ||
        child.name.toLowerCase().includes('pedestal')
      ) {
        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);
        console.log('🗿 Found Statue/Target Mesh:', child.name, 'Position:', worldPos);
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload(
  MODEL_PATH,
  undefined,
  undefined,
  configureGLTFLoaderProgress
);

