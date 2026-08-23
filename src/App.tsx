import { useState, useCallback, useRef } from 'react';
import { ModelViewer } from './components/ModelViewer';
import { PreloaderOverlay } from './components/PreloaderOverlay';
import { ScrollHint } from './components/ScrollHint';
import { SKETCHFAB_CAMERA_SPECS } from './constants/scene.constants';
import { CHAMBER_WAYPOINTS } from './constants/walkthrough.constants';
import type { CameraCoordsState, ControlMode, NavigationMode } from './types/model.types';
import './styles/global.css';

// Each waypoint gets N scroll-pages worth of travel so the user
// can spend time reading the text at each stop.
const PAGES_PER_WAYPOINT = 3;
const TOTAL_SCROLL_PAGES = CHAMBER_WAYPOINTS.length * PAGES_PER_WAYPOINT;

export function App() {
  const [controlMode] = useState<ControlMode>('orbit');
  const [navigationMode] = useState<NavigationMode>('tour');
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const [hasUserScrolled, setHasUserScrolled] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [, setCameraCoords] = useState<CameraCoordsState>({
    position: SKETCHFAB_CAMERA_SPECS.POSITION,
    target: SKETCHFAB_CAMERA_SPECS.TARGET,
  });

  const handleCameraUpdate = useCallback(
    (position: [number, number, number], target: [number, number, number]) => {
      setCameraCoords({ position, target });
    },
    []
  );

  const handleWaypointChange = useCallback((index: number) => {
    setCurrentWaypointIndex(index);
  }, []);

  const handlePreloaderLoaded = useCallback(() => {
    setIsModelLoaded(true);
  }, []);

  const handleScrollStart = useCallback(() => {
    setHasUserScrolled(true);
  }, []);

  return (
    // Outermost shell — fixed viewport, nothing overflows
    <div className="app-shell">
      {/* Full-Screen Preloader Overlay */}
      <PreloaderOverlay onLoaded={handlePreloaderLoaded} />

      {/* Scroll indicator shown at start; disappears permanently on first scroll */}
      <ScrollHint isVisible={isModelLoaded && !hasUserScrolled} />

      {/* 3D canvas lives behind everything */}
      <ModelViewer
        controlMode={controlMode}
        navigationMode={navigationMode}
        currentWaypointIndex={currentWaypointIndex}
        scrollContainerRef={scrollContainerRef}
        onCameraUpdate={handleCameraUpdate}
        onWaypointChange={handleWaypointChange}
        onScrollStart={handleScrollStart}
      />

      {/* Invisible scroll container — active once preloader unveils */}
      <div
        ref={scrollContainerRef}
        className="scroll-hijack-container"
        onScroll={handleScrollStart}
        style={{ pointerEvents: isModelLoaded ? 'auto' : 'none' }}
        aria-hidden="true"
      >
        {/* Tall spacer: each waypoint gets PAGES_PER_WAYPOINT vh of travel */}
        <div
          style={{ height: `${TOTAL_SCROLL_PAGES * 100}vh`, width: '1px' }}
        />
      </div>
    </div>
  );
}

export default App;

