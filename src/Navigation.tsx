import type { Page } from "./App";

type NavigationProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
  className?: string;
};

export function Navigation({ activePage, onNavigate, className = "" }: NavigationProps) {
  const navClassName = `bottom-nav${className ? ` ${className}` : ""}`;

  return (
    <nav className={navClassName} aria-label="Primary navigation">
      <button
        className={activePage === "home" ? "active" : ""}
        type="button"
        onClick={() => onNavigate("home")}
        data-cursor-text="Home"
      >
        Home
      </button>
      <button
        className={activePage === "about" ? "active" : ""}
        type="button"
        onClick={() => onNavigate("about")}
        data-cursor-text="About"
      >
        About
      </button>
      <button
        className={activePage === "resume" ? "active" : ""}
        type="button"
        onClick={() => onNavigate("resume")}
        data-cursor-text="Resume"
      >
        Resume
      </button>
      <a className="talk" href="mailto:hello@example.com" data-cursor-text="Let's Talk">
        Lets Talk
      </a>
    </nav>
  );
}
