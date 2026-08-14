"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SplitOptions {
  axis: "x" | "y";
  initial: number;
  min?: number;
  max?: number;
}

/**
 * Percentage-based resizable split. Pointer events cover mouse, pen and touch,
 * and the divider is also keyboard-operable via `onKeyDown`.
 */
export function useSplit({ axis, initial, min = 20, max = 80 }: SplitOptions) {
  const [percent, setPercent] = useState(initial);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = useCallback(
    (value: number) => Math.min(max, Math.max(min, value)),
    [min, max],
  );

  useEffect(() => {
    function onMove(event: PointerEvent) {
      const container = containerRef.current;
      if (!dragging.current || !container) return;
      event.preventDefault();
      const rect = container.getBoundingClientRect();
      const next =
        axis === "x"
          ? ((event.clientX - rect.left) / rect.width) * 100
          : ((event.clientY - rect.top) / rect.height) * 100;
      setPercent(clamp(next));
    }

    function onUp() {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      onUp();
    };
  }, [axis, clamp]);

  const onPointerDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = axis === "x" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  }, [axis]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const back = axis === "x" ? "ArrowLeft" : "ArrowUp";
      const forward = axis === "x" ? "ArrowRight" : "ArrowDown";
      if (event.key !== back && event.key !== forward) return;
      event.preventDefault();
      setPercent((p) => clamp(p + (event.key === forward ? 2 : -2)));
    },
    [axis, clamp],
  );

  return { percent, containerRef, onPointerDown, onKeyDown };
}
