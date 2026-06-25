import { useState, useEffect } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1,
    tag: "Data Analytics",
    title: "SQL Portfolio",
    desc: "A collection of SQL-driven business analyses on Google BigQuery. Covers two datasets — 124,838 e-commerce orders and a regional retail KPI analysis — moving from raw SQL through visualization to written business reports, including a profit-loss finding masked by revenue-only reporting.",
    tech: ["BigQuery", "SQL", "Google Sheets", "Google Docs"],
    href: "https://github.com/acheachi/sql-portfolio",
  },
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    date: "Aug 2024",
    badgeImg: "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/linkedin_thumb_CCNAITN__1_.png",
    verifyHref: "https://www.credly.com/badges/50cbc974-5883-40c5-9312-6afd56be34a5/public_url",
  },
  {
    id: 2,
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    date: "Jan 2025",
    badgeImg: "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/linkedin_thumb_CCNASRWE__1_.png",
    verifyHref: "https://www.credly.com/badges/101f5da6-e0af-412e-9b51-24dbb1b1d92f/public_url",
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "May 2025",
    badgeImg: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png",
    verifyHref: "https://www.credly.com/badges/215969d7-72b3-43c8-b894-d41b715995c1/public_url",
  },
  {
    id: 4,
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    date: "Dec 2025",
    badgeImg: "https://images.credly.com/images/441578ec-c0f3-46cc-95fc-86b27e90cf4f/linkedin_thumb_image.png",
    verifyHref: "https://www.credly.com/badges/8a9d0aba-3ae6-4b95-8319-a8e488386486/public_url",
  },
  {
    id: 5,
    title: "Prompt Design in Vertex AI Skill Badge",
    issuer: "Google Cloud",
    date: "Jun 2025",
    badgeImg: "https://images.credly.com/images/cef82b2e-970a-4318-8e59-c3e26b7f5c19/linkedin_thumb_image.png",
    verifyHref: "https://www.credly.com/badges/ba1e167c-ee8d-4360-986b-68cff73fb0d4/public_url",
  },
];

const WEBINARS = {
  "Artificial Intelligence": [
    { title: "Beyond the Black Box: Explainable AI in Game Development", date: "Oct 2025", file: "/certs/webinars/explainable-ai-game-dev.png" },
    { title: "Shaping Tomorrow: Accelerating Economic Growth with AI", date: "Oct 2025", file: "/certs/webinars/ai-economic-growth.png" },
    { title: "Generative AI and the Future of Content Creation", date: "Oct 2025", file: "/certs/webinars/generative-ai-content.png" },
    { title: "AI in Governance: Promise and Ethical Issues", date: "Sept 2025", file: "/certs/webinars/ai-governance-ethics.png" },
  ],
  "Cybersecurity": [
    { title: "DevSecOps: Integrating Security into the SDLC", date: "Oct 2025", file: "/certs/webinars/devsecops-sdlc.png" },
    { title: "Shift-Left Security: Building Safer Pipelines with DevSecOps", date: "Oct 2025", file: "/certs/webinars/shift-left-security.png" },
    { title: "Ctrl+Alt+Defend: Defending Critical Infrastructure from Cyber Threats", date: "Oct 2025", file: "/certs/webinars/ctrl-alt-defend.png" },
    { title: "The Triple Shield: AI, Blockchain & Cybersecurity in Finance", date: "Sept 2025", file: "/certs/webinars/triple-shield-finance.png" },
    { title: "Ethical Hacking and Cyber Security", date: "Sept 2023", file: "/certs/webinars/ethical-hacking-2023.pdf" },
  ],
  "Cloud & Emerging Tech": [
    { title: "Cloud Migration Strategies for Enterprises", date: "Oct 2025", file: "/certs/webinars/cloud-migration.png" },
    { title: "5G Technology and IoT: Transforming Connectivity for the Future", date: "Sept 2025", file: "/certs/webinars/5g-iot.png" },
    { title: "Resilience Through Technology: IT Solutions for Disaster Risk Reduction", date: "Oct 2025", file: "/certs/webinars/it-disaster-risk.png" },
  ],
  "UX & Design": [
    { title: "Human-Computer Interaction (HCI) and UX Beyond the Screen", date: "Oct 2025", file: "/certs/webinars/hci-ux.png" },
    { title: "Design with Purpose: Usable and Accessible UX for the Future", date: "Sept 2025", file: "/certs/webinars/design-with-purpose.png" },
  ],
  "Creative & Multimedia": [
    { title: "Visual Poetry: Creating Images That Speak", date: "Sept 2025", file: "/certs/webinars/visual-poetry.png" },
    { title: "Anime In-Betweening Workflow: A Digital Approach Through Clip Studio Paint", date: "Sept 2025", file: "/certs/webinars/anime-inbetweening.png" },
    { title: "Exploring the Fusion of Art and Technology in Multimedia Creation", date: "Sept 2023", file: "/certs/webinars/art-tech-fusion-2023.png" },
  ],
  "Project Management": [
    { title: "Chaos to Clarity: Using PM Tools to Strengthen Leadership & Team Collaboration", date: "Oct 2025", file: "/certs/webinars/chaos-to-clarity-pm.png" },
  ],
};

/* ─── ICONS ─────────────────────────────────────────────────────────────── */

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

/* ─── PROJECT CARD ──────────────────────────────────────────────────────── */

function ProjectCard({ p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.75rem",
        background: hovered ? "rgba(145,168,130,0.04)" : "transparent",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.7rem" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--acc)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {p.tag}
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--display)", fontSize: "1.35rem", fontWeight: 400, color: "var(--tx)", marginBottom: "0.65rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
        {p.title}
      </h3>
      <p style={{ fontFamily: "var(--body)", fontSize: "0.84rem", color: "var(--tx2)", lineHeight: 1.8, marginBottom: "1.1rem" }}>
        {p.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.1rem" }}>
        {p.tech.map(t => (
          <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--tx3)", padding: "0.18rem 0.55rem", border: "1px solid rgba(145,168,130,0.15)" }}>
            {t}
          </span>
        ))}
      </div>
      <a href={p.href} target="_blank" rel="noreferrer"
        style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: hovered ? "var(--acc)" : "var(--tx3)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem", transition: "color 0.2s", letterSpacing: "0.08em" }}>
        view source <ArrowIcon />
      </a>
    </div>
  );
}

/* ─── CERTIFICATION CARD ────────────────────────────────────────────────── */

function CertCard({ c, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.25rem 1.5rem",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        background: hovered ? "rgba(145,168,130,0.04)" : "transparent",
        transition: "background 0.3s ease",
        borderBottom: isLast ? "none" : "1px solid var(--div)",
      }}
    >
      <img
        src={c.badgeImg}
        alt={c.title}
        style={{ width: "52px", height: "52px", objectFit: "contain", flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{ fontFamily: "var(--display)", fontSize: "1rem", fontWeight: 400, color: "var(--tx)", marginBottom: "0.25rem", lineHeight: 1.3 }}>
          {c.title}
        </h4>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.63rem", color: "var(--tx3)", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
          {c.issuer} · {c.date}
        </p>
        <a href={c.verifyHref} target="_blank" rel="noreferrer"
          style={{ fontFamily: "var(--mono)", fontSize: "0.63rem", color: hovered ? "var(--acc)" : "var(--tx3)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem", letterSpacing: "0.06em" }}>
          verify <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

/* ─── WEBINAR GROUP ─────────────────────────────────────────────────────── */

function WebinarGroup({ theme, items }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--acc)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--div)" }}>
        {theme} <span style={{ color: "var(--tx3)" }}>({items.length})</span>
      </div>
      {items.map((w, i) => (
        <WebinarRow key={i} w={w} />
      ))}
    </div>
  );
}

function WebinarRow({ w }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        gap: "1rem", padding: "0.55rem 0",
        borderBottom: "1px solid rgba(145,168,130,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", flex: 1 }}>
        <span style={{ fontFamily: "var(--display)", fontSize: "0.92rem", fontWeight: 400, color: hovered ? "var(--tx)" : "var(--tx2)", transition: "color 0.2s" }}>
          {w.title}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--tx3)" }}>{w.date}</span>
        <a href={w.file} target="_blank" rel="noreferrer"
          style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: hovered ? "var(--acc)" : "var(--tx3)", textDecoration: "none" }}>
          view
        </a>
      </div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:      #17140F;
          --sf:      #1E1B16;
          --sf2:     #252118;
          --tx:      #E8DFD0;
          --tx2:     #9A8F82;
          --tx3:     #6A6058;
          --acc:     #91A882;
          --div:     rgba(145,168,130,0.13);
          --display: 'Cormorant Garamond', serif;
          --body:    'Plus Jakarta Sans', sans-serif;
          --mono:    'JetBrains Mono', monospace;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--tx);
          font-family: var(--body);
          line-height: 1.6;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed; inset: 0;
          opacity: 0.04; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.4rem 3rem;
          display: flex; justify-content: space-between; align-items: center;
          transition: all 0.35s ease;
        }
        .nav.scrolled {
          background: rgba(23,20,15,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--div);
          padding: 1rem 3rem;
        }
        .nav-name {
          font-family: var(--display); font-size: 1.1rem; font-weight: 400;
          color: var(--tx); text-decoration: none; letter-spacing: 0.02em;
        }
        .nav-links { display: flex; gap: 2.25rem; list-style: none; }
        .nav-links a {
          font-family: var(--mono); font-size: 0.7rem; color: var(--tx3);
          text-decoration: none; letter-spacing: 0.14em;
          transition: color 0.2s; cursor: pointer;
        }
        .nav-links a:hover { color: var(--acc); }

        .wrapper {
          max-width: 1060px; margin: 0 auto;
          padding: 0 3rem; position: relative; z-index: 1;
        }

        .hero {
          min-height: 100vh;
          display: flex; align-items: center;
          padding: 8rem 0 6rem;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 4rem; align-items: center; width: 100%;
        }
        .hero-eyebrow {
          font-family: var(--mono); font-size: 0.7rem;
          color: var(--acc); letter-spacing: 0.3em;
          margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
          animation: fadeUp 0.7s ease 0.1s both;
        }
        .hero-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--acc); opacity: 0.5;
        }
        .hero-name {
          font-family: var(--display);
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          font-weight: 300; color: var(--tx);
          letter-spacing: -0.03em; line-height: 0.92;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.7s ease 0.2s both;
        }
        .hero-role {
          font-family: var(--body); font-size: 0.98rem;
          color: var(--tx2); margin-bottom: 0.35rem;
          animation: fadeUp 0.7s ease 0.3s both;
        }
        .hero-location {
          font-family: var(--mono); font-size: 0.7rem;
          color: var(--tx3); letter-spacing: 0.1em;
          animation: fadeUp 0.7s ease 0.35s both;
        }
        .hero-divider {
          width: 40px; height: 1px; background: var(--div);
          margin: 2rem 0;
          animation: fadeUp 0.7s ease 0.4s both;
        }
        .socials {
          display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;
          animation: fadeUp 0.7s ease 0.5s both;
        }
        .social-link {
          color: var(--tx3); text-decoration: none;
          transition: color 0.2s;
          display: flex; align-items: center; gap: 0.4rem;
          font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.08em;
        }
        .social-link:hover { color: var(--acc); }

        .hero-photo {
          width: 180px; height: 220px;
          border: 1px solid var(--div);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.6rem;
          animation: fadeUp 0.7s ease 0.3s both;
          position: relative; overflow: hidden;
        }

        .section {
          padding: 5.5rem 0;
          border-top: 1px solid var(--div);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem; align-items: start;
        }
        .about-text p {
          font-size: 0.9rem; color: var(--tx2);
          line-height: 1.95; margin-bottom: 1rem;
        }
        .about-text p strong { color: var(--tx); font-weight: 600; }
        .skills-heading {
          font-family: var(--mono); font-size: 0.62rem;
          color: var(--acc); letter-spacing: 0.22em;
          text-transform: uppercase; margin-bottom: 0.85rem;
        }
        .skills-list {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid var(--div);
        }
        .skill-item {
          font-family: var(--mono); font-size: 0.68rem;
          color: var(--tx2); padding: 0.6rem 0.8rem;
          border-right: 1px solid var(--div);
          border-bottom: 1px solid var(--div);
          transition: all 0.2s; letter-spacing: 0.03em;
        }
        .skill-item:hover { color: var(--tx); background: var(--sf); }
        .skill-item:nth-child(2n) { border-right: none; }
        .skill-item:nth-last-child(-n+2) { border-bottom: none; }

        .projects-grid {
          display: grid; grid-template-columns: 1fr;
          border: 1px solid var(--div);
          max-width: 560px;
        }

        .certs-list {
          border: 1px solid var(--div);
          max-width: 640px;
        }

        .resume-row {
          display: flex; justify-content: space-between;
          align-items: center; gap: 2rem; flex-wrap: wrap;
          padding: 2rem 0;
        }
        .resume-label {
          font-family: var(--display); font-size: 1.9rem;
          font-weight: 300; color: var(--tx); letter-spacing: -0.01em;
        }
        .resume-sub {
          font-family: var(--mono); font-size: 0.65rem;
          color: var(--tx3); letter-spacing: 0.1em; margin-top: 0.4rem;
        }
        .btn-dl {
          font-family: var(--mono); font-size: 0.7rem;
          letter-spacing: 0.12em; padding: 0.78rem 1.65rem;
          background: transparent; color: var(--acc);
          border: 1px solid rgba(145,168,130,0.35);
          cursor: pointer; transition: all 0.25s;
          text-decoration: none; display: inline-flex;
          align-items: center; gap: 0.5rem;
        }
        .btn-dl:hover {
          background: rgba(145,168,130,0.07);
          border-color: var(--acc); color: var(--tx);
        }

        footer {
          border-top: 1px solid var(--div);
          padding: 2rem 0; position: relative; z-index: 1;
        }
        .footer-inner {
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 1rem;
        }
        .footer-copy {
          font-family: var(--mono); font-size: 0.62rem;
          color: var(--tx3); letter-spacing: 0.08em;
        }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links a {
          font-family: var(--mono); font-size: 0.62rem;
          color: var(--tx3); text-decoration: none;
          transition: color 0.2s; letter-spacing: 0.08em;
        }
        .footer-links a:hover { color: var(--acc); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .wrapper { padding: 0 1.5rem; }
          .nav { padding: 1rem 1.5rem; }
          .nav.scrolled { padding: 0.8rem 1.5rem; }
          .nav-links { display: none; }
          .hero { padding: 7rem 0 4rem; }
          .hero-inner { grid-template-columns: 1fr; }
          .hero-photo { display: none; }
          .section { padding: 4rem 0; }
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .projects-grid { max-width: 100%; }
          .certs-list { max-width: 100%; }
          .resume-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-name" href="#home">John Achilles Colon</a>
        <ul className="nav-links">
          {[["about", "#about"], ["projects", "#projects"], ["certifications", "#certifications"], ["webinars", "#webinars"], ["resume", "#resume"]].map(([l, h]) => (
            <li key={l}><a href={h}>{l}</a></li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="wrapper">
        <div className="hero">
          <div className="hero-inner">
            <div>
              <div className="hero-eyebrow">Bachelor of Science in Information Technology graduate</div>
              <h1 className="hero-name">
                John Achilles<br />Colon
              </h1>
              <p className="hero-role">BSIT Graduate</p>
              <p className="hero-location">Iloilo, Philippines</p>
              <div className="hero-divider" />
              <div className="socials">
                {[
                  { label: "github",   href: "https://github.com/a-chill/",       Icon: GithubIcon },
                  { label: "linkedin", href: "https://linkedin.com/in/john-achilles-colon-52491922b/",  Icon: LinkedinIcon },
                  { label: "email",    href: "mailto:colon.johnachillesv11d@gmail.com",  Icon: EmailIcon },
                ].map(({ label, href, Icon }) => (
                  <a key={label} href={href} className="social-link" target="_blank" rel="noreferrer">
                    <Icon />{label}
                  </a>
                ))}
              </div>
            </div>
            <div className="hero-photo">
              <img
                src="/photo.jpg"
                alt="John Achilles Colon"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* ── ABOUT ──────────────────────────────────────────────── */}
        <div id="about" className="section">
          <div className="about-grid">
            <div className="about-text">
              <p>
                <strong>Bachelor of Science in Information Technology</strong> graduate
                with experience in <strong>cybersecurity</strong>, <strong>system
                development</strong>, and <strong>project management</strong>.
              </p>
              <p>
                Completed an internship at the <strong>National Bureau of
                Investigation Region VI</strong>, contributing to the development of a
                Case File Management System and supporting IT operations.
              </p>
              <p>
                Co-founded the <strong>BaHanap</strong> project, contributing to
                technical documentation, coordination, and innovation planning for
                thesis writing and startup competitions.
              </p>
              <p>
                Currently building a foundation in <strong>data analytics</strong> —
                turning raw datasets into clear, business-relevant insights using SQL
                and dashboards. Open to entry-level <strong>Information Technology-related</strong> roles.
              </p>
            </div>
            <div>
              <div className="skills-heading">skills</div>
              <div className="skills-list">
                {[
                  "SQL", "Data Visualization",
                  "Google Workspace", "Microsoft 365",
                  "Programming (Java, C++, C#, HTML/CSS, JavaScript, React)", "Cybersecurity",
                  "Cloud Security", "Problem-Solving",
                  "Teamwork & Collaboration", "Communication Skills",
                  "Project Management", "Python (learning)", 
                  "Power BI (learning)",
                ].map(s => (
                  <div key={s} className="skill-item">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PROJECTS ───────────────────────────────────────────── */}
        <div id="projects" className="section">
          <div className="projects-grid">
            {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
          </div>
        </div>

        {/* ── CERTIFICATIONS ─────────────────────────────────────── */}
        <div id="certifications" className="section">
          <div className="skills-heading" style={{ marginBottom: "1.5rem" }}>certifications &amp; badges</div>
          <div className="certs-list">
            {CERTIFICATIONS.map((c, i) => (
              <CertCard key={c.id} c={c} isLast={i === CERTIFICATIONS.length - 1} />
            ))}
          </div>
        </div>

        {/* ── WEBINARS ───────────────────────────────────────────── */}
        <div id="webinars" className="section">
          <div className="skills-heading" style={{ marginBottom: "1.5rem" }}>webinars &amp; training</div>
          <div style={{ maxWidth: "700px" }}>
            {Object.entries(WEBINARS).map(([theme, items]) => (
              <WebinarGroup key={theme} theme={theme} items={items} />
            ))}
          </div>
        </div>

        {/* ── RESUME ─────────────────────────────────────────────── */}
        <div id="resume" className="section">
          <div className="resume-row">
            <div>
              <div className="resume-label">John Achilles Colon — Resume</div>
              <div className="resume-sub">
                // last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} · PDF
              </div>
            </div>
            <a href="/resume.pdf" download className="btn-dl">
              download resume <ArrowIcon />
            </a>
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer>
        <div className="wrapper">
          <div className="footer-inner">
            <div className="footer-copy">
              © {new Date().getFullYear()} John Achilles Colon · React + Vite · GitHub Pages
            </div>
            <div className="footer-links">
              <a href="https://github.com/a-chill/" target="_blank" rel="noreferrer">github</a>
              <a href="https://linkedin.com/in/john-achilles-colon-52491922b/" target="_blank" rel="noreferrer">linkedin</a>
              <a href="mailto:colon.johnachillesv11d@gmail.com">email</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}