import { useEffect, useRef, useState } from "react";
import { modalAssets, photographyAssets } from "./localAssets";
import Masonry from "./Masonry";
import "./PhotographyModal.css";

type PhotographyModalProps = {
  onClose: () => void;
};

const photoHeights = [
  280, 380, 220, 340, 300, 260, 420, 240, 360, 200,
  320, 400, 250, 310, 370, 230, 290, 350, 270, 390,
  210, 330, 440, 260, 300, 280, 380, 220, 340, 300,
  260, 420, 240, 360, 200, 320, 400, 250, 310, 370,
  230, 290, 350, 270, 390, 210, 330, 440, 260, 300,
];

const photographyItems = photographyAssets.images.map((img, index) => ({
  id: String(index + 1),
  img,
  url: img,
  height: photoHeights[index] * 2,
}));

export function PhotographyModal({ onClose }: PhotographyModalProps) {
  const modalRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef(0);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => onCloseRef.current(), 220);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <div
      className={`photography-modal-overlay${isClosing ? " is-closing" : ""}`}
      role="presentation"
      onWheel={(event) => {
        event.stopPropagation();
      }}
      onTouchMove={(event) => {
        event.stopPropagation();
      }}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".photography-modal")) requestClose();
      }}
    >
      <section
        ref={modalRef}
        className="photography-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photography-modal-title"
        tabIndex={-1}
      >
        <h2 id="photography-modal-title" className="sr-only">
          Photography
        </h2>
        <button
          className="photography-modal-close"
          type="button"
          aria-label="Close photography gallery"
          onClick={requestClose}
        >
          <img src={modalAssets.close} alt="" />
        </button>
        <div className="photography-masonry-shell" aria-label="Photography gallery">
          <Masonry
            items={photographyItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </section>
    </div>
  );
}

export default PhotographyModal;
