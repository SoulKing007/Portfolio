import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { RefObject } from 'react';
import {
  CHAMBER_WAYPOINTS,
  CAMERA_POSITION_CURVE,
  CAMERA_TARGET_CURVE,
} from '../constants/walkthrough.constants';

interface ScrollCameraControllerProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  currentWaypointIndex: number;
  onWaypointChange: (index: number) => void;
  onUpdate: (pos: [number, number, number], target: [number, number, number]) => void;
  onScrollStart?: () => void;
}

export function ScrollCameraController({
  controlsRef,
  scrollContainerRef,
  currentWaypointIndex,
  onWaypointChange,
  onUpdate,
  onScrollStart,
}: ScrollCameraControllerProps) {
  const { camera } = useThree();
  const totalWaypoints = CHAMBER_WAYPOINTS.length;

  const currentProgress = useRef<number>(0);
  const activeStep = useRef<number>(currentWaypointIndex);
  const hasNotifiedScrollStart = useRef<boolean>(false);

  // Keep currentWaypointIndex in sync if controlled externally
  useEffect(() => {
    // intentionally not overwriting scroll progress here —
    // the scroll container scroll position is the single source of truth
  }, [currentWaypointIndex]);

  // Notify scroll start on first scroll event
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!hasNotifiedScrollStart.current && onScrollStart) {
        hasNotifiedScrollStart.current = true;
        onScrollStart();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, onScrollStart]);

  useFrame(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // scrollable height = totalHeight - viewportHeight
    const scrollableHeight = container.scrollHeight - container.clientHeight;
    const rawProgress = scrollableHeight > 0
      ? container.scrollTop / scrollableHeight
      : 0;

    // Smooth lerp toward native scroll position
    const LERP_SPEED = 0.09;
    const diff = rawProgress - currentProgress.current;
    currentProgress.current += diff * LERP_SPEED;

    const clampedProgress = Math.min(1.0, Math.max(0.0, currentProgress.current));
    const curvePos = CAMERA_POSITION_CURVE.getPoint(clampedProgress);
    const curveTarget = CAMERA_TARGET_CURVE.getPoint(clampedProgress);

    const isMoving = Math.abs(diff) > 0.0001;
    const headBob = isMoving ? Math.sin(clampedProgress * Math.PI * 28) * 1.8 : 0;

    camera.position.set(curvePos.x, curvePos.y + headBob, curvePos.z);
    camera.up.set(0, 1, 0);

    if (controlsRef.current) {
      controlsRef.current.target.copy(curveTarget);
      controlsRef.current.update();
    }

    const calculatedStep = Math.round(clampedProgress * (totalWaypoints - 1));
    if (calculatedStep !== activeStep.current) {
      activeStep.current = calculatedStep;
      onWaypointChange(calculatedStep);
    }

    const cp = camera.position;
    const tp = curveTarget;
    onUpdate(
      [Number(cp.x.toFixed(2)), Number(cp.y.toFixed(2)), Number(cp.z.toFixed(2))],
      [Number(tp.x.toFixed(2)), Number(tp.y.toFixed(2)), Number(tp.z.toFixed(2))]
    );
  });

  return null;
}
