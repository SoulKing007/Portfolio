interface Step5MeetingsProps {
  isVisible?: boolean;
}

export function Step5Meetings({ isVisible = false }: Step5MeetingsProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">04 / SYSTEM ARCHITECTURE</span>
      <h2 className="step-title">AUTONOMOUS AGENT PIPELINES</h2>
      <p className="step-body">
        Translating complex business requirements into high-throughput, fault-tolerant AI agent architectures.
      </p>
    </div>
  );
}
