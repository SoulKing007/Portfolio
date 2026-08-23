import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import type { PreloaderOverlayProps } from '../types/model.types';

const COMPLETION_HOLD_MS = 400;
const FADE_OUT_DURATION_MS = 700;

export function PreloaderOverlay({ onLoaded }: PreloaderOverlayProps) {
  const { progress, loaded, total, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isFullyUnmounted, setIsFullyUnmounted] = useState<boolean>(false);

  useEffect(() => {
    setDisplayProgress((prev) => Math.max(prev, Math.round(progress)));
  }, [progress]);

  useEffect(() => {
    const isComplete = progress >= 100 || (!active && loaded > 0 && loaded >= total);

    if (!isComplete) return;

    const holdTimer = setTimeout(() => {
      setIsFadingOut(true);

      const fadeTimer = setTimeout(() => {
        setIsFullyUnmounted(true);
        onLoaded?.();
      }, FADE_OUT_DURATION_MS);

      return () => clearTimeout(fadeTimer);
    }, COMPLETION_HOLD_MS);

    return () => clearTimeout(holdTimer);
  }, [progress, active, loaded, total, onLoaded]);

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
