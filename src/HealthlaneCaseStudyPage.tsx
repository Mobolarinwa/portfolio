import { useEffect, useRef, useState, type RefObject } from "react";
import type { Page } from "./App";
import { healthlaneAssets, resumeAssets } from "./localAssets";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

type HealthlaneCaseStudyPageProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem Statement" },
  { id: "challenge", label: "Challenge and Goals" },
  { id: "research", label: "User Research" },
  { id: "insights", label: "Insight from Research" },
  { id: "architecture", label: "Information Architecture" },
  { id: "flows", label: "User Flows" },
  { id: "iterations", label: "First Iterations" },
  { id: "testing", label: "Prototyping and testing" },
  { id: "decisions", label: "Design Decisions" },
  { id: "system", label: "Design System" },
  { id: "impact", label: "Impact" },
  { id: "reflections", label: "Reflections" },
];

const PROBLEMS = [
  {
    title: "Delays in detecting chronic conditions",
    desc: "Chronic diseases such as diabetes, hypertension, and heart disease develop gradually, often without noticeable symptoms in the early stages. Because many people only visit doctors when they feel unwell, these conditions are frequently diagnosed too late, making treatment more complicated and expensive.",
  },
  {
    title: "People lack proper health maintenance",
    desc: "Many individuals in Africa do not prioritize routine health checkups, often due to a lack of awareness, limited access to healthcare facilities, or financial constraints. As a result, they only seek medical attention when symptoms become severe, leading to late-stage diagnosis of chronic illnesses.",
  },
  {
    title: "Difficulty understanding health data",
    desc: "When people do undergo medical tests, they are often presented with complex lab reports filled with technical jargon and numerical values that are hard to interpret. Without clear explanations, users struggle to understand their health status and what actions they need to take.",
  },
  {
    title: "Lack of proactive health management",
    desc: "Most healthcare systems are designed to treat illnesses rather than prevent them. People need tools that help them track their health regularly, detect risks early, and receive personalized advice on how to improve their well-being before serious health issues arise.",
  },
  {
    title: "No clear guidance on reversing health data",
    desc: "Even when users learn they are at risk of developing a chronic disease, they often don't receive practical, step-by-step guidance on lifestyle changes or medical interventions that could help them reverse or manage their condition effectively.",
  },
];

const GOALS = [
  { label: "Blood Test", active: false },
  { label: "Care Plan", active: false },
  { label: "Prevent", active: true },
  { label: "Eat well", active: false },
  { label: "Be active", active: false },
];

const PERSONAS = [
  {
    name: "Paul Adeyemi",
    role: "The Patient Managing a Chronic Condition",
    avatar: healthlaneAssets.personaAvatars[0],
    tags: ["55 years", "Retired"],
    goals: "Manage diabetes and monitor cholesterol levels.",
    pains: "Difficulty tracking trends over time; wants proactive suggestions rather than reactive treatments.",
    needs: "Regular alerts on critical changes, actionable lifestyle recommendations, and easy access to historical data for doctor consultations.",
  },
  {
    name: "Aisha  Babatunde",
    role: "The Health-Conscious Professional",
    avatar: healthlaneAssets.personaAvatars[1],
    tags: ["29 years", "Lawyer"],
    goals: "Preventive health management, early detection of potential issues.",
    pains: "Limited time to research medical information; finds traditional lab reports overwhelming.",
    needs: "Simple explanations of biomarker results, clear next steps, and doctor-backed insights for peace of mind.",
  },
  {
    name: "David Majekodunmi",
    role: "The Fitness Enthusiast",
    avatar: healthlaneAssets.personaAvatars[2],
    tags: ["34 years", "Marketing Executive"],
    goals: "Optimize fitness performance, track biomarkers related to endurance and muscle recovery.",
    pains: "Struggles with interpreting complex health data; wants insights tailored to his training regimen.",
    needs: "An intuitive dashboard with clear trends, personalized health recommendations, and integration with his fitness wearables.",
  },
];

const SURVEY = [
  { q: "Difficulty understanding lab reports", v: "72%" },
  { q: "Lack of regular health tracking", v: "65%" },
  { q: "Not knowing when to visit a doctor", v: "58%" },
  { q: "Lack of proactive guidance on improving health", v: "53%" },
  { q: "Concerned about undiagnosed chronic conditions", v: "67%" },
  { q: "Want a mobile app for easier health tracking", v: "81%" },
  { q: "Need access to doctors for result discussion & care planning", v: "90%" },
  { q: "No access to personalized health insights", v: "47%" },
];

const INSIGHTS = [
  {
    num: "01",
    finding: "Complexity of Medical Data",
    desc: "Users found traditional lab reports overwhelming and difficult to interpret.",
  },
  {
    num: "02",
    finding: "Access to Doctors",
    desc: "80% of users needed access to doctors to discuss their test results and create a personalized care plan.",
  },
  {
    num: "03",
    finding: "Lack of Personalization",
    desc: "Many existing apps failed to provide tailored recommendations based on individual health data.",
  },
  {
    num: "04",
    finding: "Need for Continuous Tracking",
    desc: "Users wanted to track their health over time and see trends rather than one-time test results.",
  },
  {
    num: "05",
    finding: "Trust & Credibility",
    desc: "Users preferred medically backed insights over generic health advice.",
  },
];

const IA_SECTIONS = [
  {
    title: "Home/Dashboard",
    desc: "A place to show users their health summary, urgent alerts, quick access to trackers and recent body trends",
  },
  {
    title: "My Health",
    desc: "Allows users to track their health, reminders about daily routines, medication, treatment journey map and test results",
  },
  {
    title: "Meals",
    desc: "Allows users to track meals, plan meals and integrate with dietary apps",
  },
  {
    title: "Workout",
    desc: "Exercise routines, Activity logs (steps, cardio, strength training), Sync with wearables (Fitbit, Apple Watch)",
  },
  {
    title: "Profile/Me",
    desc: "Personal details (age, weight, goals), Settings (notifications, app preferences)",
  },
];

const PROTO_PAIRS = [
  {
    title: "Initial homepage design",
    desc: "A significant number of users (about 70%) expressed concerns about their daily plans not being properly logged. The current design lacked the ability to track completed exercises, logged meals, and calculate calorie intake. Given the high demand for this functionality, I prioritized improving its visibility and usability.",
  },
  {
    title: "Refined homepage design",
    desc: "I redesigned the Care Plan page into a Home page with three tabs: Dashboard, Plan, and Resources. On the Track page, I included all the daily tasks users need to complete, displaying their progress and allowing them to update it manually or automatically through connected devices like Apple Watch and Fitbit. Additionally, users can track their BMI, body fat, height, and weight on this page.",
  },
  {
    title: "Initial result page design",
    desc: "During usability testing, many users asked about baseline values for their results and how to learn more about each test. In-house doctors also reported that patients frequently requested benchmarks for all test results. This highlighted the need to prioritize sharing more detailed information to improve clarity and understanding.",
  },
  {
    title: "Refined result page design",
    desc: "I enhanced the results page to provide patients with clearer, more informative test insights. This included displaying benchmarks/baselines for each test, offering doctors key insights into results, and incorporating historical data for comparison. Additionally, I introduced graphical representations of where results should be and actionable recommendations to help users improve or maintain their health.",
  },
  {
    title: "Initial result exploration page design",
    desc: "During app testing, patients requested the ability to download their results in a printable format. Additionally, during the beta test, patients with family doctors expressed the need for a shareable document to facilitate better consultations with their doctors.",
  },
  {
    title: "Refined result exploration page design",
    desc: "I redesigned the test results page to present information graphically, summarizing where results should be for better clarity. Additionally, I added a download button that allows users to share their results directly with their doctors, eliminating the need to save them first.",
  },
];

const DESIGN_SYSTEM_BOARDS = [
  { src: healthlaneAssets.designSystem.type, label: "Text styles" },
  { src: healthlaneAssets.designSystem.buttons, label: "Buttons and input" },
  { src: healthlaneAssets.designSystem.colors, label: "Colours and shades" },
  { src: healthlaneAssets.designSystem.components, label: "Other components" },
];

export function HealthlaneCaseStudyPage({ onNavigate }: HealthlaneCaseStudyPageProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const pageRef = useRef<HTMLElement>(null);

  useCaseStudyScrollReveal(pageRef);

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
      { root, rootMargin: "-24% 0px -64% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
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
    <main className="mf-page hl-page" ref={pageRef}>
      <aside className="mf-sidebar" aria-label="Healthlane case study sections">
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
        <p className="hl-kicker" data-reveal>Case study • 2022</p>
        <h1 className="mf-hero-title" data-reveal>Track, Understand and Improve Your Health</h1>

        <div className="mf-media mf-hero-media hl-hero-media" data-reveal>
          <img src={healthlaneAssets.heroPhone} alt="Healthlane mobile app in hand" className="hl-hero-phone" />
        </div>

        <div className="mf-meta-row" data-reveal-stagger>
          <div className="mf-meta-cell">
            <span className="mf-label">Role</span>
            <strong>Lead product designer</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Team</span>
            <strong>2 Designer<br />2 Product manager<br />3 Engineer</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Duration</span>
            <strong>3 Months</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Skills</span>
            <strong>Product design<br />Information architecture<br />Product strategy</strong>
          </div>
        </div>

        {/* Overview */}
        <section className="mf-section" id="overview" data-reveal>
          <div className="mf-section-label">Overview</div>
          <h2 className="mf-heading-md">What is Healthlane?</h2>
          <p className="mf-body">
            Healthlane is a health-tracking app that empowers users to monitor their well-being through comprehensive blood tests. The platform provides insights into over 70 biomarkers, helping users make informed decisions about their health.
          </p>
        </section>

        <div className="mf-media" data-reveal>
          <img src={healthlaneAssets.clinicPortrait} alt="" className="mf-media-img" />
        </div>

        <section className="mf-section" data-reveal>
          <h2 className="mf-heading-sm">My role</h2>
          <div className="mf-body">
            <p>As a product designer on this project, I played a pivotal role in designing a user-friendly, data-driven experience that bridges the gap between medical diagnostics and everyday health management.</p>
            <p>This case study covers my design process, including user research, usability testing, jobs to be done, information architecture, user flows, and visual design.</p>
          </div>
        </section>

        {/* Problem statement */}
        <section className="mf-section" id="problem" data-reveal>
          <div className="mf-section-label">Problem statement</div>
          <h2 className="mf-heading-md">The gap in proactive and preventative chronic care management.</h2>
          <p className="mf-body">
            Chronic diseases like diabetes and hypertension are rising across Africa, yet healthcare systems remain focused on treating emergencies, not prevention. Barriers such as limited access to care, cost, and low health literacy delay early diagnosis, leading to costly late-stage treatments. Even when tests are done, complex results and a lack of actionable guidance leave individuals unprepared to manage risks. This gap underscores an urgent need for tools that empower people to proactively understand, track, and improve their health before conditions escalate.
          </p>
        </section>

        <div className="mf-media" data-reveal>
          <img src={healthlaneAssets.testingPortrait} alt="" className="mf-media-img" />
        </div>

        <section className="mf-section" data-reveal>
          <div className="hl-problem-list" data-reveal-stagger>
            {PROBLEMS.map((item) => (
              <div className="hl-problem-row" key={item.title}>
                <span className="hl-problem-title">{item.title}</span>
                <span className="hl-problem-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge and goals */}
        <section className="mf-section" id="challenge" data-reveal>
          <div className="mf-section-label">Challenge and goals</div>
          <h2 className="mf-heading-md">What was the project's main challenge?</h2>
          <p className="mf-body">
            The goal was to design an intuitive app that simplifies health tracking with clear data visuals, provides personalized insights, encourages proactive well-being, and alerts users to potential chronic conditions with guidance for management.
          </p>
          <h4 className="mf-body-strong">Major key goals</h4>
          <div className="hl-goals" data-reveal-stagger>
            {GOALS.map((goal) => (
              <span
                key={goal.label}
                className={`hl-goal${goal.active ? " hl-goal--active" : ""}`}
              >
                {goal.label}
              </span>
            ))}
          </div>
        </section>

        {/* User research — personas */}
        <section className="mf-section" id="research" data-reveal>
          <div className="mf-section-label">User research</div>
          <h2 className="mf-heading-md">Understanding the users</h2>
          <p className="mf-body">
            To address varied user requirements and foster inclusive design, we developed three core personas rooted in research insights, ensuring the app aligns with real-world behaviors, challenges, and goals. These personas helped shape our design decisions and ensure we addressed real user needs.
          </p>
          <ScrollStack
            className="hl-persona-stack"
            itemDistance={40}
            itemStackDistance={18}
            baseScale={0.9}
            itemScale={0.035}
            stackPosition="22%"
            scaleEndPosition="14%"
          >
            {PERSONAS.map((persona) => (
              <ScrollStackItem key={persona.name} itemClassName="hl-persona-card">
                <span className="hl-persona-avatar">
                  <img src={persona.avatar} alt={`${persona.name} persona avatar`} />
                </span>
                <div className="hl-persona-head">
                  <h3 className="hl-persona-name">{persona.name}</h3>
                  <p className="hl-persona-role">{persona.role}</p>
                </div>
                <div className="hl-persona-tags">
                  {persona.tags.map((tag) => (
                    <span className="hl-persona-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="hl-persona-block">
                  <h5>Health Goals</h5>
                  <p>{persona.goals}</p>
                </div>
                <div className="hl-persona-block">
                  <h5>Pain Points</h5>
                  <p>{persona.pains}</p>
                </div>
                <div className="hl-persona-block">
                  <h5>Needs</h5>
                  <p>{persona.needs}</p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </section>

        {/* User research — target audience */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">User research</div>
          <h2 className="mf-heading-md">Understanding the target audience</h2>
          <div className="mf-body hl-body-stack">
            <p>We conducted extensive user research to understand our target audience. This included:</p>
            <p>User Interviews &amp; Surveys</p>
            <p>We interviewed 30+ individuals, including fitness enthusiasts, patients with chronic conditions, and those interested in preventive healthcare. Surveys were sent to 500+ potential users to gather quantitative insights</p>
          </div>
        </section>

        <FigureMedia src={healthlaneAssets.whiteboard} alt="Healthlane research planning board" onOpen={setModalImage} />

        <section className="mf-section" data-reveal>
          <div className="hl-survey-table" data-reveal-stagger>
            <div className="hl-survey-row hl-survey-row--head">
              <span className="hl-survey-q">Survey Question</span>
              <span className="hl-survey-v">Percentage of Users Affected</span>
            </div>
            {SURVEY.map((row) => (
              <div className="hl-survey-row" key={row.q}>
                <span className="hl-survey-q">{row.q}</span>
                <span className="hl-survey-v">{row.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Insight from research */}
        <section className="mf-section" id="insights" data-reveal>
          <div className="mf-section-label">Insight from research</div>
          <h2 className="mf-heading-md">Key insights that influenced every subsequent decision.</h2>
        </section>

        <FigureMedia src={healthlaneAssets.consultation} alt="Healthlane key insights review" onOpen={setModalImage} />

        <section className="mf-section" data-reveal>
          <div className="mf-insight-table" data-reveal-stagger>
            {INSIGHTS.map((row) => (
              <div className="mf-insight-row" key={row.num}>
                <span className="mf-insight-num">{row.num}</span>
                <span className="mf-insight-finding">{row.finding}</span>
                <span className="mf-insight-desc">{row.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Jobs to be done */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">Jobs to Be Done (JTBD)</div>
          <h2 className="mf-heading-md">Understanding the "why" behind user actions to design for meaningful health behaviour change</h2>
        </section>

        <FigureMedia src={healthlaneAssets.jobsToBeDone} alt="Healthlane jobs to be done board" fit="contain" background="#d1f0bc" onOpen={setModalImage} />

        {/* Information architecture */}
        <section className="mf-section" id="architecture" data-reveal>
          <div className="mf-section-label">Information Architecture</div>
          <h2 className="mf-heading-md">Establishing the information architecture before the aesthetics.</h2>
          <p className="mf-body">To prioritise clarity and quick access, we organised the app into five key sections:</p>
        </section>

        <FigureMedia src={healthlaneAssets.informationArchitecture} alt="Healthlane information architecture" fit="contain" background="#d1e3ff" onOpen={setModalImage} />

        <section className="mf-section" data-reveal>
          <div className="hl-ia-grid" data-reveal-stagger>
            {IA_SECTIONS.map((item) => (
              <div className="hl-ia-item" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* User flows */}
        <section className="mf-section" id="flows" data-reveal>
          <div className="mf-section-label">User Flows</div>
          <h2 className="mf-heading-md">Critical scenarios to ensure seamless interactions mapped</h2>
        </section>

        <FigureMedia src={healthlaneAssets.userFlow} alt="Healthlane user flow" fit="contain" background="#d1e3ff" onOpen={setModalImage} />

        {/* First iterations */}
        <section className="mf-section" id="iterations" data-reveal>
          <div className="mf-section-label">First Iterations</div>
          <h2 className="mf-heading-md">Establishing the basics, creating the first ideas</h2>
        </section>

        <div className="hl-iteration-block" data-reveal-stagger>
          {healthlaneAssets.firstIterationScreens.map((src, index) => (
            <button
              key={src}
              type="button"
              className="hl-iteration-screen"
              onClick={() => setModalImage(src)}
              data-cursor-text="View full image"
            >
              <img src={src} alt={`Healthlane first iteration screen ${index + 1}`} />
            </button>
          ))}
        </div>

        {/* Prototyping and testing */}
        <section className="mf-section" id="testing" data-reveal>
          <div className="mf-section-label">User Testing</div>
          <h2 className="mf-heading-md">Putting our initial concepts to the test.</h2>
          <p className="mf-body">
            We ran usability tests on our early concepts to ensure the layout was intuitive, clear, and met patient needs
          </p>
        </section>

        <div className="hl-proto-list" id="decisions" data-reveal-stagger>
          {PROTO_PAIRS.map((pair, index) => (
            <div
              className={`hl-proto-pair${index % 2 === 1 && index < PROTO_PAIRS.length - 1 ? " hl-proto-pair--divider" : ""}`}
              key={pair.title}
            >
              <button
                type="button"
                className="hl-proto-media"
                onClick={() => setModalImage(healthlaneAssets.prototypeScreens[index])}
                data-cursor-text="View full image"
              >
                <img src={healthlaneAssets.prototypeScreens[index]} alt={pair.title} />
              </button>
              <div className="hl-proto-text">
                <h4>{pair.title}</h4>
                <p>{pair.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Design system */}
        <section className="mf-section" id="system" data-reveal>
          <div className="mf-section-label">Visual identity</div>
          <h2 className="mf-heading-md">Scaling consistency through a unified design system.</h2>
          <div className="mf-body">
            <p>After the initial designs were reviewed and tested with users, we realized that the brand identity wasn't fully aligned with our vision for Healthlane. The existing design lacked consistency, and user feedback indicated that some UI elements weren't as intuitive or engaging as we had hoped.</p>
            <p>To address this, I initiated the development of a new design system that would provide a consistent, scalable, and accessible foundation for the product.</p>
          </div>
        </section>

        <div className="hl-system-stack" data-reveal-stagger>
          {DESIGN_SYSTEM_BOARDS.map((item) => (
            <button
              key={item.label}
              type="button"
              className="hl-board-card"
              onClick={() => setModalImage(item.src)}
              data-cursor-text="View full image"
            >
              <h4>{item.label}</h4>
              <img src={item.src} alt={item.label} />
            </button>
          ))}
        </div>

        {/* Final designs */}
        <section className="mf-section" data-reveal>
          <div className="mf-section-label">Final designs</div>
          <h2 className="mf-heading-md">High fidelity screens</h2>
        </section>

        <div className="hl-phone-stack" data-reveal-stagger>
          {chunkPairs(healthlaneAssets.screens).map((pair, index) => (
            <PhonePairRow key={index} screens={pair} onOpen={setModalImage} />
          ))}
        </div>

        {/* Impact */}
        <section className="mf-section" id="impact" data-reveal>
          <div className="mf-section-label">The impact</div>
          <h2 className="mf-heading-md">The numbers mattered but clarity is what shipped.</h2>
          <p className="mf-body">
            Healthlane launched to turn a clinical, hard-to-read diagnostics experience into something people could act on. The design directly targeted the problems research surfaced — and addressed each one in the product.
          </p>
        </section>

        <div className="mf-three-col" data-reveal-stagger>
          <p><strong className="mf-body-strong-inline">Higher clarity</strong><br />Turned 70+ biomarkers into a glanceable health score and plain-language status — without losing medical integrity.</p>
          <p><strong className="mf-body-strong-inline">From reactive to preventive</strong><br />Daily trackers, routines, and condition programmes gave users a structured way to stay ahead of risk, not just react to it.</p>
          <p><strong className="mf-body-strong-inline">Cross-functional alignment</strong><br />Translated clinical accuracy and product feasibility into one user-friendly experience across designers, PMs, developers, and doctors.</p>
        </div>

        {/* Real experiences */}
        <section className="mf-section" id="reflections" data-reveal>
          <div className="mf-section-label">Real experiences</div>
          <h2 className="mf-heading-md">From dreaded check-up to 'it felt like home.</h2>
          <p className="mf-body">What early users said after experiencing Healthlane firsthand</p>
        </section>

        <div className="hl-testimonial-grid" data-reveal-stagger>
          {healthlaneAssets.testimonials.map((src, index) => (
            <button
              key={src}
              type="button"
              className="hl-testimonial-card"
              onClick={() => setModalImage(src)}
              data-cursor-text="View full image"
            >
              <img src={src} alt={`Healthlane user testimonial ${index + 1}`} />
            </button>
          ))}
        </div>

        <section className="mf-thankyou" data-reveal>
          <h2>Thank you.</h2>
          <p>
            Healthlane reimagined health diagnostics as something people can understand and act on — turning 70+ biomarkers into clear insight, proactive habits, and a direct line to care.
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
        <h2>Let's Talk</h2>
      </footer>

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

function FigureMedia({
  src,
  alt,
  fit = "cover",
  background,
  onOpen,
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  background?: string;
  onOpen: (src: string) => void;
}) {
  return (
    <button
      type="button"
      className={`mf-media hl-figma-media hl-figma-media--${fit}`}
      style={background ? { background } : undefined}
      onClick={() => onOpen(src)}
      data-cursor-text="View full image"
      data-reveal
    >
      <img src={src} alt={alt} className="mf-media-img" />
    </button>
  );
}

function PhonePairRow({
  screens,
  onOpen,
}: {
  screens: string[];
  onOpen: (src: string) => void;
}) {
  return (
    <div className="hl-phone-row">
      {screens.map((screen, index) => (
        <button
          key={screen}
          type="button"
          className="hl-iphone-container"
          onClick={() => onOpen(screen)}
          data-cursor-text="View full image"
        >
          <span className="hl-iphone-frame">
            <img src={healthlaneAssets.phoneFrame} alt="" aria-hidden="true" className="hl-iphone-shell" />
            <img src={healthlaneAssets.phoneFrameOverlay} alt="" aria-hidden="true" className="hl-iphone-shell" />
            <span className="hl-iphone-screen">
              <img src={screen} alt={`Healthlane high fidelity screen ${index + 1}`} />
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function chunkPairs(items: string[]) {
  const pairs: string[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

function useCaseStudyScrollReveal(pageRef: RefObject<HTMLElement | null>) {
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
