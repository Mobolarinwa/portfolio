import { useEffect } from "react";
import type { Page } from "./App";
import { Navigation } from "./Navigation";
import { resumeAssets } from "./localAssets";

type ResumePageProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

type ExperienceItem = {
  role: string;
  company: string;
  date: string;
  location: string;
  link: string;
  bullets: string[];
};

type LinkedRow = {
  title: string;
  subtitle: string;
  date: string;
  link?: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

const summary =
  "Senior Product Designer with 8+ years of experience specializing in FinTech, Wealth Management, and Neobanking. Expert at scaling complex financial ecosystems; notably drove €35M+ in AUM growth at Moonfare and built a full neobank architecture at Carbon. Proven track record in optimizing Tiered KYC and loan/mortgage workflows, resulting in a 60% reduction in user drop-off and 90% positive sentiment. Advanced proficiency in Figma-driven design systems and AI-assisted workflows to automate enterprise-grade financial services.";

const experiences: ExperienceItem[] = [
  {
    role: "Product Designer",
    company: "Moonfare GmbH",
    date: "2022 — Now",
    location: "Berlin, Germany",
    link: "https://www.moonfare.com/",
    bullets: [
      'Led end-to-end design for "Semi-Liquid" fund products on web and mobile, automating reinvestment flows to drive €35M+ in AUM.',
      "Designed the MPIO portal for sophisticated investors, facilitating €300M+ in commitments through intuitive data dashboards.",
      "Conceptualized an AI forecasting tool to predict investor drawdowns, reducing late payments by 40%.",
      "Overhauled internal Document Centre architecture, reducing retrieval time by 60%.",
    ],
  },
  {
    role: "Lead Product Designer",
    company: "Healthlane",
    date: "2021 — 2022",
    location: "Lagos, Nigeria",
    link: "https://www.linkedin.com/company/healthlane/posts/?feedView=all",
    bullets: [
      "Defined the entire patient-doctor digital workflow, successfully reducing total consultation time to under one hour through strategic process optimization.",
      "Led the UX research and strategy for a preventive healthcare platform, launching AI-powered insights that translated raw biometric data into actionable lifestyle changes.",
      "Designed intuitive interfaces that simplified complex health metrics, empowering users to take proactive control of their well-being.",
      "Established the initial modular design system, increasing the delivery speed of new features across web and mobile platforms.",
    ],
  },
  {
    role: "Product Designer",
    company: "Carbon",
    date: "2020 — 2021",
    location: "Lagos, Nigeria",
    link: "https://www.getcarbon.co/",
    bullets: [
      "Led the strategic redesign to transition the platform into a full banking ecosystem including Credit, Savings, and Payments.",
      "Designed a 3-tier KYC framework that matched documentation requirements to user needs, accelerating onboarding and reducing friction.",
      "Re-engineered the loan request flow, resulting in 90% positive user feedback and a 60% reduction in user drop-off.",
    ],
  },
  {
    role: "Senior Product designer",
    company: "Bongalow",
    date: "2020 — 2022",
    location: "Lagos, Nigeria",
    link: "https://www.linkedin.com/company/bongalow/",
    bullets: [
      "Built a comprehensive mortgage platform covering loan application, automated pre-qualification, and verification.",
      "Designed the internal portal for banks to manage mortgage payments and match loan offers, streamlining B2B financial operations.",
      "Launched native mobile and web applications to facilitate seamless mortgage management for homeowners.",
      "Built a centralized design system from scratch to ensure UI consistency and speed up engineering handovers.",
    ],
  },
  {
    role: "Product Designer",
    company: "Metro Africa Xpress",
    date: "2020 — 2020",
    location: "Lagos, Nigeria",
    link: "https://www.maxdrive.ai/",
    bullets: [
      "Designed a new app menu for on-demand delivery services to enable a rapid business pivot.",
      "Designed MetroGov, a government-focused product for registering and monitoring bikers for regulatory compliance.",
    ],
  },
  {
    role: "Product Designer",
    company: "Seamfix",
    date: "2018 — 2019",
    location: "Lagos, Nigeria",
    link: "https://seamfix.com/#",
    bullets: [
      "Led design for iClocker (Time/Attendance) and BioRegistra (Digital Forms), delivering impactful user experiences.",
      "Facilitated kick-off meetings, conducted user interviews, and led design sessions and user testing.",
    ],
  },
  {
    role: "Product Designer",
    company: "Longbridge Technologies Limited",
    date: "2017 — 2018",
    location: "Lagos, Nigeria",
    link: "https://longbridgetech.com/",
    bullets: [
      "Worked on Finacle Banking systems for top-tier Nigerian banks, focusing on enhancing digital banking functionality.",
      "Led design for a fashion e-commerce marketplace and School Management Solution, driving engagement through intuitive UI.",
    ],
  },
  {
    role: "Graphics and 3D design intern",
    company: "Gamsole",
    date: "2015 — 2015",
    location: "Lagos, Nigeria",
    link: "https://www.linkedin.com/company/gamsole/about/",
    bullets: ["Created 3D assets, animations, and interfaces for mobile games."],
  },
];

const volunteering: LinkedRow[] = [
  {
    title: "Adplist",
    subtitle: "Design Mentor",
    date: "2022 — Now",
    link: "https://adplist.org/mentors/mobolarinwa-fakeyede",
  },
  {
    title: "DesignPal",
    subtitle: "UI Design Education Mentor",
    date: "2022 — 2023",
    link: "https://x.com/design__pal",
  },
];

const skills: SkillGroup[] = [
  {
    title: "Core",
    items: ["FinTech Design", "Wealth Management", "Neobanking", "Enterprise SaaS", "Healthcare"],
  },
  {
    title: "Communication & Collaboration",
    items: [
      "Cross-Functional Team Leadership",
      "Client Relationship Management",
      "Stakeholder Communication",
    ],
  },
  {
    title: "Design",
    items: [
      "UI/UX Design",
      "Interaction Design",
      "Wireframing",
      "Rapid Prototyping",
      "Information Architecture",
    ],
  },
  {
    title: "Technical",
    items: [
      "Figma (Advanced)",
      "AI-Assisted Design (Claude, Codex, Cursor, Lovable)",
      "Mobile (iOS/Android) Guidelines.",
    ],
  },
];

const certifications: LinkedRow[] = [
  {
    title: "AI for Product Designers",
    subtitle: "Maven",
    date: "2025",
    link: "https://maven.com/wrap-up/b0ecf16b",
  },
  {
    title: "Become a Visual Trendsetter",
    subtitle: "Maven",
    date: "2023",
    link: "https://maven.com/certificate/JDesvjVt",
  },
  {
    title: "Human- Computer Interaction - HCI",
    subtitle: "IxDF - Interaction Design Foundation",
    date: "2019",
    link: "https://ixdf.org/members/mobolarinwa-fakeyede/certificate/course/fltqnHSHvQBZbG0BqQ",
  },
  {
    title: "User experience: The beginner’s guide",
    subtitle: "IxDF - Interaction Design Foundation",
    date: "2019",
    link: "https://ixdf.org/members/mobolarinwa-fakeyede/certificate/course/Px5SmMbdS",
  },
  {
    title: "Conducting usability testing",
    subtitle: "IxDF - Interaction Design Foundation",
    date: "2019",
    link: "https://ixdf.org/members/mobolarinwa-fakeyede/certificate/course/fltqnHSHvQBZg5Nw9j",
  },
];

export function ResumePage({ activePage, onNavigate }: ResumePageProps) {
  useResumeScrollReveal();

  return (
    <main className="resume-page resume-figma-page">
      <header className="resume-figma-header" data-reveal>
        <div className="resume-figma-avatar">
          <img src={resumeAssets.profile} alt="Mobolarinwa Fakeyede Oladeji" />
        </div>
        <div className="resume-figma-identity">
          <h1>Mobolarinwa Fakeyede Oladeji</h1>
          <p>Senior Product Designer </p>
        </div>
        <a
          className="resume-figma-download"
          href="https://drive.google.com/file/d/15JzHtEILxgC5i6A-wv6D7b5NVbMgVD4r/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          data-cursor-text="Download"
        >
          Download PDF
        </a>
      </header>

      <div className="resume-figma-layout">
        <aside className="resume-figma-sidebar" data-reveal>
          <p>{summary}</p>
          <a href="https://www.linkedin.com/in/bfakeyede" target="_blank" rel="noreferrer" data-cursor-text="Visit">
            <img src={resumeAssets.linkedin} alt="" />
            Linkedin
          </a>
        </aside>

        <div className="resume-figma-details">
          <section className="resume-figma-section" aria-label="Experience" data-reveal>
            <h2>Experience</h2>
            <div className="resume-figma-experience-list" data-reveal-stagger>
              {experiences.map((item) => (
                <ExperienceBlock item={item} key={`${item.company}-${item.date}`} />
              ))}
            </div>
          </section>

          <section className="resume-figma-section" aria-label="Volunteering" data-reveal>
            <h2>Volunteering</h2>
            <div className="resume-figma-simple-list" data-reveal-stagger>
              {volunteering.map((item) => (
                <LinkedInfoRow item={item} key={item.title} />
              ))}
            </div>
          </section>

          <section className="resume-figma-section" aria-label="Skills" data-reveal>
            <h2>Skills</h2>
            <div className="resume-figma-skills" data-reveal-stagger>
              {skills.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-figma-section" aria-label="Education" data-reveal>
            <h2>Education</h2>
            <div className="resume-figma-simple-list" data-reveal-stagger>
              <LinkedInfoRow
                item={{
                  title: "Federal University of Technology, Akure, (FUTA) Nigeria",
                  subtitle: "B.Tech Industrial design",
                  date: "2011 — 2016",
                  link: "https://futa.edu.ng/",
                }}
              />
            </div>
          </section>

          <section className="resume-figma-section" aria-label="Licenses & certifications" data-reveal>
            <h2>Licenses & certifications</h2>
            <div className="resume-figma-simple-list" data-reveal-stagger>
              {certifications.map((item) => (
                <LinkedInfoRow item={item} key={item.title} />
              ))}
            </div>
          </section>

          <section className="resume-figma-section" aria-label="Honors & awards" data-reveal>
            <h2>Honors &amp; awards</h2>
            <div className="resume-figma-simple-list" data-reveal-stagger>
              <LinkedInfoRow
                item={{
                  title: "Best Graduating Student in  Graphics Repromethods  Department of Industrial Design",
                  subtitle: "Issued by Federal University Of Technology Akure",
                  date: "2017",
                }}
              />
            </div>
          </section>
        </div>
      </div>

      <footer className="resume-figma-contact" data-reveal>
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

      <Navigation activePage={activePage} onNavigate={onNavigate} className="resume-nav" />
    </main>
  );
}

function ExperienceBlock({ item }: { item: ExperienceItem }) {
  return (
    <article className="resume-figma-experience">
      <div className="resume-figma-job-meta">
        <h3>{item.role}</h3>
        <a href={item.link} target="_blank" rel="noreferrer" data-cursor-text="Visit">
          {item.company}
        </a>
        <p>{item.date}</p>
        <p>{item.location}</p>
      </div>
      <ul className="resume-figma-experience-copy">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

function LinkedInfoRow({ item }: { item: LinkedRow }) {
  const title = item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer" data-cursor-text="Visit">
      {item.title}
    </a>
  ) : (
    <h3>{item.title}</h3>
  );

  return (
    <article className="resume-figma-info-row">
      <div>{title}</div>
      <div>
        <p>{item.subtitle}</p>
        <p>{item.date}</p>
      </div>
    </article>
  );
}

function useResumeScrollReveal() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".resume-figma-page");
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".resume-figma-page [data-reveal], .resume-figma-page [data-reveal-stagger]",
      ),
    );

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
        root: page,
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
