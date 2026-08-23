interface Step3SystemsProps {
  isVisible?: boolean;
}

export function Step3Systems({ isVisible = false }: Step3SystemsProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">02 / SELECTED SYSTEMS</span>
      <h2 className="step-title">FOUR BUILDS. ENGINEERED FOR IMPACT.</h2>
      <p className="step-body">
        Each project is a production system—not a demo. Real clients, real workflows, real outcomes.
      </p>
    </div>
  );
}
