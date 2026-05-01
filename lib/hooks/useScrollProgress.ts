"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function useScrollProgress<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const travel = viewportHeight + rect.height;
      const nextProgress = travel > 0 ? clamp((viewportHeight - rect.top) / travel) : 1;

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return { ref, progress };
}
