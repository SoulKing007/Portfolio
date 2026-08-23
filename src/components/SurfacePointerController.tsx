import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { RefObject } from 'react';

interface SurfacePointerControllerProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  onUpdate: (pos: [number, number, number], target: [number, number, number]) => void;
}

export function SurfacePointerController({
  controlsRef,
  onUpdate,
}: SurfacePointerControllerProps) {
  const { camera, scene, raycaster, pointer, gl } = useThree();
  const [targetPoint, setTargetPoint] = useState<THREE.Vector3 | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleDoubleClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length === 0) return;

      const hitPoint = intersects[0].point;
      setTargetPoint(hitPoint.clone());

      if (controlsRef.current) {
        controlsRef.current.target.copy(hitPoint);
        controlsRef.current.update();
      }

      const cp = camera.position;
      onUpdate(
        [Number(cp.x.toFixed(2)), Number(cp.y.toFixed(2)), Number(cp.z.toFixed(2))],
        [Number(hitPoint.x.toFixed(2)), Number(hitPoint.y.toFixed(2)), Number(hitPoint.z.toFixed(2))]
      );

      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = setTimeout(() => setTargetPoint(null), 3000);
    };

    const domElement = gl.domElement;
    domElement.addEventListener('dblclick', handleDoubleClick);
    return () => {
      domElement.removeEventListener('dblclick', handleDoubleClick);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [camera, scene, raycaster, pointer, gl, controlsRef, onUpdate]);

  if (!targetPoint) return null;

  return (
    <mesh position={targetPoint}>
      <sphereGeometry args={[8, 16, 16]} />
      <meshBasicMaterial color="#00f2fe" wireframe transparent opacity={0.8} />
    </mesh>
  );
}
