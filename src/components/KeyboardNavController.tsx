import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { RefObject } from 'react';

interface KeyboardNavControllerProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  onUpdate: (pos: [number, number, number], target: [number, number, number]) => void;
  speed?: number;
}

export function KeyboardNavController({
  controlsRef,
  onUpdate,
  speed = 1.2,
}: KeyboardNavControllerProps) {
  const keysPressed = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    const keys = keysPressed.current;
    const isShiftPressed = keys['Shift'];
    const currentSpeed = isShiftPressed ? speed * 2.5 : speed;

    if (
      !keys['ArrowUp'] &&
      !keys['ArrowDown'] &&
      !keys['ArrowLeft'] &&
      !keys['ArrowRight'] &&
      !keys['w'] &&
      !keys['s'] &&
      !keys['a'] &&
      !keys['d']
    ) {
      return;
    }

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    const moveVector = new THREE.Vector3();

    if (keys['ArrowUp'] || keys['w']) moveVector.addScaledVector(forward, currentSpeed);
    if (keys['ArrowDown'] || keys['s']) moveVector.addScaledVector(forward, -currentSpeed);
    if (keys['ArrowRight'] || keys['d']) moveVector.addScaledVector(right, currentSpeed);
    if (keys['ArrowLeft'] || keys['a']) moveVector.addScaledVector(right, -currentSpeed);

    camera.position.add(moveVector);

    if (controlsRef.current) {
      controlsRef.current.target.add(moveVector);
      controlsRef.current.update();
    }

    const cp = camera.position;
    const tp = controlsRef.current ? controlsRef.current.target : new THREE.Vector3();

    onUpdate(
      [Number(cp.x.toFixed(2)), Number(cp.y.toFixed(2)), Number(cp.z.toFixed(2))],
      [Number(tp.x.toFixed(2)), Number(tp.y.toFixed(2)), Number(tp.z.toFixed(2))]
    );
  });

  return null;
}
