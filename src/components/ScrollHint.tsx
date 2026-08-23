import { ChevronDown } from 'lucide-react';

interface ScrollHintProps {
  isVisible: boolean;
}

export function ScrollHint({ isVisible }: ScrollHintProps) {
  return (
    <div
      className={`scroll-hint-container ${isVisible ? 'visible' : ''}`}
      aria-hidden={!isVisible}
    >
      <div className="scroll-hint-pill">
        <span className="scroll-hint-text">SCROLL FOR MOVING FORWARD</span>
        <ChevronDown size={18} className="scroll-hint-arrow" />
      </div>
    </div>
  );
}
