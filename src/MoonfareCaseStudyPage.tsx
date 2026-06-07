import { useEffect, useRef, useState, type RefObject } from "react";
import type { Page } from "./App";
import { moonfareAssets, resumeAssets } from "./localAssets";

type MoonfareCaseStudyPageProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

const PALETTE = ["#08332b", "#11584a", "#007760", "#c1a985", "#f8f0d9", "#fcf9f0", "#1e1e1e"];

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem Statement" },
  { id: "challenge", label: "Challenge and Goals" },
  { id: "research", label: "User Research" },
  { id: "insights", label: "Insight from Research" },
  { id: "moodboard", label: "Mood Board" },
  { id: "solutions", label: "Solutions" },
  { id: "prototyping", label: "Prototyping and testing" },
  { id: "design-decisions", label: "Design Decisions" },
  { id: "impact", label: "Impact" },
  { id: "reflections", label: "Reflections" },
];

export function MoonfareCaseStudyPage({ onNavigate }: MoonfareCaseStudyPageProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const pageRef = useRef<HTMLElement>(null);

  useMoonfareScrollReveal(pageRef);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const root = pageRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { root, rootMargin: "-24% 0px -64% 0px", threshold: [0, 0.1, 0.25] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalImage(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const page = pageRef.current;
    if (!el || !page) return;

    const elTop = el.getBoundingClientRect().top;
    const pageTop = page.getBoundingClientRect().top;
    page.scrollBy({ top: elTop - pageTop - 72, behavior: "smooth" });
  };

  return (
    <main className="mf-page" ref={pageRef}>
      <aside className="mf-sidebar" aria-label="Moonfare case study sections">
        <button className="mf-back" type="button" onClick={() => onNavigate("home")}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M22.167 14H5.833M5.833 14l7-7M5.833 14l7 7" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>

        <nav className="mf-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`mf-nav-item${activeSection === item.id ? " mf-nav-item--active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="mf-content">

        {/* Hero title */}
        <h1 className="mf-hero-title" data-reveal>Moonfare Private Investment Office</h1>

        {/* Hero media: Figma-rendered iPad Pro mockup */}
        <div className="mf-media mf-hero-media" style={{ background: "#171d97" }} data-reveal>
          <div className="mf-hero-shot">
            <img src={moonfareAssets.heroIpad} alt="Moonfare dashboard on iPad" className="mf-media-img" />
          </div>
        </div>

        {/* Meta row */}
        <div className="mf-meta-row" data-reveal-stagger>
          <div className="mf-meta-cell">
            <span className="mf-label">Role</span>
            <strong>Product designer</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Team</span>
            <strong>1 Designer<br />1 Product manager<br />1 Engineer</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Duration</span>
            <strong>3 weeks</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Skills</span>
            <strong>Product design<br />Information architecture<br />Product strategy</strong>
          </div>
        </div>

        {/* About Moonfare */}
        <section className="mf-section" id="overview" data-reveal>
          <div className="mf-section-label">Overview</div>
          <h2 className="mf-heading-md">About Moonfare</h2>
          <p className="mf-body">
            Moonfare is a leading platform for private equity investments, offering high-net-worth
            individuals and institutional investors access to exclusive investment opportunities. It
            allows individual investors to invest in top-tier private equity funds that were
            traditionally accessible only to institutional investors or ultra-high-net-worth
            individuals. Moonfare offers a curated selection of funds, leveraging technology to
            simplify the investment process, reduce costs, and provide transparency. The platform also
            enables investors to build diversified portfolios of private equity investments.
          </p>
        </section>

        {/* Media: Portrait 1 */}
        <div className="mf-media" data-reveal>
          <img src={moonfareAssets.portrait1} alt="" className="mf-media-img" />
        </div>

        {/* My role */}
        <section className="mf-section" data-reveal>
          <h2 className="mf-heading-sm">My role</h2>
          <p className="mf-body">
            I led the design of a new platform within Moonfare: Moonfare Private Office. This product
            distinguishes our UHNWI segment from regular investors, providing a premium, tailored
            experience that fosters deeper engagement and higher capital commitments. This case study
            covers my design process, including user research, usability testing, user flows, and
            visual design.
          </p>
        </section>

        {/* Problem Statement */}
        <section className="mf-section" id="problem" data-reveal>
          <div className="mf-section-label">Problem statement</div>
          <h2 className="mf-heading-md">No dedicated space for ultra high net worth investors</h2>
          <p className="mf-body">
            While Moonfare's existing platform effectively served a broad range of investors, it
            lacked a dedicated space catering to UHNWIs. These investors expect a highly
            personalized, concierge-like experience, with:
          </p>
          <div className="mf-three-col">
            <p>Exclusive access to high-value investment opportunities.</p>
            <p>A more intuitive and informative portfolio management system.</p>
            <p>Personalized hand-holding throughout the investment journey.</p>
          </div>
        </section>

        {/* Media: Portrait 2 */}
        <div className="mf-media" data-reveal>
          <img src={moonfareAssets.portrait2} alt="" className="mf-media-img" />
        </div>

        {/* Challenge & Goals */}
        <section className="mf-section" id="challenge" data-reveal>
          <div className="mf-section-label">Challenge and goals</div>
          <h2 className="mf-heading-md">What was the project's main challenge?</h2>
          <p className="mf-body">
            Our challenge was to design a new platform that would provide an enhanced experience for
            UHNWIs, ensuring they felt valued while facilitating higher capital commitments.
          </p>

          <div className="mf-goal-block">
            <h4 className="mf-body-strong">Overarching goals</h4>
            <p className="mf-body mf-body-muted">
              Create an app that allows our UHNWIs to invest easily and manage their portfolios
              directly on the Moonfare app. Provide them with access to a dedicated account
              management team and support their investment decisions with portfolio projections.
            </p>
          </div>

          <h4 className="mf-body-strong">Paradigma</h4>
          <div className="mf-paradigma">
            <span>The more they see</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#94979c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>The more they know</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#94979c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>The more they trust</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#94979c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>The more they invest</span>
          </div>

          <div className="mf-goal-block">
            <h4 className="mf-body-strong">Key results</h4>
            <p className="mf-body mf-body-muted">Increase UHNWI AUM by repeat tickets</p>
            <p className="mf-body mf-body-muted">Increase satisfaction of UHNWI</p>
          </div>
        </section>

        {/* User Research */}
        <section className="mf-section" id="research" data-reveal>
          <div className="mf-section-label">User research</div>
          <h2 className="mf-heading-md">
            Understanding what wealth actually wants from a platform built for it.
          </h2>
          <p className="mf-body">
            To understand the specific needs of UHNWIs, I conducted in-depth research, including:
          </p>

          <div className="mf-research-list" data-reveal-stagger>
            <div className="mf-research-item">
              <h4>User Interviews</h4>
              <p>
                Conducted sessions with existing and potential UHNWI investors to understand their
                expectations, pain points, and investment behaviors.
              </p>
            </div>
            <div className="mf-research-item">
              <h4>Competitive Analysis</h4>
              <p>
                Analyzed similar platforms offering bespoke investment services to identify best
                practices and areas for differentiation.
              </p>
            </div>
            <div className="mf-research-item">
              <h4>Stakeholder Workshops</h4>
              <p>
                Collaborated with internal teams, including product managers, financial advisors, and
                customer support, to align on business goals and feasibility.
              </p>
            </div>
          </div>
        </section>

        {/* Media: Research board */}
        <div className="mf-media" style={{ background: "#171d97" }} data-reveal>
          <div className="mf-media-centered" style={{ width: 615, height: 441 }}>
            <img src={moonfareAssets.screenOnboarding} alt="User research board" className="mf-media-img" />
          </div>
        </div>

        {/* Insight from Research */}
        <section className="mf-section" id="insights" data-reveal>
          <div className="mf-section-label">Insight from research</div>
          <h2 className="mf-heading-md">
            Four findings that shaped every decision downstream.
          </h2>

          <div className="mf-insight-table" data-reveal-stagger>
            {[
              {
                num: "01",
                finding: "Personalization is everything",
                desc: "Investors at this tier expect a curated experience with a deeply personal touch — not a one-size-fits-all dashboard, but a space that feels built for them, by name.",
              },
              {
                num: "02",
                finding: "Clarity over complexity",
                desc: "A clear view of investments and returns, without the unnecessary friction. Sophistication, expressed as restraint.",
              },
              {
                num: "03",
                finding: "Trust and exclusivity matter",
                desc: `A premium feel with private access to top-tier funds is critical. The product must signal "you are the few" without ever saying it out loud.`,
              },
              {
                num: "04",
                finding: "Reporting drives satisfaction",
                desc: "Improved reporting standards are a direct pathway to higher investor satisfaction and, ultimately, greater investment volumes and longer commitments",
              },
            ].map((row) => (
              <div className="mf-insight-row" key={row.num}>
                <span className="mf-insight-num">{row.num}</span>
                <span className="mf-insight-finding">{row.finding}</span>
                <span className="mf-insight-desc">{row.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mood Board */}
        <section className="mf-section" id="moodboard" data-reveal>
          <div className="mf-section-label">Visual direction</div>
          <h2 className="mf-heading-md">
            A mood board for a product that should feel like a private library, not a banking app.
          </h2>
          <p className="mf-body">
            To establish the visual and experiential direction for Moonfare Private Office, I curated
            a moodboard that reflects:
          </p>
          <div className="mf-three-col">
            <p>
              <strong className="mf-body-strong-inline">Luxury &amp; Exclusivity</strong>
              <br />High-end aesthetics, sophisticated typography, and premium color schemes.
            </p>
            <p>
              <strong className="mf-body-strong-inline">Clarity &amp; Simplicity</strong>
              <br />Clean, minimalist UI with easy navigation.
            </p>
            <p>
              <strong className="mf-body-strong-inline">Trust &amp; Professionalism</strong>
              <br />Subtle animations, refined micro-interactions, and elegant data visualizations.
            </p>
          </div>

          {/* Moodboard collage — pixel-matched from Figma */}
          <div className="mf-moodboard" data-reveal>
            <div className="mf-mood-tile" style={{ background: "#09251b", width: 305, height: 162, top: 0, left: 0 }}>
              <img src={moonfareAssets.moodboard.taxonomy} alt="" style={{ position: "absolute", top: 15, left: 46, width: 71, height: 131, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.img110} alt="" style={{ position: "absolute", top: 15, left: 118, width: 27, height: 131, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.img129} alt="" style={{ position: "absolute", top: 15, left: 155, width: 94, height: 131, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#362c22", width: 243, height: 207, top: 0, left: 499 }}>
              <img src={moonfareAssets.moodboard.montfort} alt="" style={{ position: "absolute", top: 30, left: 17, width: 51, height: 146, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.montfortAbout} alt="" style={{ position: "absolute", top: 30, left: 69, width: 51, height: 139, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.montfortFunds} alt="" style={{ position: "absolute", top: 30, left: 122, width: 51, height: 139, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.montfortCompanies} alt="" style={{ position: "absolute", top: 30, left: 174, width: 51, height: 139, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#20372e", width: 178, height: 121, top: 0, left: 313 }}>
              <img src={moonfareAssets.moodboard.screen1} alt="" style={{ position: "absolute", top: 7, left: 40, width: 108, height: 52, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.screen2} alt="" style={{ position: "absolute", top: 63, left: 40, width: 108, height: 52, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#122b27", width: 178, height: 78, top: 129, left: 313 }}>
              <img src={moonfareAssets.moodboard.img121} alt="" style={{ position: "absolute", top: 13, left: 26, width: 68, height: 51, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.img122} alt="" style={{ position: "absolute", top: 13, left: 96, width: 68, height: 51, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#201a12", width: 243, height: 121, top: 170, left: 0 }}>
              <img src={moonfareAssets.moodboard.img125} alt="" style={{ position: "absolute", top: 17, left: 11, width: 118, height: 87, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.img126} alt="" style={{ position: "absolute", top: 17, left: 138, width: 90, height: 87, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#08382d", width: 305, height: 164, top: 215, left: 250 }}>
              <img src={moonfareAssets.moodboard.img13} alt="" style={{ position: "absolute", top: 6, left: 68, width: 80, height: 149, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.img21} alt="" style={{ position: "absolute", top: 6, left: 154, width: 83, height: 151, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#242422", width: 243, height: 121, top: 299, left: 0 }}>
              <img src={moonfareAssets.moodboard.img22} alt="" style={{ position: "absolute", top: 10, left: 48, width: 72, height: 101, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.img24} alt="" style={{ position: "absolute", top: 10, left: 123, width: 72, height: 101, objectFit: "cover" }} />
            </div>
            <div className="mf-mood-tile" style={{ background: "#2d251e", width: 181, height: 121, top: 299, left: 563 }}>
              <img src={moonfareAssets.moodboard.screen1208} alt="" style={{ position: "absolute", top: 8, left: 38, width: 97, height: 52, objectFit: "cover" }} />
              <img src={moonfareAssets.moodboard.screen1213} alt="" style={{ position: "absolute", top: 63, left: 38, width: 98, height: 51, objectFit: "cover" }} />
            </div>
          </div>
        </section>

        {/* Wireframes section */}
        <section className="mf-section" id="solutions" data-reveal>
          <div className="mf-section-label">Wireframes</div>
          <h2 className="mf-heading-md">
            Establishing the information architecture before the aesthetics.
          </h2>
          <p className="mf-body">
            Low-fidelity wireframes mapped the structural decisions — what lives where, what gets
            surfaced first, and how a relationship manager folds into the experience.
          </p>
        </section>

        {/* Carousel: Wireframes + Design Screens */}
        {(() => {
          const slides = [
            { src: moonfareAssets.wireframes, bg: "#08382d", contain: true, alt: "Wireframes" },
            ...moonfareAssets.carousel.slice(1).map((src, i) => ({
              src,
              bg: "transparent",
              contain: false,
              alt: `Design screen ${i + 1}`,
            })),
          ];
          const total = slides.length;
          const goPrev = () => setCarouselIndex((i) => (i - 1 + total) % total);
          const goNext = () => setCarouselIndex((i) => (i + 1) % total);
          return (
            <>
              <div className="mf-carousel" id="prototyping" data-reveal>
                <div
                  className="mf-carousel-track"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className="mf-carousel-slide"
                      style={{ background: slide.bg }}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="mf-carousel-img"
                        style={slide.contain ? { objectFit: "contain", padding: "32px 40px" } : undefined}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mf-carousel-zone mf-carousel-zone--prev"
                  onClick={goPrev}
                  aria-label="Previous slide"
                />
                <button
                  type="button"
                  className="mf-carousel-zone mf-carousel-zone--next"
                  onClick={goNext}
                  aria-label="Next slide"
                />
              </div>
              <div className="mf-carousel-dots-row">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`mf-carousel-dot${carouselIndex === i ? " mf-carousel-dot--active" : ""}`}
                    onClick={() => setCarouselIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          );
        })()}

        {/* Visual Identity */}
        <section className="mf-section" id="design-decisions" data-reveal>
          <div className="mf-section-label">Visual identity</div>
          <h2 className="mf-heading-md">
            A refined palette aligned with the luxury experience tailored for our UHNW investors.
          </h2>
          <p className="mf-body">
            Deep forest greens anchor the brand. Coffee cream and warm ivories provide the lift.
            Sparingly used, always intentional.
          </p>
          <div className="mf-palette" data-reveal-stagger>
            {PALETTE.map((color) => (
              <div key={color} className="mf-swatch" style={{ background: color }} title={color} />
            ))}
          </div>
        </section>

        {/* === BEFORE: Old Dashboard === */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">Before</div>
          <h2 className="mf-heading-md">The old dashboard was functional</h2>
        </section>

        {/* Media: Old dashboard screen */}
        <div className="mf-media" style={{ background: "#171d97" }} data-reveal>
          <div className="mf-media-centered" style={{ width: 742, height: 413 }}>
            <img src={moonfareAssets.screenAdvisor} alt="Old dashboard" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: Problems */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Lack of Personalized Onboarding</h4>
            <p>The platform does not offer a tailored onboarding experience for Ultra High Net Worth Investors (UHNWI), missing an opportunity to make a strong first impression.</p>
          </div>
          <div>
            <h4>Limited Access to Advisors</h4>
            <p>Investors do not have seamless access to a personal advisor via chat, email, or call, making it difficult to receive timely support and guidance.</p>
          </div>
        </div>

        {/* === AFTER: New Dashboard === */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">After</div>
          <h2 className="mf-heading-md">The new dashboard is considered.</h2>
          <p className="mf-body">A new seamless, high-end experience that makes investors feel welcomed and valued.</p>
        </section>

        {/* Media: New dashboard */}
        <div className="mf-media" style={{ background: "#007760" }} data-cursor-text="View full image" onClick={() => setModalImage(moonfareAssets.fullpageDesign)} data-reveal>
          <div className="mf-media-top" style={{ top: 44, height: 413 }}>
            <img src={moonfareAssets.screenDashboardNew} alt="New dashboard" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: Solutions after */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Bespoke Onboarding</h4>
            <p>A white-glove onboarding experience tailored to each investor's profile.</p>
          </div>
          <div>
            <h4>Dedicated Relationship Manager</h4>
            <p>Easy access to a personal advisor via chat, email, or call.</p>
          </div>
        </div>

        {/* Media: Old portfolio */}
        <div className="mf-media" style={{ background: "#c1a985" }} data-cursor-text="View full image" onClick={() => setModalImage(moonfareAssets.fullpageDesign)} data-reveal>
          <div className="mf-media-top" style={{ top: 44, height: 413 }}>
            <img src={moonfareAssets.screenOldPortfolio} alt="Old portfolio design" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: More solutions */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Exclusive Investment Opportunities</h4>
            <p>Priority access to top-tier funds with detailed insights.</p>
          </div>
          <div>
            <h4>Minimalist, Luxurious UI</h4>
            <p>A refined aesthetic with high-end typography and smooth animations to reinforce exclusivity.</p>
          </div>
        </div>

        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Direct Access to Industry Insights</h4>
            <p>Investors can access exclusive industry information, deal discussions, and whitepapers directly from the new dashboard.</p>
          </div>
          <div>
            <h4>Priority Access to Fund Launches</h4>
            <p>Gain early access to new fund launches before they are made available to other investors.</p>
          </div>
        </div>

        {/* === BEFORE: Old Portfolio === */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">Before</div>
          <h2 className="mf-heading-md">The old portfolio design</h2>
        </section>

        {/* Media: Portfolio old */}
        <div className="mf-media" style={{ background: "#171d97" }} data-reveal>
          <div className="mf-media-centered" style={{ width: 742, height: 413 }}>
            <img src={moonfareAssets.screenPortfolioNew} alt="Old portfolio design" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: Problems before portfolio */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Absence of an Insightful Dashboard</h4>
            <p>The platform lacks a dedicated dashboard that provides clear, data-driven insights and relevant information for informed decision-making.</p>
          </div>
          <div>
            <h4>Outdated and Generic UI</h4>
            <p>The user interface feels outdated and does not reflect the exclusivity or sophistication expected by high-net-worth investors, diminishing the sense of luxury and prestige.</p>
          </div>
        </div>

        {/* === AFTER: Enhanced Portfolio === */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">After</div>
          <h2 className="mf-heading-md">Enhanced portfolio section</h2>
          <p className="mf-body">
            A new portfolio section that provides greater visibility into investments with actionable insights.
          </p>
        </section>

        {/* Media: Portfolio new/enhanced */}
        <div className="mf-media" style={{ background: "#007760" }} data-cursor-text="View full image" onClick={() => setModalImage(moonfareAssets.fullpageReporting)} data-reveal>
          <div className="mf-media-top" style={{ top: 44, height: 413 }}>
            <img src={moonfareAssets.screenPortfolio2} alt="Enhanced portfolio design" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: Portfolio features */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Performance Analytics</h4>
            <p>Real-time tracking of portfolio performance with historical trends.</p>
          </div>
          <div>
            <h4>Capital Commitments Overview</h4>
            <p>A clear breakdown of committed and available funds.</p>
          </div>
        </div>

        {/* Media: Funds */}
        <div className="mf-media" style={{ background: "#c1a985" }} data-cursor-text="View full image" onClick={() => setModalImage(moonfareAssets.fullpageReporting)} data-reveal>
          <div className="mf-media-top" style={{ top: 44, height: 413 }}>
            <img src={moonfareAssets.screenFunds} alt="Fund screen" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: More portfolio features */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Portfolio Projections</h4>
            <p>AI-powered forecasting tools to help investors plan their future investments effectively.</p>
          </div>
          <div>
            <h4>Document Vault</h4>
            <p>Secure access to personalized investment reports and legal documents.</p>
          </div>
        </div>

        {/* === Personalised Landing === */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">Personalised landing</div>
          <h2 className="mf-heading-md">
            A compelling first impression that says everything without saying much at all.
          </h2>
          <p className="mf-body">
            An introductory letter that communicates the exclusivity and value of Moonfare Private Office.
          </p>
        </section>

        {/* Media: Landing */}
        <div className="mf-media" style={{ background: "#007760" }} data-cursor-text="View full image" onClick={() => setModalImage(moonfareAssets.fullpagePortfolio)} data-reveal>
          <div className="mf-media-top" style={{ top: 44, height: 413 }}>
            <img src={moonfareAssets.screenLanding} alt="Landing screen" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: Landing design features */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Premium Visual Design</h4>
            <p>High-end imagery, sophisticated typography, and a refined color palette.</p>
          </div>
          <div>
            <h4>Clear Value Proposition</h4>
            <p>Concise messaging that highlights the unique benefits for UHNWIs.</p>
          </div>
        </div>

        {/* Media: Landing 2 */}
        <div className="mf-media" style={{ background: "#c1a985" }} data-cursor-text="View full image" onClick={() => setModalImage(moonfareAssets.fullpagePortfolio)} data-reveal>
          <div className="mf-media-top" style={{ top: 44, height: 413 }}>
            <img src={moonfareAssets.screenLanding2} alt="Landing screen 2" className="mf-media-img" />
          </div>
        </div>

        {/* Two-col: CTA + Testimonials */}
        <div className="mf-two-col-text" data-reveal-stagger>
          <div>
            <h4>Exclusive Access CTA</h4>
            <p>A seamless way for eligible investors to request access or schedule a consultation.</p>
          </div>
          <div>
            <h4>Investor Testimonials</h4>
            <p>Social proof from high-profile investors to build credibility and trust.</p>
          </div>
        </div>

        {/* === The Impact === */}
        <section className="mf-section" id="impact" data-reveal>
          <div className="mf-section-label">The impact</div>
          <h2 className="mf-heading-md">
            Numbers don't tell the full story — but these opened the door.
          </h2>
          <p className="mf-body">
            The launch of Moonfare Private Office produced measurable lift across capital commitments,
            engagement, and investor satisfaction.
          </p>
        </section>

        {/* Impact metrics */}
        <div className="mf-impact-grid" data-reveal-stagger>
          {[
            { label: "Total raised", value: "€120M", desc: "Raised uniquely since launch through the new Private Office channel." },
            { label: "2024 performance", value: "€88M", desc: "Raised uniquely in 2024 — the platform's strongest year for the segment." },
            { label: "Segment share", value: "16%", desc: "Of total capital raised came directly from UHNW investors using Private Office." },
          ].map((item) => (
            <div className="mf-impact-cell" key={item.label}>
              <p className="mf-impact-label">{item.label}</p>
              <p className="mf-impact-value">{item.value}</p>
              <p className="mf-impact-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Three-col: Outcomes */}
        <div className="mf-three-col" id="reflections" style={{ marginBottom: 80 }} data-reveal-stagger>
          <div>
            <h4 className="mf-body-strong-inline">Higher engagement</h4>
            <br />
            <span>Increased session times and interactions per investor — UHNWIs spent more time inside the product, not less.</span>
          </div>
          <div>
            <h4 className="mf-body-strong-inline">Larger commitments</h4>
            <br />
            <span>Investors demonstrated higher confidence and willingness to commit greater capital amounts per ticket.</span>
          </div>
          <div>
            <h4 className="mf-body-strong-inline">Investor satisfaction</h4>
            <br />
            <span>Positive qualitative feedback highlighted the premium experience and enhanced advisor support.</span>
          </div>
        </div>

        {/* Thank you */}
        <section className="mf-thankyou" data-reveal>
          <h2>Thank you.</h2>
          <p>
            The launch of Moonfare Private Office produced measurable lift across capital
            commitments, engagement, and investor satisfaction.
          </p>
          <button
            type="button"
            className="mf-next-btn"
            onClick={() => onNavigate("home")}
          >
            <span>View next project</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="#cecfd2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </section>

      </div>

      <footer className="mf-shared-contact" data-reveal>
        <div>
          <img src={resumeAssets.mail} alt="" />
          <p>hi@mobolarinwa.com</p>
        </div>
        <div>
          <img src={resumeAssets.phone} alt="" />
          <p>+49(0)15510216916</p>
        </div>
        <h2>Let’s Talk</h2>
      </footer>

      {/* Full-image modal */}
      {modalImage && (
        <div className="mf-modal-overlay" onClick={() => setModalImage(null)}>
          <div className="mf-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="mf-modal-close"
              onClick={() => setModalImage(null)}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="#f7f7f7" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <img
              src={modalImage}
              alt="Full design view"
              className="mf-modal-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}

function useMoonfareScrollReveal(pageRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const targets = Array.from(
      page.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]"),
    );
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    // Immediately reveal everything already in the viewport on first load
    const pageRect = page.getBoundingClientRect();
    targets.forEach((t) => {
      const rect = t.getBoundingClientRect();
      if (rect.top < pageRect.bottom && rect.bottom > pageRect.top) {
        t.classList.add("is-visible");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
          }
        });
      },
      { root: page, rootMargin: "0px 0px -18% 0px", threshold: 0.01 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pageRef]);
}
