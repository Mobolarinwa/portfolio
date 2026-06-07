import { useEffect, useRef, useState } from "react";
import AnimatedContent from "./AnimatedContent";
import BorderGlow from "./BorderGlow";
import { modalAssets } from "./localAssets";
import "./RecommendationsModal.css";

type Recommendation = {
  name: string;
  role: string;
  avatar: string;
  paragraphs?: string[];
  bullets?: string[];
  compact?: boolean;
};

const recommendations: Recommendation[] = [
  {
    name: "Biunca Perera",
    role: "Product design manager, Moonfare",
    avatar: modalAssets.avatars[0],
    paragraphs: [
      "I had the utmost pleasure of managing Mob during our time together at Moonfare. From day one, I watched his craft evolve, not only in the aesthetics of his design work, but in how he balanced business thinking with the needs and experience of the end user. He consistently went above and beyond his role, often offering support to others through pairing sessions, sparring, and shared problem-solving.",
      "A few things upon reflection that stood out to me:",
    ],
    bullets: [
      "His confidence grew remarkably, especially in how he presented ideas in design critiques and to wider company audiences.",
      "He was open, curious, and unafraid to challenge the status quo or offer thoughtful feedback.",
      "He actively sought performance input, applied it quickly, and turned growth areas into strengths.",
      "He built trust across the team with ease and contributed to a warm, healthy team culture.",
      "He thought systematically beyond his immediate domain.",
      "He took design craft feedback seriously and elevated his aesthetic sensibility with every iteration.",
      "His competitor and adjacent-industry research was always expansive, regularly pulling inspiration from unexpected places to enrich the investor experience.",
      "He had a strong testing mindset, prototyping early and often, sharing work in progress, and genuinely inviting critique.",
      "He approached UX with depth and intention, consistently questioning assumptions to improve the investor experience.",
      "And something I admired deeply: he assimilated into his role, the team, and the business model incredibly quickly, all while adjusting to life in a completely new country. It was an absolute pleasure to mentor him, and witness his growth. I’m genuinely grateful for the trust he placed in me, and I would jump at the opportunity to work with him again.",
    ],
  },
  {
    name: "Ewa Sigmund",
    role: "Account manager, Retail, Google",
    avatar: modalAssets.avatars[1],
    paragraphs: [
      "Mob is an exceptional designer who combines deep curiosity, creative thought leadership, and empathy with sharp strategic thinking. He asks the right questions, dives deep into new topics, puts the user first and consistently brings fresh perspectives and ideas that elevate the entire team.",
      "I had the pleasure of working with Mob at Moonfare, where we were both part of the Retention Team. Together, we worked on building the digital reporting experience that allows investors to track how their investments are performing. What especially stood out is his ability to uncover meaningful insights that drive better decisions. He has a real talent for asking thoughtful discovery questions that reframe problems and lead to more impactful solutions. His curiosity drives him to explore new areas and continuously expand his knowledge, often bringing best practices from other industries to inspire innovative ideas. Beyond his creativity, Mob is a fantastic team player who collaborates seamlessly with engineers, stakeholders, and fellow designers, always bringing empathy, openness, and a strong drive to keep improving the product. I can highly recommend working with Mob!",
    ],
  },
  {
    name: "Michael Olawale",
    role: "Lead React Native Engineer, JP Morgan Chase",
    avatar: modalAssets.avatars[2],
    paragraphs: [
      "Mobolarinwa is a UI/UX Designer with high knowledge in Responsive interfaces for users in web and mobile solutions. Person of high personal integrity and highly committed with each work. He has high efficiency to face new challenges and comply with merit. His designs are clean, concise and minimal. He is a professional focused on results and have a good relationship with others.",
    ],
  },
  {
    name: "Ebong Ibokette",
    role: "Senior Agile Delivery Manager at Deutsche Bank",
    avatar: modalAssets.avatars[3],
    compact: true,
    paragraphs: [
      "Bfak, one word - Super Creative. Very dogged when it comes to ensuring the customer's experience is priority when developing products. We have worked on multiple projects and two things always stand out when the product eventually comes out - the smashing UI which is always very simple but classy and easy to use; and the UX which has drawn multiple praises and commendations from our customers.",
    ],
  },
  {
    name: "Funmilola Aderemi",
    role: "Chief Product Officer and Co-founder, Pharmarun",
    avatar: modalAssets.avatars[4],
    paragraphs: [
      "Working with Mobolarinwa was one of my favorite parts as being a PM. His interpretation of the requirement is usually so apt, goes above and beyond and challenges processes he does not completely agree with. Some may find this annoying but for me, it helped me think deeper about certain use cases. Mobolarinwa pays attention to detail, he is a team player, he is customer-centric, he is constantly eager to learn and to broaden his horizon. He is definitely an asset to any team",
    ],
  },
  {
    name: "Emmanuel Adeyemo",
    role: "Technical Product Manager, Seamfix",
    avatar: modalAssets.avatars[5],
    paragraphs: [
      "I am able to recommend Mobolarinwa as a person who has profound knowledge and great abilities in user experience design. He consistently demonstrated a solid work ethic at Seamfix plus a commitment to success. Mobolarinwa is a organised and customer oriented perfectionist, has no problem to work hard when necessary. He had vision to see the benefits and the passion to turn that into a competitive advantage for Seamfix. Mobolarinwa possesses a winning combination of solid tech skills and business sense, I learned a great deal from him. I've always felt Mobolarinwa was one of the very best team mates I have ever had the opportunity of working with.",
    ],
  },
];

type RecommendationsModalProps = {
  onClose: () => void;
};

export function RecommendationsModal({ onClose }: RecommendationsModalProps) {
  const modalRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef(0);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => onCloseRef.current(), 280);
  };

  useEffect(() => {
    modalRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  return (
    <div
      className={`recommendations-overlay${isClosing ? " is-closing" : ""}`}
      role="presentation"
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".recommendations-modal")) requestClose();
      }}
    >
      <AnimatedContent
        className="recommendations-modal-motion"
        container=".recommendations-overlay"
        distance={34}
        duration={0.72}
        ease="power3.out"
        initialOpacity={0}
        scale={0.96}
        threshold={0.05}
      >
        <section
          ref={modalRef}
          className="recommendations-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="recommendations-title"
          tabIndex={-1}
        >
          <header className="recommendations-header">
            <h2 id="recommendations-title">Recommendations</h2>
            <button
              className="recommendations-close"
              type="button"
              aria-label="Close recommendations"
              onClick={requestClose}
            >
              <img src={modalAssets.close} alt="" />
            </button>
          </header>

          <div className="recommendations-content">
            <div className="recommendation-list">
              {recommendations.map((recommendation, index) => (
                <AnimatedContent
                  key={recommendation.name}
                  className="recommendation-motion"
                  container=".recommendations-overlay"
                  distance={42}
                  duration={0.68}
                  ease="power3.out"
                  initialOpacity={0}
                  scale={0.985}
                  threshold={0.16}
                  delay={Math.min(index * 0.045, 0.18)}
                >
                  <RecommendationCard recommendation={recommendation} />
                </AnimatedContent>
              ))}
              <AnimatedContent
                className="recommendation-motion"
                container=".recommendations-overlay"
                distance={48}
                duration={0.72}
                ease="power3.out"
                initialOpacity={0}
                scale={0.98}
                threshold={0.18}
              >
                <FeaturedRecommendation />
              </AnimatedContent>
              <AnimatedContent
                className="recommendation-motion"
                container=".recommendations-overlay"
                distance={36}
                duration={0.72}
                ease="power3.out"
                initialOpacity={0}
                scale={0.985}
                threshold={0.18}
              >
                <RecommendationsCta />
              </AnimatedContent>
            </div>
            <div className="recommendations-divider" />
          </div>
        </section>
      </AnimatedContent>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <BorderGlow
      className="recommendation-glow"
      backgroundColor="#13161b"
      borderRadius={12}
      edgeSensitivity={34}
      glowColor="213 100 58"
      glowRadius={26}
      glowIntensity={0.75}
      coneSpread={22}
      fillOpacity={0.16}
      colors={["#0069ec", "#38bdf8", "#f472b6"]}
    >
      <article className={`recommendation-card${recommendation.compact ? " is-compact" : ""}`}>
        <div className="recommendation-body">
          {recommendation.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {recommendation.bullets ? (
            <ul>
              {recommendation.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <Attribution
          avatar={recommendation.avatar}
          name={recommendation.name}
          role={recommendation.role}
        />
      </article>
    </BorderGlow>
  );
}

function FeaturedRecommendation() {
  return (
    <article className="recommendation-featured">
      <div className="recommendation-featured-copy">
        <p className="recommendation-quote">
          Mobolarinwa is a very unique and creative UX designer, who isn't scared of altering the
          norm. Always enjoy working with him.
        </p>
      </div>
      <div className="featured-attribution">
        <img src={modalAssets.avatars[6]} alt="" />
        <div>
          <p>Akinmukomi Oluwaseun</p>
          <span>Senior Software Engineer, Rideco</span>
        </div>
      </div>
    </article>
  );
}

function RecommendationsCta() {
  return (
    <section className="recommendations-cta" aria-label="Work together">
      <div className="recommendations-cta-copy">
        <h3>Let’s work together</h3>
        <p>Have a project you would like to get started with, get in touch with me for collaborations</p>
      </div>
      <a href="mailto:hello@example.com" className="recommendations-cta-button">
        Let’s talk
      </a>
    </section>
  );
}

function Attribution({ avatar, name, role }: { avatar: string; name: string; role: string }) {
  return (
    <div className="recommendation-attribution">
      <img className="recommendation-avatar" src={avatar} alt="" />
      <div className="recommendation-person">
        <div className="recommendation-name-row">
          <p>{name}</p>
          <span className="recommendation-verified" aria-hidden="true">
            <img src={modalAssets.verifiedOuter} alt="" />
            <img src={modalAssets.verifiedInner} alt="" />
          </span>
        </div>
        <span>{role}</span>
      </div>
    </div>
  );
}

export default RecommendationsModal;
