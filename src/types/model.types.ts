import type { RefObject } from 'react';

export type ControlMode = 'orbit' | 'pan';
export type NavigationMode = 'tour' | 'freeRoam';

export interface CameraCoordsState {
  position: [number, number, number];
  target: [number, number, number];
}

export interface HeaderUIProps {
  cameraCoords: CameraCoordsState;
  controlMode: ControlMode;
  navigationMode: NavigationMode;
  onToggleControlMode: () => void;
  onToggleNavigationMode: () => void;
}

export interface ModelViewerProps {
  controlMode: ControlMode;
  navigationMode: NavigationMode;
  currentWaypointIndex: number;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  onCameraUpdate: (pos: [number, number, number], target: [number, number, number]) => void;
  onWaypointChange: (index: number) => void;
  onScrollStart?: () => void;
}

export interface TourHUDProps {
  currentWaypointIndex: number;
  totalWaypoints: number;
  onSelectWaypoint: (index: number) => void;
}

export interface PreloaderOverlayProps {
  onLoaded?: () => void;
}

