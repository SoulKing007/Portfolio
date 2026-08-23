import { useEffect } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { RefObject } from 'react';

interface CameraTrackerProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  onUpdate: (camPos: [number, number, number], targetPos: [number, number, number]) => void;
}

export function CameraTracker({ controlsRef, onUpdate }: CameraTrackerProps) {
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleUpdate = () => {
      const cp = controls.object.position;
      const tp = controls.target;
      onUpdate(
        [Number(cp.x.toFixed(2)), Number(cp.y.toFixed(2)), Number(cp.z.toFixed(2))],
        [Number(tp.x.toFixed(2)), Number(tp.y.toFixed(2)), Number(tp.z.toFixed(2))]
      );
    };

    controls.addEventListener('end', handleUpdate);
    handleUpdate();

    return () => controls.removeEventListener('end', handleUpdate);
  }, [controlsRef, onUpdate]);

  return null;
}
