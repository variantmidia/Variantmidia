import type { CSSProperties } from "react";

const bars = [
  { label: "Origem", value: 92, scale: ".92" },
  { label: "Triagem", value: 74, scale: ".74" },
  { label: "Agenda", value: 58, scale: ".58" },
] as const;

export function ControlViz() {
  return (
    <div className="viz-compact viz-control" aria-hidden="true">
      <div className="viz-control__radar">
        <span className="viz-control__sweep" />
        <span className="viz-control__blip viz-control__blip--1" />
        <span className="viz-control__blip viz-control__blip--2" />
        <span className="viz-control__blip viz-control__blip--3" />
      </div>
      {bars.map((bar, i) => (
        <div key={bar.label} className="viz-control__row">
          <span className="viz-control__label">{bar.label}</span>
          <span className="viz-control__track">
            <span
              className="viz-control__bar"
              style={{ "--viz-scale": bar.scale, "--bar-i": i } as CSSProperties}
            />
          </span>
          <span className="viz-control__value">{bar.value}</span>
        </div>
      ))}
    </div>
  );
}
