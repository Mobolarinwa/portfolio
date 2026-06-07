import type { CSSProperties } from "react";
import "./GlitchText.css";

type GlitchTextProps = {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
};

type GlitchTextStyle = CSSProperties & {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
};

export function GlitchText({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  className = "",
}: GlitchTextProps) {
  const lines = children.split("\n");
  const inlineStyles: GlitchTextStyle = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
  };

  const hoverClass = enableOnHover ? "enable-on-hover" : "";

  return (
    <span
      className={`glitch ${hoverClass} ${className}`.trim()}
      style={inlineStyles}
      data-text={children}
    >
      {lines.map((line, index) => (
        <span className="glitch-line" key={`${line}-${index}`}>
          {line}
        </span>
      ))}
    </span>
  );
}

export default GlitchText;
