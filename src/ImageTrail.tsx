import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./ImageTrail.css";

type Point = {
  x: number;
  y: number;
};

type ImageTrailProps = {
  items?: string[];
  variant?: number;
};

type PointerLikeEvent = MouseEvent | TouchEvent;

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getLocalPointerPos = (event: PointerLikeEvent, rect: DOMRect): Point => {
  const touch = "touches" in event ? event.touches[0] : null;
  const clientX = touch?.clientX ?? ("clientX" in event ? event.clientX : 0);
  const clientY = touch?.clientY ?? ("clientY" in event ? event.clientY : 0);

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
};

const getMouseDistance = (p1: Point, p2: Point) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

class TrailImage {
  el: HTMLElement;
  inner: HTMLElement | null;
  rect: DOMRect;

  constructor(el: HTMLElement) {
    this.el = el;
    this.inner = el.querySelector<HTMLElement>(".content__img-inner");
    this.rect = this.el.getBoundingClientRect();
  }

  refresh() {
    gsap.set(this.el, { scale: 1, x: 0, y: 0, opacity: 0 });
    this.rect = this.el.getBoundingClientRect();
  }

  destroy() {
    gsap.killTweensOf(this.el);
    if (this.inner) gsap.killTweensOf(this.inner);
  }
}

class ImageTrailVariant1 {
  container: HTMLElement;
  images: TrailImage[];
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 42;
  mousePos: Point = { x: 0, y: 0 };
  lastMousePos: Point = { x: 0, y: 0 };
  cacheMousePos: Point = { x: 0, y: 0 };
  raf = 0;
  started = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.images = Array.from(container.querySelectorAll<HTMLElement>(".content__img")).map(
      (img) => new TrailImage(img),
    );

    container.addEventListener("mousemove", this.handlePointerMove);
    container.addEventListener("touchmove", this.handlePointerMove);
    container.addEventListener("mouseenter", this.initRender);
    container.addEventListener("touchstart", this.initRender);
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.images.forEach((image) => image.refresh());
  };

  handlePointerMove = (event: PointerLikeEvent) => {
    const rect = this.container.getBoundingClientRect();
    this.mousePos = getLocalPointerPos(event, rect);
  };

  initRender = (event: PointerLikeEvent) => {
    if (this.started) return;
    const rect = this.container.getBoundingClientRect();
    this.mousePos = getLocalPointerPos(event, rect);
    this.cacheMousePos = { ...this.mousePos };
    this.lastMousePos = { ...this.mousePos };
    this.started = true;
    this.raf = requestAnimationFrame(() => this.render());
  };

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }

    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.raf = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!this.images.length) return;
    this.zIndexVal += 1;
    this.imgPosition = this.imgPosition < this.images.length - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0,
      )
      .to(
        img.el,
        {
          duration: 0.4,
          ease: "power3",
          opacity: 0,
          scale: 0.2,
        },
        0.4,
      );
  }

  onImageActivated() {
    this.activeImagesCount += 1;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount -= 1;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.container.removeEventListener("mousemove", this.handlePointerMove);
    this.container.removeEventListener("touchmove", this.handlePointerMove);
    this.container.removeEventListener("mouseenter", this.initRender);
    this.container.removeEventListener("touchstart", this.initRender);
    window.removeEventListener("resize", this.handleResize);
    this.images.forEach((image) => image.destroy());
  }
}

const variantMap: Record<number, typeof ImageTrailVariant1> = {
  1: ImageTrailVariant1,
};

export default function ImageTrail({ items = [], variant = 1 }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const TrailClass = variantMap[variant] || variantMap[1];
    const trail = new TrailClass(containerRef.current);
    return () => trail.destroy();
  }, [variant, items]);

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, index) => (
        <div className="content__img" key={`${url}-${index}`}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}
