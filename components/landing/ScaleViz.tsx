const satellites = [
  { x: 28, y: 16, label: "Ads" },
  { x: 132, y: 14, label: "IA" },
  { x: 24, y: 66, label: "CRM" },
  { x: 136, y: 68, label: "Agenda" },
] as const;

export function ScaleViz() {
  return (
    <div className="viz-compact viz-scale" aria-hidden="true">
      <svg className="viz-scale__svg" viewBox="0 0 160 80">
        <ellipse className="viz-scale__orbit viz-scale__orbit--1" cx="80" cy="40" rx="62" ry="25" />
        <ellipse className="viz-scale__orbit viz-scale__orbit--2" cx="80" cy="40" rx="45" ry="34" />
        {satellites.map((s, i) => (
          <line
            key={`l-${s.x}-${s.y}`}
            className={`viz-scale__line viz-scale__line--${i + 1}`}
            x1="80"
            y1="40"
            x2={s.x}
            y2={s.y}
          />
        ))}
        <circle className="viz-scale__center" cx="80" cy="40" r="4" />
        {satellites.map((s, i) => (
          <g key={`c-${s.x}-${s.y}`} className={`viz-scale__satellite viz-scale__satellite--${i + 1}`}>
            <circle cx={s.x} cy={s.y} r="3" />
            <text x={s.x} y={s.y + 12} textAnchor="middle">{s.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
