import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import "./ScrollStack.css";

/*
 * Adapted from React Bits <ScrollStack /> (JavaScript + CSS variant).
 *
 * The original drives the effect with Lenis on either `window` or its own
 * nested overflow scroller. This portfolio's case-study pages scroll inside a
 * custom `.mf-page` container (position: fixed; overflow-y: auto) that also
 * powers the sidebar IntersectionObserver and `scrollBy` navigation, so a
 * Lenis instance / nested scroller would conflict with it.
 *
 * Smoothness note: the per-frame work reads ONLY `scroller.scrollTop`. All
 * layout measurements (getBoundingClientRect / clientHeight) are cached and
 * only re-taken when the layout actually changes (resize, content reflow,
 * images loading). This keeps the scroll path free of forced reflows / layout
 * thrashing, which is what causes the stack to stutter on a very tall page.
 */

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

type Measurements = {
  cardTops: number[];
  endTop: number;
  containerHeight: number;
};

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());
  const stackCompletedRef = useRef(false);
  const measureRef = useRef<Measurements | null>(null);
  const needsMeasureRef = useRef(true);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Expensive: reads layout. Only run when geometry might have changed.
  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = cardsRef.current;
    if (!scroller || !cards.length) return;

    const scrollTop = scroller.scrollTop;
    const scRectTop = scroller.getBoundingClientRect().top;
    const toOffset = (el: HTMLElement) => el.getBoundingClientRect().top - scRectTop + scrollTop;

    measureRef.current = {
      cardTops: cards.map(toOffset),
      endTop: endRef.current ? toOffset(endRef.current) : 0,
      containerHeight: scroller.clientHeight,
    };
    needsMeasureRef.current = false;
  }, []);

  // Cheap: reads only scrollTop, uses cached measurements. Safe every frame.
  const applyTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = cardsRef.current;
    if (!scroller || !cards.length) return;

    if (needsMeasureRef.current || !measureRef.current) measure();
    const m = measureRef.current;
    if (!m) return;

    const scrollTop = scroller.scrollTop;
    const { cardTops, endTop, containerHeight } = m;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const pinEnd = endTop - containerHeight / 2;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTops[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jTriggerStart = cardTops[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform: CardTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    measure,
  ]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Find the nearest scrollable ancestor (the case-study page container).
    let node: HTMLElement | null = root.parentElement;
    let scroller: HTMLElement | null = null;
    while (node) {
      const overflowY = getComputedStyle(node).overflowY;
      if (overflowY === "auto" || overflowY === "scroll") {
        scroller = node;
        break;
      }
      node = node.parentElement;
    }
    scroller = scroller ?? (document.scrollingElement as HTMLElement) ?? document.documentElement;
    scrollerRef.current = scroller;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.zIndex = String(i + 1);
    });

    const invalidate = () => {
      needsMeasureRef.current = true;
      applyTransforms();
    };

    // Scroll path stays cheap (no layout reads).
    scroller.addEventListener("scroll", applyTransforms, { passive: true });
    window.addEventListener("resize", invalidate);
    window.addEventListener("load", invalidate);

    // Re-measure when the persona section or the scrolling content reflows
    // (e.g. images above the stack finish loading and shift its position).
    const contentEl = (root.closest(".mf-content") as HTMLElement | null) ?? scroller;
    const ro = new ResizeObserver(invalidate);
    ro.observe(root);
    if (contentEl !== root) ro.observe(contentEl);

    needsMeasureRef.current = true;
    applyTransforms();

    return () => {
      scroller?.removeEventListener("scroll", applyTransforms);
      window.removeEventListener("resize", invalidate);
      window.removeEventListener("load", invalidate);
      ro.disconnect();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      measureRef.current = null;
      needsMeasureRef.current = true;
      transformsCache.clear();
    };
  }, [itemDistance, applyTransforms]);

  return (
    <div className={`scroll-stack ${className}`.trim()} ref={rootRef}>
      {children}
      {/* Spacer so the last pin can release cleanly */}
      <div className="scroll-stack-end" ref={endRef} />
    </div>
  );
};

export default ScrollStack;
