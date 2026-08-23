interface Step1HeroProps {
  isVisible?: boolean;
}

export function Step1Hero({ isVisible = false }: Step1HeroProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <h1 className="step-title">NIRAV THAPA</h1>
      <p className="step-subtitle">AI/ML · FULL-STACK ENGINEER</p>
    </div>
  );
}
