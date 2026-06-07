import { useEffect } from "react";
import type { Page } from "./App";
import { Navigation } from "./Navigation";
import { aboutAssets } from "./localAssets";
import TiltedCard from "./TiltedCard";

type AboutPageProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

const experience = [
  ["Moonfare", "Product designer", "2022 - Now"],
  ["Healthlane", "Lead Product designer", "2021 - 2022"],
  ["Carbon", "Product designer", "2020 - 2021"],
  ["Bongalow", "SR. Product designer", "2020 - 2022"],
];

const philosophies = [
  [
    "01",
    "Research-led thinking.",
    "I believe strong product design starts with understanding people. My process is grounded in research, behavioural insights, and uncovering the real problems behind user needs and business goals before jumping into solutions.",
  ],
  [
    "02",
    "Simplifying complexity",
    "I enjoy breaking down complex systems, identifying patterns, and designing experiences that feel intuitive and effortless. Whether working on investment workflows, healthcare platforms, or consumer apps, my goal is always to create clarity through design.",
  ],
  [
    "03",
    "Human-centred innovation.",
    "I combine human-centred design with modern AI-powered tools like Cursor, Claude Code, Lovable, Figma Make, and Magic Patterns to accelerate ideation, prototyping, and product exploration while keeping the user experience thoughtful, intuitive, and emotionally engaging.",
  ],
];

export function AboutPage({ activePage, onNavigate }: AboutPageProps) {
  useAboutScrollReveal();

  return (
    <main className="about-page about-figma-page">
      <div className="about-figma-shell">
        <section className="about-figma-hero" aria-label="About Mobolarinwa" data-reveal>
          <h1>About Mobolarinwa!</h1>
          <p>
            Product designer creating thoughtful digital experiences at the intersection of
            strategy, technology, and human behaviour. Focused on building products that feel
            intuitive, scalable, and meaningful — from fintech and private markets to healthcare
            and mobility.
          </p>
        </section>

        <section className="about-figma-media" aria-label="Portraits" data-reveal>
          <figure>
            <img src={aboutAssets.heroClose} alt="Mobolarinwa close up portrait" />
          </figure>
          <figure>
            <img src={aboutAssets.heroBw} alt="Mobolarinwa black and white close up portrait" />
          </figure>
        </section>

        <section className="about-figma-intro" data-reveal>
          <div>
            <p>
              Over the past 8+ years, I’ve designed products that simplify complex experiences,
              improve usability, and help businesses create measurable impact for users.
            </p>
            <p>
              Today, I work as a Product Designer at Moonfare, where I contribute to the
              replatforming of the investment experience across portfolio management, allocations,
              and post-investment workflows.
            </p>
          </div>
        </section>

        <section className="about-figma-experience" aria-label="Experience" data-reveal>
          <h2>Experience</h2>
          <div>
            {experience.map(([company, role, years]) => (
              <article key={company}>
                <p>{company}</p>
                <p>{role}</p>
                <p>{years}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="about-figma-links" data-reveal>
          <button type="button" onClick={() => onNavigate("resume")} data-cursor-text="Resume">
            View resume
          </button>
          <a href="https://www.linkedin.com/in/mobolarinwa-fakeyede/" target="_blank" rel="noreferrer" data-cursor-text="Visit">
            <img src={aboutAssets.linkedin} alt="" />
            Linkedin
          </a>
        </div>

        <section className="about-figma-philosophy" aria-label="Design Philosophy" data-reveal>
          <h2>Design Philosophy</h2>
          <p>
            The way I approach design is shaped by curiosity, empathy, and clarity of thinking. I
            believe great products are built by deeply understanding people, simplifying complexity,
            and creating experiences that feel natural to use.
          </p>
          <div className="about-figma-principles" data-reveal-stagger>
            {philosophies.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-figma-tools" aria-label="Tools" data-reveal-stagger>
          {aboutAssets.tools.map((tool, index) => (
            <div key={`${tool}-${index}`}>
              <img src={tool} alt={`Tool logo ${index + 1}`} />
            </div>
          ))}
        </section>

        <section className="about-figma-beyond" aria-label="Beyond Design" data-reveal>
          <h2>Beyond Design</h2>
          <p>
            Outside product design, I’m deeply interested in technology, photography, culture, and
            sports.I enjoy documenting everyday moments through photography, exploring emerging
            technologies, and studying how digital products influence behaviour and culture.
            Football remains one of my biggest passions, and I’m a longtime Liverpool supporter.
          </p>
        </section>

        <section className="about-figma-gallery" aria-label="Gallery" data-reveal>
          {aboutAssets.gallery.map((image, index) => (
            <TiltedCard
              key={`${image}-${index}`}
              imageSrc={image}
              altText=""
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={9}
              scaleOnHover={1.06}
              showMobileWarning={false}
              showTooltip={false}
            />
          ))}
        </section>

        <footer className="about-figma-contact" data-reveal>
          <div>
            <img src={aboutAssets.mail} alt="" />
            <p>hi@mobolarinwa.com</p>
          </div>
          <div>
            <img src={aboutAssets.phone} alt="" />
            <p>+49(0)15510216916</p>
          </div>
          <h2>Let’s Talk</h2>
        </footer>
      </div>

      <Navigation activePage={activePage} onNavigate={onNavigate} className="about-nav" />
    </main>
  );
}

function useAboutScrollReveal() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".about-figma-page");
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".about-figma-page [data-reveal]"),
    );
    const staggerTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".about-figma-page [data-reveal-stagger]"),
    );
    const targets = [...revealTargets, ...staggerTargets];

    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      page?.classList.add("is-page-loaded");
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const loadFrame = window.requestAnimationFrame(() => {
      page?.classList.add("is-page-loaded");
    });

    // Immediately reveal everything already in the viewport on first load
    if (page) {
      const pageRect = page.getBoundingClientRect();
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.top < pageRect.bottom && rect.bottom > pageRect.top) {
          target.classList.add("is-visible");
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
          }
        });
      },
      {
        root: document.querySelector(".about-page"),
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.01,
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      window.cancelAnimationFrame(loadFrame);
      observer.disconnect();
    };
  }, []);
}
