interface Step7ExperienceProps {
  isVisible?: boolean;
}

export function Step7Experience({ isVisible = false }: Step7ExperienceProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">06 / ENGINEERING EXPERIENCE</span>
      <h2 className="step-title">FULL-STACK & AI SYSTEMS</h2>
      <p className="step-body">
        End-to-end background delivering scalable web applications, custom GenAI integrations, and optimized real-time visuals.
      </p>
    </div>
  );
}
