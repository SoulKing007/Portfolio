interface Step4SowProps {
  isVisible?: boolean;
}

export function Step4Sow({ isVisible = false }: Step4SowProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">03 / STATEMENT OF WORK</span>
      <h2 className="step-title">REF: SOW-2026-98B</h2>
      <p className="step-subtitle">ENTERPRISE LLM & WORKFLOW AUTOMATION</p>
      <p className="step-body">
        Prepared for Horizon Digital Systems Ltd · Discovery, Architectural Schema & Agentic Workflows
      </p>
    </div>
  );
}
