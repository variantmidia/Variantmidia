const steps = ["Lead", "Resposta", "Agenda"] as const;

export function SpeedViz() {
  return (
    <div className="viz-compact viz-speed" aria-hidden="true">
      <div className="viz-speed__track-line">
        <span className="viz-speed__runner" />
      </div>
      <div className="viz-speed__nodes">
        {steps.map((step, i) => (
          <span key={step} className={`viz-speed__node viz-speed__node--${i + 1}`}>
            <span className="viz-speed__dot" />
            <span className="viz-speed__label">{step}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
