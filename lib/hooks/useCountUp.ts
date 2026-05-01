"use client";

import { useEffect, useMemo, useState } from "react";

type CountTarget = {
  value: number;
  suffix: string;
  decimals: number;
};

export function useCountUp(targetValue: string, duration: number, trigger: boolean) {
  const target = useMemo(() => parseTargetValue(targetValue), [targetValue]);
  const [displayValue, setDisplayValue] = useState(() => formatValue(0, target));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!trigger || prefersReducedMotion) {
      setDisplayValue(trigger ? formatValue(target.value, target) : formatValue(0, target));
      return;
    }

    let animationFrame = 0;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setDisplayValue(formatValue(target.value * easedProgress, target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, target, trigger]);

  return displayValue;
}

function parseTargetValue(targetValue: string): CountTarget {
  const match = targetValue.trim().match(/^(\d+(?:[.,]\d+)?)(.*)$/);

  if (!match) {
    return {
      value: 0,
      suffix: targetValue,
      decimals: 0
    };
  }

  const rawNumber = match[1];

  return {
    value: Number(rawNumber.replace(",", ".")),
    suffix: match[2] ?? "",
    decimals: rawNumber.includes(".") || rawNumber.includes(",") ? 1 : 0
  };
}

function formatValue(value: number, target: CountTarget) {
  return `${value.toFixed(target.decimals)}${target.suffix}`;
}

function easeOutQuad(progress: number) {
  return 1 - (1 - progress) * (1 - progress);
}
