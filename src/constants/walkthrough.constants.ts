import * as THREE from 'three';

export interface Waypoint {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  target: [number, number, number];
}

export const CHAMBER_WAYPOINTS: Waypoint[] = [
  {
    id: 0,
    title: 'Outer Courtyard',
    subtitle: 'Approach to Tomb',
    description: 'Approaching the exterior courtyard leading into the monumental tomb.',
    position: [-2471.85, 910.54, 3021.84],
    target: [-2483.34, 882.28, 2570.60],
  },
  {
    id: 1,
    title: 'Grand Entrance Portal',
    subtitle: 'Chamber Entrance',
    description: 'Stepping inside the stone portal looking straight down the main corridor.',
    position: [-2471.85, 910.54, 1452.02],
    target: [-2471.85, 910.54, -1565.46],
  },
  {
    id: 2,
    title: 'Main Corridor End',
    subtitle: 'Central Hall Deep Focus',
    description: 'Walking straight down the central hall carved into bedrock.',
    position: [-2471.85, 910.54, -1565.46],
    target: [-3532.47, 910.54, -1693.75],
  },
  {
    id: 3,
    title: 'West Wing Hieroglyphs',
    subtitle: 'Left Sanctuary',
    description: 'Inspecting sacred hieroglyphic carvings on the western wall.',
    position: [-3532.47, 910.54, -1693.75],
    target: [-4519.56, 833.58, -1778.64],
  },
  {
    id: 4,
    title: 'East Relic Alcove',
    subtitle: 'Right Sanctuary',
    description: 'Crossing into the eastern alcove to observe ceremonial artifacts.',
    position: [-1432.27, 910.54, -1707.17],
    target: [-711.98, 818.90, -1645.62],
  },
  {
    id: 5,
    title: 'Shrine Turnaround',
    subtitle: 'Inner Chamber Pivot',
    description: 'Pivoting around the deep inner shrine to align for the return journey.',
    position: [-1490.15, 910.54, -1593.39],
    target: [-1383.14, 948.59, -1006.18],
  },
  {
    id: 6,
    title: 'East Corridor Return',
    subtitle: 'Forward Walk',
    description: 'Walking forward along the eastern hall toward the entrance.',
    position: [-1496.04, 910.54, 918.42],
    target: [-1529.10, 884.44, 2468.45],
  },
  {
    id: 7,
    title: 'Central Hall Rejoin',
    subtitle: 'Portal Return',
    description: 'Rejoining the central foyer near the grand entrance door.',
    position: [-2327.25, 910.54, 1462.84],
    target: [-3228.37, 888.38, 1647.58],
  },
  {
    id: 8,
    title: '360° Walk Complete',
    subtitle: 'Entrance Doorway',
    description: 'Completing the full 360° circular walkthrough tour at the entrance portal.',
    position: [-2486.27, 910.54, 1487.97],
    target: [-2642.57, 955.86, 716.04],
  },
];

const posVectors = CHAMBER_WAYPOINTS.map(
  (wp) => new THREE.Vector3(wp.position[0], wp.position[1], wp.position[2])
);
const targetVectors = CHAMBER_WAYPOINTS.map(
  (wp) => new THREE.Vector3(wp.target[0], wp.target[1], wp.target[2])
);

export const CAMERA_POSITION_CURVE = new THREE.CatmullRomCurve3(posVectors, false, 'catmullrom', 0.5);
export const CAMERA_TARGET_CURVE = new THREE.CatmullRomCurve3(targetVectors, false, 'catmullrom', 0.5);
