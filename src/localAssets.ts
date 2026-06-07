import access from "./assets/design/home/access-app.png";
import accessLogo from "./assets/design/home/access-logo.svg";
import facebook from "./assets/design/home/facebook.svg";
import health from "./assets/design/home/health-phone.png";
import healthLogo from "./assets/design/home/healthlane-logo.svg";
import linkedin from "./assets/design/home/linkedin.svg";
import moonfare from "./assets/design/home/moonfare-dashboard.png";
import moonfareLogo from "./assets/design/home/moonfare-logo.svg";
import photo from "./assets/design/home/photography.png";
import propertyProFolder from "./assets/design/home/property-pro-folder.png";
import propertyProLogo from "./assets/design/home/property-pro-logo.png";
import propertyProLogoHover from "./assets/design/home/property-pro-logo-hover.png";
import x from "./assets/design/home/x.svg";
import aboutAntigravity from "./assets/design/about/antigravity-1.svg";
import aboutClaude from "./assets/design/about/claude-color-1.svg";
import aboutCodex from "./assets/design/about/codex-1.svg";
import aboutFinnBw from "./assets/design/about/finn-wilder-bw-close-up-portrait.png";
import aboutFinnClose from "./assets/design/about/finn-wilder-close-up-portrait.png";
import aboutGallery1 from "./assets/design/about/gallery-1.png";
import aboutGallery2 from "./assets/design/about/gallery-2.png";
import aboutGallery3 from "./assets/design/about/gallery-3.png";
import aboutGallery4 from "./assets/design/about/gallery-4.png";
import aboutGallery5 from "./assets/design/about/gallery-5.png";
import aboutGallery6 from "./assets/design/about/gallery-6.png";
import aboutLinkedin from "./assets/design/about/linkedin-gray.svg";
import aboutMail from "./assets/design/about/mail-01.svg";
import aboutPhone from "./assets/design/about/phone-call-01.svg";
import aboutToolVector from "./assets/design/about/tool-vector.svg";
import aboutToolVector1 from "./assets/design/about/tool-vector-1.svg";
import aboutToolVector2 from "./assets/design/about/tool-vector-2.svg";
import akinmukomi from "./assets/design/modal/akinmukomi.png";
import biunca from "./assets/design/modal/biunca.png";
import close from "./assets/design/modal/close.svg";
import ebong from "./assets/design/modal/ebong.png";
import emmanuel from "./assets/design/modal/emmanuel.png";
import ewa from "./assets/design/modal/ewa.png";
import funmilola from "./assets/design/modal/funmilola.png";
import michael from "./assets/design/modal/michael.png";
import verifiedInner from "./assets/design/modal/verified-inner.svg";
import verifiedOuter from "./assets/design/modal/verified-outer.svg";
import resumeArrow from "./assets/design/resume/arrow-up-right.svg";
import resumeAvatar from "./assets/design/resume/avatar.png";
import resumeLinkedin from "./assets/design/resume/linkedin-gray.svg";
import resumeMail from "./assets/design/resume/mail-01.svg";
import resumePhone from "./assets/design/resume/phone-call-01.svg";
import resumeProfile from "./assets/design/resume/profile-content.png";
import mfIpadFrame from "./assets/design/moonfare/ipad-frame.png";
import mfHeroIpad from "./assets/design/moonfare/hero-ipad.png";
import mfDashboardScreenshot from "./assets/design/moonfare/dashboard-screenshot.png";
import mfPortrait1 from "./assets/design/moonfare/portrait-1.png";
import mfPortrait2 from "./assets/design/moonfare/portrait-2.png";
import mfScreenOnboarding from "./assets/design/moonfare/screen-onboarding.png";
import mfWireframes from "./assets/design/moonfare/wireframes.png";
import mfScreenAdvisor from "./assets/design/moonfare/screen-advisor.png";
import mfScreenPortfolioNew from "./assets/design/moonfare/screen-portfolio-new.png";
import mfScreenDashboardNew from "./assets/design/moonfare/screen-dashboard-new.png";
import mfScreenPortfolio2 from "./assets/design/moonfare/screen-portfolio-2.png";
import mfScreenLanding from "./assets/design/moonfare/screen-landing.png";
import mfScreenFunds from "./assets/design/moonfare/screen-funds.png";
import mfScreenOldPortfolio from "./assets/design/moonfare/screen-old-portfolio.png";
import mfScreenLanding2 from "./assets/design/moonfare/screen-landing-2.png";
import mfMoodTaxonomy from "./assets/design/moonfare/mood-taxonomy.png";
import mfMoodImg110 from "./assets/design/moonfare/mood-img110.png";
import mfMoodImg129 from "./assets/design/moonfare/mood-img129.png";
import mfMoodMontfort from "./assets/design/moonfare/mood-montfort.png";
import mfMoodMontfortAbout from "./assets/design/moonfare/mood-montfort-about.png";
import mfMoodMontfortFunds from "./assets/design/moonfare/mood-montfort-funds.png";
import mfMoodMontfortCompanies from "./assets/design/moonfare/mood-montfort-companies.png";
import mfMoodScreen1 from "./assets/design/moonfare/mood-screen-1.png";
import mfMoodScreen2 from "./assets/design/moonfare/mood-screen-2.png";
import mfMoodImg121 from "./assets/design/moonfare/mood-img121.png";
import mfMoodImg122 from "./assets/design/moonfare/mood-img122.png";
import mfMoodImg21 from "./assets/design/moonfare/mood-img21.png";
import mfMoodImg13 from "./assets/design/moonfare/mood-img13.png";
import mfMoodImg125 from "./assets/design/moonfare/mood-img125.png";
import mfMoodImg126 from "./assets/design/moonfare/mood-img126.png";
import mfMoodImg22 from "./assets/design/moonfare/mood-img22.png";
import mfMoodImg24 from "./assets/design/moonfare/mood-img24.png";
import mfMoodScreen1208 from "./assets/design/moonfare/mood-screen-1208.png";
import mfMoodScreen1213 from "./assets/design/moonfare/mood-screen-1213.png";
import mfFullpageDesign from "./assets/design/moonfare/fullpage-design.png";
import mfFullpagePortfolio from "./assets/design/moonfare/fullpage-portfolio.png";
import mfFullpageReporting from "./assets/design/moonfare/fullpage-reporting.png";
import mfCarousel2 from "./assets/design/moonfare/carousel-2.png";
import mfCarousel3 from "./assets/design/moonfare/carousel-3.png";
import mfCarousel4 from "./assets/design/moonfare/carousel-4.png";

const svgDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const healthlaneAsset = (fileName: string) =>
  new URL(`./assets/design/healthlane/${fileName}`, import.meta.url).href;
const propertyProAsset = (fileName: string) =>
  new URL(`./assets/design/propertypro/${fileName}`, import.meta.url).href;
const photographyAsset = (fileName: string) =>
  new URL(`./assets/design/photography/${fileName}`, import.meta.url).href;

export const portfolioAssets = {
  health,
  moonfare,
  access,
  photo,
  healthLogo,
  moonfareLogo,
  accessLogo,
  propertyProFolder,
  propertyProLogo,
  propertyProLogoHover,
  linkedin,
  x,
  facebook,
  star: svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2.5l2.4 6.5 6.9 2.4-6.9 2.3L12 20.5l-2.4-6.8-6.9-2.3L9.6 9 12 2.5z" fill="#ffffff"/>
    </svg>
  `),
};

export const moonfareAssets = {
  ipadFrame: mfIpadFrame,
  heroIpad: mfHeroIpad,
  dashboardScreenshot: mfDashboardScreenshot,
  portrait1: mfPortrait1,
  portrait2: mfPortrait2,
  screenOnboarding: mfScreenOnboarding,
  wireframes: mfWireframes,
  screenAdvisor: mfScreenAdvisor,
  screenPortfolioNew: mfScreenPortfolioNew,
  screenDashboardNew: mfScreenDashboardNew,
  screenPortfolio2: mfScreenPortfolio2,
  screenLanding: mfScreenLanding,
  screenFunds: mfScreenFunds,
  screenOldPortfolio: mfScreenOldPortfolio,
  screenLanding2: mfScreenLanding2,
  moodboard: {
    taxonomy: mfMoodTaxonomy,
    img110: mfMoodImg110,
    img129: mfMoodImg129,
    montfort: mfMoodMontfort,
    montfortAbout: mfMoodMontfortAbout,
    montfortFunds: mfMoodMontfortFunds,
    montfortCompanies: mfMoodMontfortCompanies,
    screen1: mfMoodScreen1,
    screen2: mfMoodScreen2,
    img121: mfMoodImg121,
    img122: mfMoodImg122,
    img21: mfMoodImg21,
    img13: mfMoodImg13,
    img125: mfMoodImg125,
    img126: mfMoodImg126,
    img22: mfMoodImg22,
    img24: mfMoodImg24,
    screen1208: mfMoodScreen1208,
    screen1213: mfMoodScreen1213,
  },
  carousel: [moonfare, mfCarousel2, mfCarousel3, mfCarousel4],
  fullpageDesign: mfFullpageDesign,
  fullpagePortfolio: mfFullpagePortfolio,
  fullpageReporting: mfFullpageReporting,
};

export const healthlaneAssets = {
  heroPhone: healthlaneAsset("hero-phone.png"),
  clinicPortrait: healthlaneAsset("clinic-portrait.png"),
  testingPortrait: healthlaneAsset("testing-portrait.jpg"),
  whiteboard: healthlaneAsset("research-media.png"),
  consultation: healthlaneAsset("flow-media.png"),
  informationArchitecture: healthlaneAsset("persona-1.png"),
  jobsToBeDone: healthlaneAsset("persona-2.png"),
  userFlow: healthlaneAsset("persona-3.png"),
  firstIterations: healthlaneAsset("first-iterations.png"),
  firstIterationScreens: [
    healthlaneAsset("iteration-figma-1.png"),
    healthlaneAsset("iteration-figma-2.png"),
    healthlaneAsset("iteration-figma-3.png"),
    healthlaneAsset("iteration-figma-4.png"),
    healthlaneAsset("iteration-figma-5.png"),
    healthlaneAsset("iteration-figma-6.png"),
  ],
  prototypeScreens: [
    healthlaneAsset("proto-1.png"),
    healthlaneAsset("proto-2.png"),
    healthlaneAsset("proto-3.png"),
    healthlaneAsset("proto-4.png"),
    healthlaneAsset("proto-5.png"),
    healthlaneAsset("proto-6.png"),
  ],
  mood: [
    healthlaneAsset("mood-1.png"),
    healthlaneAsset("mood-2.png"),
    healthlaneAsset("mood-3.png"),
    healthlaneAsset("mood-4.png"),
    healthlaneAsset("mood-5.png"),
    healthlaneAsset("mood-6.png"),
    healthlaneAsset("mood-7.png"),
    healthlaneAsset("mood-8.png"),
    healthlaneAsset("mood-9.png"),
    healthlaneAsset("mood-10.png"),
  ],
  designSystem: {
    type: healthlaneAsset("design-system-type.png"),
    buttons: healthlaneAsset("design-system-buttons.png"),
    colors: healthlaneAsset("design-system-colors.png"),
    components: healthlaneAsset("design-system-components.png"),
  },
  personaAvatars: [
    healthlaneAsset("persona-paul.png"),
    healthlaneAsset("persona-aisha.png"),
    healthlaneAsset("persona-david.png"),
  ],
  phoneFrame: healthlaneAsset("iphone-frame.png"),
  phoneFrameOverlay: healthlaneAsset("iphone-frame-overlay.png"),
  screens: [
    healthlaneAsset("screen-1.png"),
    healthlaneAsset("screen-2.png"),
    healthlaneAsset("screen-3.png"),
    healthlaneAsset("screen-4.png"),
    healthlaneAsset("screen-5.png"),
    healthlaneAsset("screen-6.png"),
    healthlaneAsset("screen-7.png"),
    healthlaneAsset("screen-8.png"),
    healthlaneAsset("screen-9.png"),
    healthlaneAsset("screen-10.png"),
    healthlaneAsset("screen-11.png"),
    healthlaneAsset("screen-12.png"),
  ],
  testimonials: [
    healthlaneAsset("testimonial-1.png"),
    healthlaneAsset("testimonial-2.png"),
    healthlaneAsset("testimonial-3.png"),
    healthlaneAsset("testimonial-4.png"),
  ],
};

export const propertyProAssets = {
  hero: propertyProAsset("hero.png"),
  overviewPortrait: propertyProAsset("overview-portrait.png"),
  why1: propertyProAsset("why-1.png"),
  why2: propertyProAsset("why-2.png"),
  logos: {
    propertyPro: propertyProAsset("logo-propertypro.png"),
    privateProperty: propertyProAsset("logo-privateproperty.png"),
    realtor: propertyProAsset("logo-realtor.png"),
    nigeriaPc: propertyProAsset("logo-nigeriapc.png"),
  },
  interview: propertyProAsset("interview.png"),
  personas: [
    propertyProAsset("persona-1.png"),
    propertyProAsset("persona-2.png"),
  ],
  informationArchitecture: propertyProAsset("ia.png"),
  appFlow: propertyProAsset("app-flow.png"),
  landingVisitor: propertyProAsset("landing-visitor.png"),
  landingSignedIn: propertyProAsset("landing-signedin.png"),
  searchResult: propertyProAsset("video-search.png"),
  filterSearch: propertyProAsset("video-filter.png"),
  signUp: propertyProAsset("video-signup.png"),
  addProperty: propertyProAsset("video-addproperty.png"),
  prototype: propertyProAsset("video-prototype.png"),
  listingDetails: propertyProAsset("listing-details.png"),
  listProperty: propertyProAsset("list-property.png"),
  message: propertyProAsset("message.png"),
  testing: propertyProAsset("testing.png"),
};

export const resumeAssets = {
  avatar: resumeAvatar,
  profile: resumeProfile,
  arrow: resumeArrow,
  linkedin: resumeLinkedin,
  mail: resumeMail,
  phone: resumePhone,
};

export const aboutAssets = {
  heroClose: aboutFinnClose,
  heroBw: aboutFinnBw,
  gallery: [
    aboutGallery1,
    aboutGallery2,
    aboutGallery3,
    aboutGallery4,
    aboutGallery5,
    aboutGallery6,
  ],
  tools: [
    aboutToolVector,
    aboutToolVector1,
    aboutClaude,
    aboutToolVector2,
    aboutCodex,
    aboutAntigravity,
  ],
  linkedin: aboutLinkedin,
  mail: aboutMail,
  phone: aboutPhone,
};

export const modalAssets = {
  avatars: [biunca, ewa, michael, ebong, funmilola, emmanuel, akinmukomi],
  close,
  verifiedOuter,
  verifiedInner,
};

export const photographyAssets = {
  images: Array.from({ length: 50 }, (_, index) =>
    photographyAsset(`photo-${String(index + 1).padStart(2, "0")}.png`),
  ),
};
