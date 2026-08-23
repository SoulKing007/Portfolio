interface Step2ThesisProps {
  isVisible?: boolean;
}

export function Step2Thesis({ isVisible = false }: Step2ThesisProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">01 / THE THESIS</span>
      <h2 className="step-title">COMPLEX SYSTEMS. CLEAR OUTCOMES.</h2>
      <p className="step-subtitle">GenAI · Automation · SaaS</p>
      <p className="step-body">
        AI/ML and full-stack engineering, brought together to solve real operational problems—not just build impressive demos.
      </p>
    </div>
  );
}
