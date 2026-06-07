import { useEffect, useState } from "react";
import { AboutPage } from "./AboutPage";
import { ClickSpark } from "./ClickSpark";
import { HealthlaneCaseStudyPage } from "./HealthlaneCaseStudyPage";
import { MoonfareCaseStudyPage } from "./MoonfareCaseStudyPage";
import { PropertyProCaseStudyPage } from "./PropertyProCaseStudyPage";
import { ResumePage } from "./ResumePage";
import { SpatialPortfolio } from "./SpatialPortfolio";
import { CustomCursor } from "./CustomCursor";

export type Page = "home" | "about" | "resume" | "moonfare" | "healthlane" | "propertypro";

function getPageFromHash(): Page {
  if (window.location.hash === "#about") return "about";
  if (window.location.hash === "#resume") return "resume";
  if (window.location.hash === "#moonfare") return "moonfare";
  if (window.location.hash === "#healthlane") return "healthlane";
  if (window.location.hash === "#propertypro") return "propertypro";
  return "home";
}

export function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (nextPage: Page) => {
    window.location.hash = nextPage === "home" ? "" : nextPage;
    setPage(nextPage);
  };

  return (
    <>
      <CustomCursor />
      <ClickSpark
        sparkColor="rgba(255, 255, 255, 0.75)"
        sparkSize={8}
        sparkRadius={24}
        sparkCount={8}
        duration={480}
        easing="ease-out"
        extraScale={1.1}
      />
      {page === "resume" ? (
        <ResumePage activePage={page} onNavigate={navigate} />
      ) : page === "about" ? (
        <AboutPage activePage={page} onNavigate={navigate} />
      ) : page === "moonfare" ? (
        <MoonfareCaseStudyPage activePage={page} onNavigate={navigate} />
      ) : page === "healthlane" ? (
        <HealthlaneCaseStudyPage activePage={page} onNavigate={navigate} />
      ) : page === "propertypro" ? (
        <PropertyProCaseStudyPage activePage={page} onNavigate={navigate} />
      ) : (
        <SpatialPortfolio
          activePage={page}
          onNavigate={navigate}
          onOpenMoonfare={() => navigate("moonfare")}
          onOpenHealthlane={() => navigate("healthlane")}
          onOpenPropertypro={() => navigate("propertypro")}
        />
      )}
    </>
  );
}
