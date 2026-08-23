import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ChamberModel } from './ChamberModel';
import { CanvasLoader } from './CanvasLoader';
import { KeyboardNavController } from './KeyboardNavController';
import { SurfacePointerController } from './SurfacePointerController';
import { ScrollCameraController } from './ScrollCameraController';
import { WorldSpaceAnnotations } from './WorldSpaceAnnotations';
import {
  CANVAS_CAMERA_FOV,
  SKETCHFAB_CAMERA_SPECS,
  LIGHTING_PRESETS,
  CONTROLS_CONFIG,
} from '../constants/scene.constants';
import type { ModelViewerProps } from '../types/model.types';

export function ModelViewer({
  controlMode,
  navigationMode,
  currentWaypointIndex,
  scrollContainerRef,
  onCameraUpdate,
  onWaypointChange,
  onScrollStart,
}: ModelViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isTour = navigationMode === 'tour';

  const leftButtonAction = controlMode === 'orbit' ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN;
  const rightButtonAction = controlMode === 'orbit' ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;

  return (
    <div className="canvas-wrapper">
      <Canvas
        camera={{
          position: SKETCHFAB_CAMERA_SPECS.POSITION,
          fov: CANVAS_CAMERA_FOV,
          near: 0.1,
          far: 5000,
        }}
        gl={{ antialias: true, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={[LIGHTING_PRESETS.BACKGROUND_COLOR]} />

        <ambientLight intensity={2.0} color={LIGHTING_PRESETS.AMBIENT_COLOR} />
        <hemisphereLight args={['#ffeedd', '#332211', 2.0]} />

        <pointLight
          position={[360, -150, 50]}
          intensity={6.0}
          distance={1200}
          color={LIGHTING_PRESETS.TORCH_WARM}
        />
        <pointLight
          position={[360, -180, -600]}
          intensity={4.0}
          distance={1000}
          color="#ffcc77"
        />

        <directionalLight
          position={[360, 400, -200]}
          intensity={2.5}
          color="#ffe8d0"
        />

        <Suspense fallback={<CanvasLoader />}>
          <ChamberModel />
        </Suspense>

        <WorldSpaceAnnotations currentWaypointIndex={currentWaypointIndex} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          target={SKETCHFAB_CAMERA_SPECS.TARGET}
          enableZoom={!isTour}
          enableRotate={!isTour}
          enablePan={!isTour}
          zoomSpeed={CONTROLS_CONFIG.ZOOM_SPEED}
          rotateSpeed={CONTROLS_CONFIG.ROTATE_SPEED}
          panSpeed={CONTROLS_CONFIG.PAN_SPEED}
          enableDamping={true}
          dampingFactor={CONTROLS_CONFIG.DAMPING_FACTOR}
          minDistance={CONTROLS_CONFIG.MIN_DISTANCE}
          maxDistance={CONTROLS_CONFIG.MAX_DISTANCE}
          mouseButtons={{
            LEFT: leftButtonAction,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: rightButtonAction,
          }}
        />

        {isTour ? (
          <ScrollCameraController
            controlsRef={controlsRef}
            scrollContainerRef={scrollContainerRef}
            currentWaypointIndex={currentWaypointIndex}
            onWaypointChange={onWaypointChange}
            onUpdate={onCameraUpdate}
            onScrollStart={onScrollStart}
          />
        ) : (
          <>
            <KeyboardNavController controlsRef={controlsRef} onUpdate={onCameraUpdate} speed={2.5} />
            <SurfacePointerController controlsRef={controlsRef} onUpdate={onCameraUpdate} />
          </>
        )}
      </Canvas>
    </div>
  );
}
