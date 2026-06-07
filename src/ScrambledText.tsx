import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

type ScrambledTextProps = {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const paragraph = rootRef.current.querySelector("p");
    if (!paragraph) return;

    const split = SplitText.create(paragraph, {
      type: "chars",
      charsClass: "char",
    });
    charsRef.current = split.chars as HTMLElement[];

    charsRef.current.forEach((char) => {
      gsap.set(char, {
        display: "inline-block",
        attr: { "data-content": char.innerHTML },
      });
    });

    const handleMove = (event: PointerEvent) => {
      charsRef.current.forEach((char) => {
        const { left, top, width, height } = char.getBoundingClientRect();
        const dx = event.clientX - (left + width / 2);
        const dy = event.clientY - (top + height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance < radius) {
          gsap.to(char, {
            overwrite: true,
            duration: duration * (1 - distance / radius),
            scrambleText: {
              text: char.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const root = rootRef.current;
    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      split.revert();
      charsRef.current = [];
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`.trim()} style={style}>
      <p>{children}</p>
    </div>
  );
}

export default ScrambledText;
