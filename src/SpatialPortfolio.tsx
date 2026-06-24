import { PointerEvent, WheelEvent, useEffect, useMemo, useRef, useState } from "react";
import type { Page } from "./App";
import GlitchText from "./GlitchText";
import ImageTrail from "./ImageTrail";
import { Navigation } from "./Navigation";
import PhotographyModal from "./PhotographyModal";
import RecommendationsModal from "./RecommendationsModal";
import { photographyAssets, portfolioAssets } from "./localAssets";

type Point = {
  x: number;
  y: number;
};

type ProjectCard = {
  id: string;
  title: string;
  meta: string;
  x: number;
  y: number;
  image: string;
  logo?: string;
  hoverLogo?: string;
  theme: string;
  cursorText: string;
  hoverBg: string;
};

type Quote = {
  id: string;
  author: string;
  quote: string;
  x: number;
  y: number;
  width?: number;
};

type SpotifyEmbed = {
  id: string;
  title: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type MinimapLandmark = {
  id: string;
  kind: "hero" | "project" | "quote" | "story" | "photo" | "spotify";
  x: number;
  y: number;
  width: number;
  height: number;
};

const CANVAS = {
  width: 5260,
  height: 1900,
  hero: { x: 2503, y: 919 },
  edgePadding: 180,
};

const assets = {
  health: portfolioAssets.health,
  moonfare: portfolioAssets.moonfare,
  access: portfolioAssets.access,
  photo: portfolioAssets.photo,
  healthLogo: portfolioAssets.healthLogo,
  moonfareLogo: portfolioAssets.moonfareLogo,
  accessLogo: portfolioAssets.accessLogo,
  propertyPro: portfolioAssets.propertyProFolder,
  propertyProLogo: portfolioAssets.propertyProLogo,
  propertyProLogoHover: portfolioAssets.propertyProLogoHover,
  linkedin: portfolioAssets.linkedin,
  x: portfolioAssets.x,
  facebook: portfolioAssets.facebook,
  star: portfolioAssets.star,
};

const photographyTrailImages = photographyAssets.images.slice(0, 10);

const spotifyEmbeds: SpotifyEmbed[] = [
  {
    id: "spotify-video",
    title: "Spotify video episode player",
    src: "https://open.spotify.com/embed/episode/1tYiFYdocU2lJ6GhJhJrJq/video?utm_source=generator&theme=0",
    x: 4535,
    y: 354,
    width: 496,
    height: 279,
  },
  {
    id: "spotify-episode",
    title: "Spotify episode player",
    src: "https://open.spotify.com/embed/episode/3JbyADzJHShBXyNFmjqgzQ?utm_source=generator&theme=0",
    x: 4052,
    y: 1107,
    width: 483,
    height: 152,
  },
  {
    id: "spotify-track",
    title: "Spotify track player",
    src: "https://open.spotify.com/embed/track/2JLi525s119rw8P4JcreOn?utm_source=generator&theme=0",
    x: 4211,
    y: 1423,
    width: 483,
    height: 152,
  },
];

const projects: ProjectCard[] = [
  {
    id: "access-north",
    title: "Access mobile app casestudy",
    meta: "Case study • 2020",
    x: 1498,
    y: 531,
    image: assets.access,
    logo: assets.accessLogo,
    theme: "#f4febf",
    cursorText: "Coming soon",
    hoverBg: "#4e1d09",
  },
  {
    id: "health",
    title: "Track, understand and improve your health",
    meta: "Case study • 2022",
    x: 1625,
    y: 1148,
    image: assets.health,
    logo: assets.healthLogo,
    theme: "#d1f0bc",
    cursorText: "Read case study",
    hoverBg: "#053321",
  },
  {
    id: "property-pro",
    title: "PropertyPro",
    meta: "Case study • 2020",
    x: 3060,
    y: 447,
    image: assets.propertyPro,
    logo: assets.propertyProLogo,
    hoverLogo: assets.propertyProLogoHover,
    theme: "transparent",
    cursorText: "Read case study",
    hoverBg: "#22262f",
  },
  {
    id: "moonfare",
    title: "Designing Moonfare Private Investment Office",
    meta: "Case study • 2023",
    x: 2783,
    y: 1170,
    image: assets.moonfare,
    logo: assets.moonfareLogo,
    theme: "#171d97",
    cursorText: "Read case study",
    hoverBg: "#22262f",
  },
];

const quotes: Quote[] = [
  {
    id: "biunca",
    author: "Biunca",
    quote:
      "He approached UX with depth and intention, consistently questioning assumptions to improve the investor experience.",
    x: 870,
    y: 875,
    width: 430,
  },
  {
    id: "ebong",
    author: "Ebong",
    quote:
      "Two things always stand out when the product eventually comes out - the smashing UI which is always very simple but classy and easy to use; and the UX which has drawn multiple praises and commendations from our customers.",
    x: 491,
    y: 1392,
    width: 529,
  },
  {
    id: "ewa",
    author: "Ewa",
    quote:
      "Mob is an exceptional designer who combines deep curiosity, creative thought leadership, and empathy with sharp strategic thinking.",
    x: 3252,
    y: 881,
    width: 430,
  },
];

const minimapLandmarks: MinimapLandmark[] = [
  {
    id: "hero",
    kind: "hero",
    x: CANVAS.hero.x - 460,
    y: CANVAS.hero.y - 345.5,
    width: 920,
    height: 691,
  },
  { id: "story", kind: "story", x: 863, y: 347, width: 355, height: 95 },
  ...projects.map((project) => ({
    id: project.id,
    kind: "project" as const,
    x: project.x,
    y: project.y,
    width: 447,
    height: 330,
  })),
  ...quotes.map((quote) => ({
    id: quote.id,
    kind: "quote" as const,
    x: quote.x,
    y: quote.y,
    width: quote.width ?? 430,
    height: quote.id === "ebong" ? 270 : 190,
  })),
  { id: "photography", kind: "photo", x: 4157, y: 632, width: 164, height: 174 },
  ...spotifyEmbeds.map((embed) => ({
    id: embed.id,
    kind: "spotify" as const,
    x: embed.x,
    y: embed.y,
    width: embed.width,
    height: embed.height,
  })),
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function constrainOffset(offset: Point, viewport: { width: number; height: number }) {
  return {
    x: clamp(offset.x, viewport.width - CANVAS.width - CANVAS.edgePadding, CANVAS.edgePadding),
    y: clamp(offset.y, viewport.height - CANVAS.height - CANVAS.edgePadding, CANVAS.edgePadding),
  };
}

type SpatialPortfolioProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenMoonfare: () => void;
  onOpenHealthlane: () => void;
  onOpenPropertypro: () => void;
};

export function SpatialPortfolio({ activePage, onNavigate, onOpenMoonfare, onOpenHealthlane, onOpenPropertypro }: SpatialPortfolioProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 1280, height: 720 });
  const [gridActive, setGridActive] = useState(false);
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const [photographyOpen, setPhotographyOpen] = useState(false);
  const [draggingActive, setDraggingActive] = useState(false);
  const modalOpen = recommendationsOpen || photographyOpen;
  const gridTimer = useRef(0);
  const camera = useRef({
    offset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    target: null as Point | null,
    dragging: false,
    last: { x: 0, y: 0 },
    lastTime: 0,
    raf: 0,
  });

  const minimap = useMemo(() => {
    const width = 268;
    const height = 133;
    return { width, height };
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(gridTimer.current);
  }, []);

  useEffect(() => {
    const syncSize = () => {
      const nextViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setViewportSize(nextViewport);
      const start = constrainOffset({
        x: window.innerWidth * 0.5 - CANVAS.hero.x,
        y: window.innerHeight * 0.5 - CANVAS.hero.y,
      }, nextViewport);
      camera.current.offset = start;
      setOffset(start);
    };

    syncSize();
    window.addEventListener("resize", syncSize);
    return () => window.removeEventListener("resize", syncSize);
  }, []);

  useEffect(() => {
    const tick = () => {
      const state = camera.current;

      if (state.target) {
        const dx = state.target.x - state.offset.x;
        const dy = state.target.y - state.offset.y;
        state.velocity.x = dx * 0.085;
        state.velocity.y = dy * 0.085;

        if (Math.abs(dx) < 0.45 && Math.abs(dy) < 0.45) {
          state.offset = state.target;
          state.velocity = { x: 0, y: 0 };
          state.target = null;
        }
      } else if (!state.dragging) {
        state.velocity.x *= 0.92;
        state.velocity.y *= 0.92;
      }

      if (!state.dragging) {
        state.offset = constrainOffset({
          x: state.offset.x + state.velocity.x,
          y: state.offset.y + state.velocity.y,
        }, viewportSize);
      }

      setOffset({ ...state.offset });
      state.raf = requestAnimationFrame(tick);
    };

    camera.current.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(camera.current.raf);
  }, [viewportSize]);

  const revealGridAt = (x: number, y: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    viewport.style.setProperty("--grid-x", `${x - rect.left}px`);
    viewport.style.setProperty("--grid-y", `${y - rect.top}px`);
    setGridActive(true);
    window.clearTimeout(gridTimer.current);
    gridTimer.current = window.setTimeout(() => setGridActive(false), 520);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (modalOpen) return;
    revealGridAt(event.clientX, event.clientY);

    const state = camera.current;
    if (!state.dragging) return;

    const now = performance.now();
    const dx = event.clientX - state.last.x;
    const dy = event.clientY - state.last.y;
    const dt = Math.max(now - state.lastTime, 16);

    state.offset = constrainOffset({
      x: state.offset.x + dx,
      y: state.offset.y + dy,
    }, viewportSize);
    state.velocity = {
      x: (dx / dt) * 18,
      y: (dy / dt) * 18,
    };
    state.last = { x: event.clientX, y: event.clientY };
    state.lastTime = now;
    state.target = null;
    setOffset({ ...state.offset });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (modalOpen) return;
    if ((event.target as HTMLElement).closest("button, a, [data-modal-trigger], [data-project-link]")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    camera.current.dragging = true;
    setDraggingActive(true);
    camera.current.last = { x: event.clientX, y: event.clientY };
    camera.current.lastTime = performance.now();
    camera.current.velocity = { x: 0, y: 0 };
    camera.current.target = null;
  };

  const endDrag = () => {
    camera.current.dragging = false;
    setDraggingActive(false);
  };

  const handlePointerLeave = () => {
    endDrag();
    setGridActive(false);
    window.clearTimeout(gridTimer.current);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (modalOpen) return;
    event.preventDefault();
    revealGridAt(event.clientX, event.clientY);

    const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewportSize.height : 1;
    const nextOffset = constrainOffset({
      x: camera.current.offset.x - event.deltaX * multiplier,
      y: camera.current.offset.y - event.deltaY * multiplier,
    }, viewportSize);

    camera.current.offset = nextOffset;
    camera.current.velocity = { x: 0, y: 0 };
    camera.current.target = null;
    setOffset(nextOffset);
  };

  const jumpToCanvasPoint = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * CANVAS.width;
    const y = ((event.clientY - rect.top) / rect.height) * CANVAS.height;
    camera.current.target = constrainOffset({
      x: viewportSize.width / 2 - x,
      y: viewportSize.height / 2 - y,
    }, viewportSize);
  };

  const viewBox = {
    x: clamp((-offset.x / CANVAS.width) * minimap.width, 0, minimap.width),
    y: clamp((-offset.y / CANVAS.height) * minimap.height, 0, minimap.height),
    width: clamp((viewportSize.width / CANVAS.width) * minimap.width, 16, minimap.width),
    height: clamp((viewportSize.height / CANVAS.height) * minimap.height, 10, minimap.height),
  };

  return (
    <main
      ref={viewportRef}
      className={`spatial-viewport${gridActive ? " grid-active" : ""}${
        draggingActive ? " is-dragging" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={handlePointerLeave}
      onWheel={handleWheel}
    >
      <div className={`dot-grid${gridActive ? " is-visible" : ""}`} aria-hidden="true" />
      <div
        className="spatial-canvas"
        style={{
          width: CANVAS.width,
          height: CANVAS.height,
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <Hero />

        {projects.map((project) => (
          <ProjectFolder
            key={project.id}
            project={project}
            onOpen={project.id === "moonfare" ? onOpenMoonfare : project.id === "health" ? onOpenHealthlane : project.id === "property-pro" ? onOpenPropertypro : undefined}
          />
        ))}

        {quotes.map((quote) => (
          <QuoteBlock key={quote.id} quote={quote} onOpen={() => setRecommendationsOpen(true)} />
        ))}

        <StoryTitle />
        <PhotographyObject onOpen={() => setPhotographyOpen(true)} />
        {spotifyEmbeds.map((embed) => (
          <SpotifyEmbedCard key={embed.id} embed={embed} />
        ))}
      </div>

      <button
        className="minimap"
        style={{ width: minimap.width, height: minimap.height }}
        onPointerDown={jumpToCanvasPoint}
        aria-label="Jump around the spatial canvas"
        data-cursor-text="Navigate"
      >
        {minimapLandmarks.map((landmark) => (
          <span
            key={landmark.id}
            className={`minimap-landmark minimap-landmark-${landmark.kind}`}
            style={{
              left: (landmark.x / CANVAS.width) * minimap.width,
              top: (landmark.y / CANVAS.height) * minimap.height,
              width: Math.max((landmark.width / CANVAS.width) * minimap.width, 4),
              height: Math.max((landmark.height / CANVAS.height) * minimap.height, 3),
            }}
          />
        ))}
        <span
          className="minimap-viewport"
          style={{
            left: viewBox.x,
            top: viewBox.y,
            width: viewBox.width,
            height: viewBox.height,
          }}
        />
      </button>

      <div className="hud-label">Drag or scroll to explore</div>
      <Navigation activePage={activePage} onNavigate={onNavigate} />
      {recommendationsOpen ? (
        <RecommendationsModal onClose={() => setRecommendationsOpen(false)} />
      ) : null}
      {photographyOpen ? (
        <PhotographyModal onClose={() => setPhotographyOpen(false)} />
      ) : null}
    </main>
  );
}

function Hero() {
  return (
    <section
      className="hero-lockup"
      style={{ left: CANVAS.hero.x, top: CANVAS.hero.y }}
      aria-label="Portfolio introduction"
    >
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-copy">
        <h1 className="hero-name">
          <GlitchText
            className="hero-glitch"
            speed={0.85}
            enableShadows
            enableOnHover
          >
            {"MOBOLARINWA\nFAKEYEDE"}
          </GlitchText>
        </h1>
        <div className="hero-signals" aria-label="Design focus">
          <span>Human-Centric</span>
          <img src={assets.star} alt="" aria-hidden="true" />
          <span>8+ Years Experience</span>
          <img src={assets.star} alt="" aria-hidden="true" />
          <span>Product-Driven</span>
        </div>
        <p className="hero-intro">
          I’m Mobolarinwa, a Senior Product Designer in Berlin bridging the gap between
          business goals and human needs through user-centered experiences.
        </p>
      </div>
    </section>
  );
}

function ProjectFolder({ project, onOpen }: { project: ProjectCard; onOpen?: () => void }) {
  const isLinked = Boolean(onOpen);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`project-folder project-${project.id}`}
      style={{
        left: project.x,
        top: project.y,
        backgroundColor: hovered ? project.hoverBg : undefined,
      }}
      role={isLinked ? "button" : undefined}
      tabIndex={isLinked ? 0 : undefined}
      data-project-link={isLinked ? true : undefined}
      data-cursor-text={project.cursorText}
      aria-label={isLinked ? `Open ${project.title}` : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (!onOpen) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="project-media" style={{ backgroundColor: project.theme }}>
        <img src={project.image} alt="" />
      </div>
      <div className="project-meta">
        <div className={`project-logo${project.hoverLogo ? " has-hover-logo" : ""}`}>
          {project.logo ? <img className="project-logo-default" src={project.logo} alt="" /> : null}
          {project.hoverLogo ? <img className="project-logo-hover" src={project.hoverLogo} alt="" /> : null}
        </div>
        <div className="project-copy">
          <h2>{project.title}</h2>
          <p>{project.meta}</p>
        </div>
        <button aria-label={`Open options for ${project.title}`} className="more-button">
          <span />
          <span />
          <span />
        </button>
      </div>
    </article>
  );
}

function QuoteBlock({ quote, onOpen }: { quote: Quote; onOpen: () => void }) {
  return (
    <figure
      className="quote-block"
      style={{ left: quote.x, top: quote.y, width: quote.width ?? 430 }}
      role="button"
      tabIndex={0}
      data-modal-trigger
      data-cursor-text="Read testimonials"
      aria-label="Open recommendations"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <blockquote>
        <div className="quote-scale-shell">
          <p className="quote-text">{quote.quote}</p>
        </div>
      </blockquote>
      <figcaption>
        <GlitchText className="quote-author-glitch" speed={0.85} enableShadows enableOnHover>
          {quote.author}
        </GlitchText>
      </figcaption>
    </figure>
  );
}

function StoryTitle() {
  return (
    <a
      className="story-title"
      style={{ left: 863, top: 347 }}
      href="https://medium.com/mobolarinwa/recounting-my-transition-into-becoming-a-ux-designer-4f3d5cd1eef0"
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-text="View Story"
    >
      <h2>Recounting My Transition Into Becoming A UX Designer</h2>
      <p>Story • 2019</p>
    </a>
  );
}

function PhotographyObject({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className="photo-object"
      style={{ left: 4157, top: 632 }}
      data-modal-trigger
      data-cursor-text="Open gallery"
      aria-label="Open photography gallery"
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
    >
      <span className="photo-trail" aria-hidden="true">
        <ImageTrail items={photographyTrailImages} variant={1} />
      </span>
      <span className="photo-stack">
        <span className="photo-card back" />
        <span className="photo-card mid" />
        <span className="photo-card front">
          <img src={assets.photo} alt="" />
        </span>
      </span>
      <span className="photo-object-label">Photography</span>
    </button>
  );
}

function SpotifyEmbedCard({ embed }: { embed: SpotifyEmbed }) {
  return (
    <section
      className={`spotify-embed spotify-embed-${embed.id}`}
      style={{
        left: embed.x,
        top: embed.y,
        width: embed.width,
        height: embed.height,
      }}
      aria-label={embed.title}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onWheel={(event) => {
        event.stopPropagation();
      }}
    >
      <iframe
        data-testid="embed-iframe"
        title={embed.title}
        src={embed.src}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </section>
  );
}
