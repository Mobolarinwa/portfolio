import { useEffect, useRef, useState } from "react";

type CursorState = "dot" | "nav" | "button";

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("dot");
  const [hoverText, setHoverText] = useState("");

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setIsSupported(true);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.1);
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!initialized.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        initialized.current = true;
      }
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const el = target.closest(
        "a, button, [role='button'], [data-project-link], [data-modal-trigger], [data-cursor-text], .minimap"
      ) as HTMLElement | null;

      if (el && !el.closest("[disabled], [aria-disabled='true']")) {
        const inNav = !!el.closest("nav, .bottom-nav, .about-nav, .resume-nav, .case-nav");
        const isBtn = el.tagName === "BUTTON";

        if (inNav || isBtn) {
          setCursorState("nav");
          setHoverText("");
        } else {
          setCursorState("button");
          const custom = el.getAttribute("data-cursor-text");
          if (custom) {
            setHoverText(custom);
          } else if (el.tagName === "A" && el.getAttribute("href")?.startsWith("mailto:")) {
            setHoverText("Let's talk");
          } else if (el.classList.contains("minimap")) {
            setHoverText("Navigate");
          } else {
            setHoverText("View");
          }
        }
      } else {
        setCursorState("dot");
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <div
      ref={containerRef}
      className={`custom-cursor-container ${isVisible ? "is-visible" : "is-hidden"}`}
    >
      <div className={`custom-cursor-dot cursor-state-${cursorState}`}>
        {cursorState === "button" && (
          <span className="custom-cursor-text">{hoverText}</span>
        )}
      </div>
    </div>
  );
}
