import { useRef, useEffect, useCallback, ReactNode } from "react";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: ReactNode;
};

// Clicks on these elements will NOT produce sparks
const INTERACTIVE =
  'a, button, input, select, textarea, [role="button"], ' +
  '[tabindex]:not([tabindex="-1"]), label, ' +
  "[data-project-link], [data-modal-trigger], .minimap, .more-button";

export function ClickSpark({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animIdRef = useRef<number>(0);

  // Keep canvas pixel-size in sync with the viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const easeFn = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // ease-out
          return t * (2 - t);
      }
    },
    [easing]
  );

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = ts - spark.startTime;
        if (elapsed >= duration) return false;

        const t = easeFn(elapsed / duration);
        const dist = t * sparkRadius * extraScale;
        const len = sparkSize * (1 - t);

        const x1 = spark.x + dist * Math.cos(spark.angle);
        const y1 = spark.y + dist * Math.sin(spark.angle);
        const x2 = spark.x + (dist + len) * Math.cos(spark.angle);
        const y2 = spark.y + (dist + len) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFn, extraScale]);

  // Global click → spawn sparks only on non-interactive targets
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) return;

      const now = performance.now();
      sparksRef.current.push(
        ...Array.from({ length: sparkCount }, (_, i) => ({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        }))
      );
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [sparkCount]);

  return (
    <>
      {/* Fixed canvas overlay — sits just below the custom cursor */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 999998,
          userSelect: "none",
        }}
      />
      {children}
    </>
  );
}
