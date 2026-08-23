import {
  Step1Hero,
  Step2Thesis,
  Step3Systems,
  Step4Sow,
  Step5Meetings,
  Step6Showcase,
  Step7Experience,
  Step8Toolkit,
  Step9Contact,
} from './sections';

interface ScreenSpaceOverlayProps {
  currentWaypointIndex: number;
  hasStartedScrolling: boolean;
}

export function ScreenSpaceOverlay({
  currentWaypointIndex,
  hasStartedScrolling,
}: ScreenSpaceOverlayProps) {
  return (
    <div className="screen-space-overlay">
      <Step1Hero isVisible={currentWaypointIndex === 0 && hasStartedScrolling} />
      <Step2Thesis isVisible={currentWaypointIndex === 1} />
      <Step3Systems isVisible={currentWaypointIndex === 2} />
      <Step4Sow isVisible={currentWaypointIndex === 3} />
      <Step5Meetings isVisible={currentWaypointIndex === 4} />
      <Step6Showcase isVisible={currentWaypointIndex === 5} />
      <Step7Experience isVisible={currentWaypointIndex === 6} />
      <Step8Toolkit isVisible={currentWaypointIndex === 7} />
      <Step9Contact isVisible={currentWaypointIndex === 8} />
    </div>
  );
}
