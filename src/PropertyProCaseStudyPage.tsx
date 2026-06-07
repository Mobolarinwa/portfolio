import { useEffect, useRef, useState, type RefObject } from "react";
import type { Page } from "./App";
import { propertyProAssets, resumeAssets } from "./localAssets";

type PropertyProCaseStudyPageProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "why", label: "Why PropertyPro?" },
  { id: "goals", label: "Goals" },
  { id: "research", label: "User Research" },
  { id: "interview", label: "User Interview" },
  { id: "personas", label: "User personas" },
  { id: "problems", label: "Problem statements" },
  { id: "architecture", label: "Information Architecture" },
  { id: "flows", label: "User Flows" },
  { id: "designs", label: "Designs" },
  { id: "testing", label: "Usability testing" },
  { id: "conclusion", label: "Conclusion" },
];

const GOALS = [
  "Understand the scope of the business",
  "Identify usability issues through user research",
  "Create and validate design solutions",
  "And improve the general aesthetics of the product",
];

const COMPARE_COLUMNS = [
  { logo: propertyProAssets.logos.propertyPro, name: "PropertyPro.ng" },
  { logo: propertyProAssets.logos.privateProperty, name: "private property" },
  { logo: propertyProAssets.logos.realtor, name: "REALTOR.NG" },
  { logo: propertyProAssets.logos.nigeriaPc, name: "Nigeria property centre" },
];

// cell kinds: "text" | "yes" | "no"
const COMPARE_ROWS: { label: string; cells: { kind: "text" | "yes" | "no"; text?: string }[] }[] = [
  {
    label: "Region",
    cells: [
      { kind: "text", text: "Nigeria" },
      { kind: "text", text: "Nigeria" },
      { kind: "text", text: "Nigeria" },
      { kind: "text", text: "Nigeria" },
    ],
  },
  {
    label: "Recommendations",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
  },
  {
    label: "Search",
    cells: [
      { kind: "text", text: "Buy/rent/short let: Address/type" },
      { kind: "text", text: "Buy/rent/short let: Address/type" },
      { kind: "text", text: "Buy/rent/short let: Address/type" },
      { kind: "text", text: "Buy/rent/short let: Address/type" },
    ],
  },
  {
    label: "Price",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
  },
  {
    label: "Save/Bookmarks",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "no" }, { kind: "no" }],
  },
  {
    label: "In-App Messages",
    cells: [{ kind: "no" }, { kind: "no" }, { kind: "no" }, { kind: "no" }],
  },
  {
    label: "Map",
    cells: [
      { kind: "text", text: "Basic" },
      { kind: "text", text: "Basic" },
      { kind: "text", text: "Basic" },
      { kind: "text", text: "Basic" },
    ],
  },
  {
    label: "Pain point",
    cells: [
      { kind: "text", text: "UI is basic and confusing" },
      { kind: "text", text: "Navigation not understood" },
      { kind: "text", text: "UI is not appealing" },
      { kind: "text", text: "No much Options" },
    ],
  },
];

const HEURISTICS = [
  "Consistency and standards",
  "Flexibility and efficiency of use",
  "Help and documentation",
  "Aesthetic and minimalist design",
];

const INTERVIEW_FINDINGS = [
  "I found out that a lot of participants find it difficult to search for their desired apartments and some also complained about too much things to see (Ads).",
  "Some set of users just went to the website search through and selected the apartment they want and just got the agent contact and that was all.",
  "A particular user was not interested in the product due to “bad design” and that she wasn't sure it was legit.",
];

const PROBLEM_STATEMENTS = [
  "Moyosore want to search for a house based on her budgets and location",
  "Moyosore will like to be given recommendations based on agents history",
  "Moyosore will like to know about the neigboorhood of choice more",
  "Moyosore wants to spend less time looking for a house",
  "Moyosore wants to communicate with whosoever is handlig the listing on the website without having to use any third party app",
  "Oladeji wants to manage his listings easily on the app",
  "Oladeji wants to be able to have employees under him assigned to the platform",
  "Oladeji wants to manage enquiries on a listing from the app",
];

const APP_FLOW_PAGES = [
  ["Landing Page", "Result Page", "Filter Search Page", "Map view"],
  ["Message View", "Listing detail View", "List Property Home page"],
];

// Prototype clips live in /public/propertypro and play inline (muted + looping).
// Until each MP4 is present the poster frame shows.
const videoSrc = (file: string) => `${import.meta.env.BASE_URL}propertypro/${file}`;

export function PropertyProCaseStudyPage({ onNavigate }: PropertyProCaseStudyPageProps) {
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
    <main className="mf-page hl-page pp-page" ref={pageRef}>
      <aside className="mf-sidebar" aria-label="PropertyPro case study sections">
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
        <p className="hl-kicker" data-reveal>Case study • 2020</p>
        <h1 className="mf-hero-title" data-reveal>Reimagining how Nigeria rents and buys property</h1>

        <PPMedia src={propertyProAssets.hero} alt="PropertyPro hero" aspect="744 / 492" className="mf-hero-media" onOpen={setModalImage} />

        <div className="mf-meta-row pp-meta-row" data-reveal-stagger>
          <div className="mf-meta-cell">
            <span className="mf-label">Role</span>
            <strong>Product designer</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Duration</span>
            <strong>1 Month</strong>
          </div>
          <div className="mf-meta-cell">
            <span className="mf-label">Skills</span>
            <strong>Product design<br />Information architecture<br />Product strategy</strong>
          </div>
        </div>

        {/* Overview */}
        <section className="mf-section" id="overview" data-reveal>
          <div className="mf-section-label">Overview</div>
          <h2 className="mf-heading-md">About PropertyPro</h2>
          <p className="mf-body">
            PropertyPro.ng formerly ToLet.com.ng is a world-class Nigerian property portal powered by the consolidation of Propertypro.ng and Jumia House Nigeria (formerly Lamudi) which was acquired by Propertypro.ng in October 2017. The name change reflects the company's broader commitment to real estate in Nigeria and its expertise in driving the innovations needed to shape the future of real-estate search solutions in Nigeria. Our website in the Nigerian property market is with over 60,000 property listings which include both public and private property. The listings include homes, houses, lands, shops, office spaces and other commercial properties. Small and large-scale real estate companies in Nigeria who desire to scale up the sales and rentals of their properties can partner with PropertyPro.ng.
          </p>
        </section>

        <PPMedia src={propertyProAssets.overviewPortrait} alt="" aspect="744 / 468" onOpen={setModalImage} />

        {/* Why PropertyPro */}
        <section className="mf-section" id="why" data-reveal>
          <h2 className="mf-heading-md">Why PropertyPro?</h2>
          <div className="mf-body hl-body-stack">
            <p>My friend recently was house hunting and I could feel the stress she was facing walking about with agents, getting disappointed and not getting the right choice of apartment. I decided to visit tolet.ng (now Propertypro) to search for apartments that suits her needs. But interacting with the website actually still felt like walking about with agents I couldn't get to see details about houses, view images in good quality and the website to me needed an upgrade in terms of usability. Even after struggles of viewing houses, I either call agents or connect to agents via whatsapp.</p>
            <p>I felt a property website could offer more than just listing but also give me and experience that can make an individual make payments for an apartment without even visiting the apartment.</p>
          </div>
        </section>

        <PPMedia src={propertyProAssets.why1} alt="" aspect="744 / 423" onOpen={setModalImage} />

        {/* Goals */}
        <section className="mf-section" id="goals" data-reveal>
          <div className="mf-section-label">Goals</div>
          <h2 className="mf-heading-md">What was the project's main goal?</h2>
          <ul className="pp-bullets" data-reveal-stagger>
            {GOALS.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>

        {/* User research — Understanding the product */}
        <section className="mf-section" id="research" data-reveal>
          <div className="mf-section-label">Research</div>
          <h2 className="mf-heading-md">Understanding the product</h2>
          <div className="mf-body hl-body-stack">
            <p>PropertyPro.ng formerly ToLet.com.ng is a world-class Nigerian property portal powered by the consolidation of Propertypro.ng and Jumia House Nigeria (formerly Lamudi) which was acquired by Propertypro.ng in October 2017. (extract from the website)</p>
            <p>It is basically a Nigerian property market with over 60,000 property listings which include both public and private property. The listings include homes, houses, lands, shops, office spaces and other commercial properties. Small and large-scale real estate companies in in the country who desire to scale up the sales and rentals of their properties partner with PropertyPro by listing their properties free on the platform.</p>
          </div>
        </section>

        <PPMedia src={propertyProAssets.why2} alt="" aspect="744 / 423" onOpen={setModalImage} />

        {/* Competitive analysis */}
        <section className="mf-section pp-section--tight" data-reveal>
          <h2 className="mf-heading-md">Competitive analysis</h2>
          <p className="mf-body">
            I started this project by analyzing companies that compete in the same space with PropertyPro. I compared with 3 different companies in Nigeria to see where Propertypro stood relative to them.
          </p>
        </section>

        <div className="pp-compare" data-reveal>
          <div className="pp-compare-row pp-compare-row--head">
            <span className="pp-compare-label">Compare</span>
            {COMPARE_COLUMNS.map((col) => (
              <span className="pp-compare-cell pp-compare-logo" key={col.name}>
                <img src={col.logo} alt={col.name} />
              </span>
            ))}
          </div>
          {COMPARE_ROWS.map((row) => (
            <div className="pp-compare-row" key={row.label}>
              <span className="pp-compare-label">{row.label}</span>
              {row.cells.map((cell, index) => (
                <span className="pp-compare-cell" key={index}>
                  {cell.kind === "text" ? <span className="pp-compare-text">{cell.text}</span> : null}
                  {cell.kind === "yes" ? <YesIcon /> : null}
                  {cell.kind === "no" ? <NoIcon /> : null}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Match between system and the real world */}
        <section className="mf-section pp-section--tight" data-reveal>
          <h2 className="mf-heading-md">Match between system and the real world</h2>
          <p className="mf-body">
            I conducted heuristic evaluation (a method that identifies usability problems by judging an interface based on recognized usability principles.) to identify usability problems with the UI design of the website based on the listed heuristics
          </p>
        </section>

        <div className="pp-heuristics" data-reveal-stagger>
          {HEURISTICS.map((item) => (
            <div className="pp-heuristic" key={item}>
              <span className="pp-heuristic-dot" aria-hidden="true" />
              <span className="pp-heuristic-label">{item}</span>
            </div>
          ))}
        </div>

        <section className="mf-section" data-reveal>
          <p className="mf-body">
            I noticed the website does not meet best practices and found a lot of problems with it as the website wasn't clear, really useful, delightful, learnable and accessible.
          </p>
        </section>

        {/* User Interview */}
        <section className="mf-section pp-section--tight" id="interview" data-reveal>
          <div className="mf-section-label">Research</div>
          <h2 className="mf-heading-md">User Interview</h2>
          <div className="mf-body hl-body-stack">
            <p>To better understand the platform, I conducted 6 user interviews to see what users have to say about the website. I specifically chose people I know are currently looking for apartments in Lagos as my participants.</p>
          </div>
          <ul className="pp-bullets" data-reveal-stagger>
            {INTERVIEW_FINDINGS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <PPMedia src={propertyProAssets.interview} alt="PropertyPro user interview" aspect="744 / 468" onOpen={setModalImage} />

        <section className="mf-section" data-reveal>
          <p className="mf-body">
            After the interviews were done, I took note of common issues users stated and I could deduce that main issues was that users find it hard to get their desired search results since the filter options were not detailed enough. And also the fact that they have to contact the agent via call to continue the process wasn't too impressive.
          </p>
        </section>

        <div className="pp-quote" data-reveal>
          <p className="pp-quote-text">“ I will rather just continue with collecting numbers of agents from friends than getting numbers from that site because I will trust them more”</p>
          <p className="pp-quote-by">- said a participant.</p>
        </div>

        {/* User personas */}
        <section className="mf-section pp-section--tight" id="personas" data-reveal>
          <div className="mf-section-label">User personas</div>
          <h2 className="mf-heading-md">Who did i design for?</h2>
          <p className="mf-body">After the basic interviews and insights, I created two different personas</p>
          <ul className="pp-bullets pp-bullets--labeled" data-reveal-stagger>
            <li><strong>Moyosore:</strong> a developer who recently got employed to a tech company on the Island, Lagos. She is recently squatting with a colleague and really needs to find a space for herself.</li>
            <li><strong>Oladeji:</strong> an estate agent who wants to list his properties on the most popular listing platform in the country.</li>
          </ul>
        </section>

        <PPMedia src={propertyProAssets.personas[0]} alt="PropertyPro persona — Moyosore" aspect="744 / 420" onOpen={setModalImage} />
        <PPMedia src={propertyProAssets.personas[1]} alt="PropertyPro persona — Oladeji" aspect="744 / 420" onOpen={setModalImage} />

        <section className="mf-section" data-reveal>
          <p className="mf-body">
            With a great understanding of who I am designing for, I created problem statements to address each personas
          </p>
        </section>

        {/* Problem statements */}
        <section className="mf-section" id="problems" data-reveal>
          <div className="pp-statements" data-reveal>
            <p className="pp-statements-subheading">Problem statements</p>
            <ul className="pp-bullets">
              {PROBLEM_STATEMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Information architecture / ideation */}
        <section className="mf-section pp-section--tight" id="architecture" data-reveal>
          <div className="mf-section-label">Ideation</div>
          <h2 className="mf-heading-md">Creating potential solutions</h2>
          <div className="mf-body hl-body-stack">
            <p>After identifying problems, I sketched out potential solutions in lo -fi wireframes and my main focus was the Landing Page, Search, Navigation and Messaging.</p>
            <p>This helped me with the architecture of the website. The important menus were selected and arrange in the order of importance. The information architecture laid the foundation for the design process and eliminated uncertainty about where information will be located.</p>
          </div>
        </section>

        <PPMedia src={propertyProAssets.informationArchitecture} alt="PropertyPro information architecture" aspect="744 / 639" onOpen={setModalImage} />

        <section className="mf-section pp-section--caption" data-reveal>
          <p className="mf-body">Information Architecture</p>
        </section>

        {/* App flow / user flows */}
        <section className="mf-section pp-section--tight" id="flows" data-reveal>
          <div className="mf-section-label">Ideation</div>
          <h2 className="mf-heading-md">App flow</h2>
          <p className="mf-body">
            With the new features I will be adding to the website, I was able to create a user flow for the website putting into consideration business implications.
          </p>
        </section>

        <div className="pp-quote pp-quote--columns" data-reveal>
          <p className="pp-quote-subheading">The basic pages I focused on are the</p>
          <div className="pp-flow-cols">
            {APP_FLOW_PAGES.map((col, index) => (
              <ul className="pp-bullets" key={index}>
                {col.map((page) => (
                  <li key={page}>{page}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <PPMedia src={propertyProAssets.appFlow} alt="PropertyPro app flow" aspect="744 / 642" onOpen={setModalImage} />

        <section className="mf-section pp-section--caption" data-reveal>
          <p className="mf-body">User flow</p>
        </section>

        {/* Designs — Landing Page */}
        <section className="mf-section pp-section--tight" id="designs" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Landing Page</h2>
          <div className="mf-body hl-body-stack">
            <p>On the Hero page, defining the business proposition was the main aim and providing you the search parameters to check out what the hero message sold to the user. The current hero message doesn't really sell the full idea of the company so it was redefined and the image/background was changed to a more aesthetically pleasing image.</p>
            <p>After the Hero page, basic filtered results are share with a user who failed to use the search feature but chose to scroll down to explore the page (Exploring the website by category and by location).</p>
            <p>Defining how the system also works to a user was presented to help a user understand processes to get his/her desired need.</p>
            <p>Banners that also sell the listing features for the website were made available for users who like to start listing properties to get started.</p>
            <p>Next is a category displaying an array of featured listings.</p>
          </div>
        </section>

        <div className="pp-landing-pair" data-reveal-stagger>
          <figure className="pp-landing-item">
            <button
              type="button"
              className="pp-figure"
              onClick={() => setModalImage(propertyProAssets.landingVisitor)}
              data-cursor-text="View full image"
            >
              <img src={propertyProAssets.landingVisitor} alt="Home page as a visitor" />
            </button>
            <figcaption>Home page as a visitor</figcaption>
          </figure>
          <figure className="pp-landing-item">
            <button
              type="button"
              className="pp-figure"
              onClick={() => setModalImage(propertyProAssets.landingSignedIn)}
              data-cursor-text="View full image"
            >
              <img src={propertyProAssets.landingSignedIn} alt="Homepage when signed In" />
            </button>
            <figcaption>Homepage when signed In</figcaption>
          </figure>
        </div>

        {/* Search Result Page */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Search Result Page</h2>
          <p className="mf-body">
            Based on inputs from the search field on the home page, the user is presented with the best results. Users have the choice to turn on maps that shows areas where listings are located based on search results and also have ability to quick view of any selected marker.
          </p>
        </section>

        <PPVideo src={videoSrc("search.mp4")} poster={propertyProAssets.searchResult} label="PropertyPro search result page" />

        {/* Filter search Result Page */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Filter search Result Page</h2>
          <p className="mf-body">
            I designed a more robust filter which can be accessed by clicking on the more filter button on the search panel strip below the navigation bar. This action brings out a side panel for a user to filter more on the result using available actions like pricing, amenities e.t.c
          </p>
        </section>

        <PPVideo src={videoSrc("filter.mp4")} poster={propertyProAssets.filterSearch} label="PropertyPro filter search result page" />

        {/* Listing Details Page */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Listing Details Page</h2>
          <p className="mf-body">
            I designed a page that showcase the full detailed of a selected listing. The page contains some basic description, amenities, Price, images and marketer/Agent details. This page allows a user to directly enquire about the listing from the agent with the send message feature added.
          </p>
        </section>

        <PPFigure src={propertyProAssets.listingDetails} alt="PropertyPro listing details page" onOpen={setModalImage} />

        {/* Sign Up Process */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Sign Up Process</h2>
          <p className="mf-body">
            I designed the signup to distinguish a Moyosore(customer) from a Oladeji(Agent) to give a smooth onboarding to each person. No too much difference, just a view to add some basic company details for an agent is the difference.
          </p>
        </section>

        <PPVideo src={videoSrc("signup.mp4")} poster={propertyProAssets.signUp} label="PropertyPro sign up process" />

        {/* List a Property */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">List a Property</h2>
          <p className="mf-body">
            Oladeji is an agent and will like to list his properties on the website, He finds the “List your Property” menu on the nav bar or let's say he saw the banner on any page advertising to him to list his properties, I designed a page to onboard a user on what it takes to list a property and its benefits. Also shared some testimonials and FAQs to help the user understand more.
          </p>
        </section>

        <PPFigure src={propertyProAssets.listProperty} alt="PropertyPro list a property page" onOpen={setModalImage} />

        {/* Message Page */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Message Page</h2>
          <p className="mf-body">
            A message view was added to the website. This will allow Oladeji and Moyosore communicate well. And the message is equipped with a bot that lets an agent know the particular property a message is sent for.
          </p>
        </section>

        <PPMedia src={propertyProAssets.message} alt="PropertyPro message page" aspect="744 / 428" onOpen={setModalImage} />

        {/* Adding a Property Flow */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Adding a Property Flow</h2>
          <p className="mf-body">
            The adding a property feature has been made seamless. If when registering to the platform, you registered to use the service to list your apartment, you are provided with a company profile view where you can manage your details, see your listings and reviews you have on the platform already. I designed the adding property in a wizard format to reduce too much information at once as seen below
          </p>
        </section>

        <PPVideo src={videoSrc("add-property.mp4")} poster={propertyProAssets.addProperty} label="PropertyPro adding a property flow" />

        {/* Full Interactive Prototype */}
        <section className="mf-section pp-section--tight" data-reveal>
          <div className="mf-section-label">Designs</div>
          <h2 className="mf-heading-md">Full Interactive Prototype</h2>
          <p className="mf-body">
            Using Adobe XD, it was easy for me to prototype the design.I prototyped all the major pages and the basic interactions and micro interactions to give users the feel of a live app. Click here for an interactive xd Prototype for you to try out the solution created for the Propertypro website.
          </p>
        </section>

        <PPVideo src={videoSrc("prototype.mp4")} poster={propertyProAssets.prototype} label="PropertyPro full interactive prototype" />

        {/* Usability testing */}
        <section className="mf-section pp-section--tight" id="testing" data-reveal>
          <div className="mf-section-label">Usability testing</div>
          <h2 className="mf-heading-md">Testing the design with users and the market</h2>
          <p className="mf-body">
            To know if my design has helped solve users issues as highlighted earlier, I invited users to test the prototype against the PropertyPro website giving specific tasks and objectives taking note of time used and problems faced(if any). The result was welcoming as positive feedback was received from every user and the time taken to do specific task reduced.
          </p>
        </section>

        <PPMedia src={propertyProAssets.testing} alt="PropertyPro usability testing" aspect="744 / 558" onOpen={setModalImage} />

        {/* Conclusion */}
        <section className="mf-section" id="conclusion" data-reveal>
          <div className="mf-section-label">Conclusion</div>
          <h2 className="mf-heading-md">Innovative hands-on strategies for enhanced growth potential.</h2>
          <p className="mf-body">
            This has been a challenging and rewarding journey. And i have really learnt a lot working on this project. I hope PropertyPro gets to see this and try to rethink their current website, and push the business forward by opening doors to great features to benefit the users. As we know, design and innovation are major factors in a successful business.
          </p>
        </section>

        <section className="mf-thankyou" data-reveal>
          <h2>Thank you.</h2>
          <p>Thank you for taking your time to read my work. Feel free to connect with me</p>
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
            <img src={modalImage} alt="Full design view" className="mf-modal-img" />
          </div>
        </div>
      )}
    </main>
  );
}

function PPMedia({
  src,
  alt,
  aspect,
  className,
  onOpen,
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
  onOpen: (src: string) => void;
}) {
  return (
    <button
      type="button"
      className={`mf-media pp-media${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: aspect }}
      onClick={() => onOpen(src)}
      data-cursor-text="View full image"
      data-reveal
    >
      <img src={src} alt={alt} className="mf-media-img" />
    </button>
  );
}

function PPFigure({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: (src: string) => void;
}) {
  return (
    <button
      type="button"
      className="pp-figure pp-figure--block"
      onClick={() => onOpen(src)}
      data-cursor-text="View full image"
      data-reveal
    >
      <img src={src} alt={alt} />
    </button>
  );
}

function PPVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="pp-figure pp-figure--block pp-video" data-reveal>
        <img src={poster} alt={label} />
      </div>
    );
  }

  return (
    <video
      className="pp-video pp-figure--block"
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      onError={() => setFailed(true)}
      data-reveal
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function YesIcon() {
  return (
    <svg className="pp-icon pp-icon--yes" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Yes">
      <circle cx="16" cy="16" r="15" fill="#2E90FA" />
      <path d="M10 16.5l4 4 8-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NoIcon() {
  return (
    <svg className="pp-icon pp-icon--no" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="No">
      <circle cx="16" cy="16" r="15" fill="#F79009" />
      <circle cx="16" cy="16" r="8.5" stroke="#fff" strokeWidth="2" />
      <path d="M10 22l12-12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
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
