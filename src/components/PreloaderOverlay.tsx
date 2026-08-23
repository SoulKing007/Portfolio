import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import type { PreloaderOverlayProps } from '../types/model.types';
import { modelProgressStore } from '../utils/modelProgress';

const COMPLETION_HOLD_MS = 400;
const FADE_OUT_DURATION_MS = 700;

export function PreloaderOverlay({ onLoaded }: PreloaderOverlayProps) {
  const { progress: dreiProgress, loaded, total, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [isStoreComplete, setIsStoreComplete] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isFullyUnmounted, setIsFullyUnmounted] = useState<boolean>(false);

  // Subscribe to real-time GLTF byte progress
  useEffect(() => {
    const unsubscribe = modelProgressStore.subscribe((byteProgress, isComplete) => {
      setDisplayProgress((prev) => Math.max(prev, byteProgress));
      if (isComplete) {
        setIsStoreComplete(true);
      }
    });
    return unsubscribe;
  }, []);

  // Also sync with Drei's useProgress as a secondary source
  useEffect(() => {
    if (dreiProgress > 0) {
      setDisplayProgress((prev) => Math.max(prev, Math.round(dreiProgress)));
    }
  }, [dreiProgress]);

  // Handle completion sequence when byte progress or Drei progress reaches 100%
  useEffect(() => {
    const isDreiComplete = dreiProgress >= 100 || (!active && loaded > 0 && loaded >= total);
    const isComplete = isStoreComplete || isDreiComplete;

    if (!isComplete) return;

    setDisplayProgress(100);

    const holdTimer = setTimeout(() => {
      setIsFadingOut(true);

      const fadeTimer = setTimeout(() => {
        setIsFullyUnmounted(true);
        onLoaded?.();
      }, FADE_OUT_DURATION_MS);

      return () => clearTimeout(fadeTimer);
    }, COMPLETION_HOLD_MS);

    return () => clearTimeout(holdTimer);
  }, [isStoreComplete, dreiProgress, active, loaded, total, onLoaded]);

  if (isFullyUnmounted) return null;

  return (
    <div
      className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}
      aria-live="polite"
      aria-label="Loading model"
    >
      <div className="preloader-content">
        <div className="preloader-percentage-display">
          {String(displayProgress).padStart(2, '0')}
          <span className="preloader-percent-symbol">%</span>
        </div>

        <div className="preloader-bar-container">
          <div
            className="preloader-bar-fill"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <div className="preloader-status">
          {displayProgress < 100 ? 'LOADING' : 'READY'}
        </div>
      </div>
    </div>
  );
}
