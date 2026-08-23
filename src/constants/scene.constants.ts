export const MODEL_PATH = '/models/egypt_chamber_for_ar__vr_games.glb';

export const CANVAS_CAMERA_FOV = 55;

export const SKETCHFAB_CAMERA_SPECS = {
  POSITION: [-2471.85, 910.54, 3021.84] as [number, number, number],
  TARGET: [-2483.34, 882.28, 2570.60] as [number, number, number],
} as const;

export const LIGHTING_PRESETS = {
  AMBIENT_COLOR: '#ffeedd',
  TORCH_WARM: '#ff9933',
  BACKGROUND_COLOR: '#080706',
} as const;

export const CONTROLS_CONFIG = {
  ROTATE_SPEED: 0.7,
  PAN_SPEED: 1.0,
  ZOOM_SPEED: 1.5,
  DAMPING_FACTOR: 0.08,
  MIN_DISTANCE: 0.1,
  MAX_DISTANCE: 10000,
} as const;
