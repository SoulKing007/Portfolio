interface Step6ShowcaseProps {
  isVisible?: boolean;
}

export function Step6Showcase({ isVisible = false }: Step6ShowcaseProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">05 / PRODUCTION SHOWCASE</span>
      <h2 className="step-title">3D WEB & INTERACTIVE SAAS</h2>
      <p className="step-body">
        High-performance web applications built using React, Three.js, TypeScript, and modern cloud infrastructures.
      </p>
    </div>
  );
}
