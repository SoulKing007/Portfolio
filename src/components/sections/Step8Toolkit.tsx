interface Step8ToolkitProps {
  isVisible?: boolean;
}

export function Step8Toolkit({ isVisible = false }: Step8ToolkitProps) {
  return (
    <div className={`step-text-overlay ${isVisible ? 'visible' : ''}`}>
      <span className="step-num">07 / TECH STACK</span>
      <h2 className="step-title">ENGINEERING TOOLKIT</h2>
      <p className="step-subtitle">REACT · TYPESCRIPT · THREE.JS · PYTHON · NODE.JS · DOCKER</p>
    </div>
  );
}
