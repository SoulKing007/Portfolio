interface Step9ContactProps {
  isVisible?: boolean;
}

export function Step9Contact({ isVisible = false }: Step9ContactProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">08 / CONTACT</span>
      <h2 className="step-title">LET'S BUILD TOGETHER</h2>
      <p className="step-body">
        Open for full-stack engineering roles, GenAI pipeline consultations, and enterprise SaaS builds.
      </p>
    </div>
  );
}
