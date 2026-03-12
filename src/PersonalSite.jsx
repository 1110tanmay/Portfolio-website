import { useState, useEffect, useRef } from "react";
import photo from './assets/ProfessionalPicture2.png'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0a;
    --white: #f8f7f4;
    --gray-100: #f0ede8;
    --gray-300: #c8c4bc;
    --gray-500: #8a867e;
    --gray-700: #4a4740;
    --serif: 'DM Serif Display', Georgia, serif;
    --mono: 'DM Mono', 'Courier New', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--white);
    color: var(--black);
    font-family: var(--sans);
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
  }

  /* cursor */
  .ps-cursor {
    position: fixed;
    width: 10px; height: 10px;
    background: var(--black);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background 0.3s, transform 0.05s;
  }
  .ps-cursor.expand {
    width: 40px; height: 40px;
    background: transparent;
    border: 1.5px solid var(--black);
  }

  /* nav */
  .ps-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 28px 60px;
  }
  .ps-nav-logo {
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.08em;
    color: var(--black);
    text-decoration: none;
  }
  .ps-nav-links {
    display: flex; gap: 40px; list-style: none;
  }
  .ps-nav-links a {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray-700);
    text-decoration: none;
    position: relative;
    transition: color 0.2s;
  }
  .ps-nav-links a::after {
    content: '';
    position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: var(--black);
    transition: width 0.3s;
  }
  .ps-nav-links a:hover { color: var(--black); }
  .ps-nav-links a:hover::after { width: 100%; }

  /* hero */
  .ps-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 100px;
    position: relative;
  }
  .ps-hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 60px;
  }
  .ps-hero-tag {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray-500);
    margin-bottom: 32px;
  }
  .ps-h1 {
    font-family: var(--serif);
    font-size: clamp(52px, 6vw, 88px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    color: var(--black);
    margin-bottom: 32px;
  }
  .ps-h1 em { font-style: italic; color: var(--gray-500); }
  .ps-hero-desc {
    font-size: 17px;
    line-height: 1.8;
    color: var(--gray-700);
    max-width: 420px;
    margin-bottom: 52px;
  }
  .ps-hero-ctas { display: flex; gap: 16px; align-items: center; }

  .ps-btn-primary {
    display: inline-block;
    padding: 14px 32px;
    background: var(--black);
    color: var(--white);
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    transition: background 0.2s, transform 0.2s;
    cursor: none;
  }
  .ps-btn-primary:hover { background: var(--gray-700); transform: translateY(-1px); }

  .ps-btn-ghost {
    display: inline-block;
    padding: 14px 32px;
    border: 1px solid var(--black);
    color: var(--black);
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, color 0.2s, transform 0.2s;
    cursor: none;
  }
  .ps-btn-ghost:hover { background: var(--black); color: var(--white); transform: translateY(-1px); }

  .ps-hero-right {
    position: relative;
    overflow: hidden;
   
    display: flex; align-items: center; justify-content: center;
  }
  .ps-graphic {
    position: relative;
    width: 320px; height: 320px;
  }
  .ps-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid var(--gray-300);
  }
  .ps-circle-1 { inset: 0; animation: rotateSlow 20s linear infinite; }
  .ps-circle-2 { inset: 40px; animation: rotateSlow 14s linear infinite reverse; }
  .ps-circle-3 { inset: 90px; animation: rotateSlow 9s linear infinite; }
  .ps-circle-dot {
    position: absolute;
    width: 8px; height: 8px;
    background: var(--black);
    border-radius: 50%;
    top: -4px; left: 50%; transform: translateX(-50%);
  }
  .ps-center-text {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 6px;
  }
  .ps-center-text span {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--gray-500);
  }
  .ps-center-text strong {
    font-family: var(--serif);
    font-size: 28px;
    color: var(--black);
    font-weight: 400;
  }
  .ps-scroll-hint {
    position: absolute; bottom: 40px; left: 60px;
    display: flex; align-items: center; gap: 12px;
  }
  .ps-scroll-hint span {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gray-500);
  }
  .ps-scroll-line {
    width: 40px; height: 1px;
    background: var(--gray-300);
    position: relative;
    overflow: hidden;
  }
  .ps-scroll-line::after {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: var(--black);
    animation: scrollLine 2s ease-in-out infinite;
  }

  /* section */
  .ps-section { padding: 120px 60px; }
  .ps-section-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gray-500);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 16px;
  }
  .ps-section-label::after {
    content: '';
    flex: 1; max-width: 60px; height: 1px;
    background: var(--gray-300);
  }
  .ps-section-title {
    font-family: var(--serif);
    font-size: clamp(36px, 4vw, 56px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 64px;
  }

  /* about */
  .ps-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }
  .ps-about-text p {
    font-size: 17px;
    line-height: 1.9;
    color: var(--gray-700);
    margin-bottom: 24px;
  }
  .ps-skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .ps-skill-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; gap: 12px;
  }
  .ps-skill-dot {
    width: 5px; height: 5px;
    background: var(--black);
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ps-skill-name { font-family: var(--mono); font-size: 13px; color: var(--gray-700); }
  .ps-stats-row {
    display: flex; gap: 0;
    margin-top: 56px;
    border-top: 1px solid var(--gray-100);
  }
  .ps-stat {
    flex: 1;
    padding: 32px 0;
    border-right: 1px solid var(--gray-100);
  }
  .ps-stat:last-child { border-right: none; padding-left: 32px; }
  .ps-stat:not(:first-child) { padding-left: 32px; }
  .ps-stat-num {
    font-family: var(--serif);
    font-size: 42px;
    line-height: 1;
    margin-bottom: 8px;
  }
  .ps-stat-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gray-500);
  }

  /* projects */
  .ps-projects-section { background: var(--black); color: var(--white); }
  .ps-projects-section .ps-section-label { color: var(--gray-500); }
  .ps-projects-section .ps-section-label::after { background: var(--gray-700); }
  .ps-projects-section .ps-section-title { color: var(--white); }
  .ps-projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--gray-700);
    border: 1px solid var(--gray-700);
  }
  .ps-project-card {
    background: var(--black);
    padding: 44px 36px;
    transition: background 0.3s;
    position: relative;
    overflow: hidden;
  }
  .ps-project-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 2px;
    background: var(--white);
    transition: width 0.4s;
  }
  .ps-project-card:hover { background: #111; }
  .ps-project-card:hover::before { width: 100%; }
  .ps-project-num {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--gray-500);
    margin-bottom: 24px;
  }
  .ps-project-title {
    font-family: var(--serif);
    font-size: 26px;
    line-height: 1.2;
    color: var(--white);
    margin-bottom: 16px;
    font-weight: 400;
  }
  .ps-project-desc {
    font-size: 14px;
    line-height: 1.8;
    color: var(--gray-300);
    margin-bottom: 32px;
  }
  .ps-project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
  .ps-project-tag {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border: 1px solid var(--gray-700);
    color: var(--gray-300);
  }
  .ps-project-link {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--white);
    text-decoration: none;
    display: flex; align-items: center; gap: 10px;
    transition: gap 0.2s;
    cursor: none;
  }
  .ps-project-link:hover { gap: 16px; }

  /* contact */
  .ps-contact-inner { max-width: 680px; }
  .ps-contact-desc {
    font-size: 18px;
    line-height: 1.8;
    color: var(--gray-700);
    margin-bottom: 56px;
  }
  .ps-contact-link-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 0;
    border-bottom: 1px solid var(--gray-100);
    text-decoration: none;
    color: var(--black);
    transition: padding-left 0.3s;
    cursor: none;
  }
  .ps-contact-link-item:first-child { border-top: 1px solid var(--gray-100); }
  .ps-contact-link-item:hover { padding-left: 12px; }
  .ps-contact-link-left { display: flex; align-items: center; gap: 20px; }
  .ps-contact-platform {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray-500);
    width: 80px;
  }
  .ps-contact-value { font-size: 17px; font-weight: 400; }
  .ps-contact-arrow {
    font-size: 20px;
    color: var(--gray-300);
    transition: color 0.2s, transform 0.2s;
  }
  .ps-contact-link-item:hover .ps-contact-arrow { color: var(--black); transform: translateX(4px); }

  /* footer */
  .ps-footer {
    padding: 32px 60px;
    border-top: 1px solid var(--gray-100);
    display: flex; justify-content: space-between; align-items: center;
  }
  .ps-footer span {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--gray-500);
  }

  /* reveal */
  .ps-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s, transform 0.8s;
  }
  .ps-reveal.visible { opacity: 1; transform: translateY(0); }

  /* fade-in for mounted elements */
  .ps-fadein {
    animation: fadeUp 0.8s forwards;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes scrollLine {
    0%   { left: -100%; }
    50%  { left: 0%; }
    100% { left: 100%; }
  }

  @media (max-width: 900px) {
    .ps-nav { padding: 24px 28px; }
    .ps-hero { grid-template-columns: 1fr; }
    .ps-hero-right { height: 320px; }
    .ps-hero-left { padding: 100px 28px 60px; }
    .ps-scroll-hint { left: 28px; }
    .ps-section { padding: 80px 28px; }
    .ps-about-grid { grid-template-columns: 1fr; gap: 48px; }
    .ps-projects-grid { grid-template-columns: 1fr; }
    .ps-footer { flex-direction: column; gap: 12px; padding: 28px; }
  }
`;

const SKILLS = [
  "TypeScript","React","Node.js","Python",
  "PostgreSQL","Redis","AWS","Docker","GraphQL","Rust"
];

const PROJECTS = [
  {
    num: "01", title: "Meridian",
    desc: "A real-time collaborative code review platform that reduced PR cycle time by 40% for teams of 10–200 engineers.",
    tags: ["TypeScript","WebSockets","React"],
  },
  {
    num: "02", title: "Fieldwork",
    desc: "An offline-first data collection app for field researchers, syncing seamlessly when connectivity is restored.",
    tags: ["React Native","SQLite","CRDTs"],
  },
  {
    num: "03", title: "Velo",
    desc: "A high-throughput event pipeline processing 2M+ events/day for an analytics startup, built on Rust and Kafka.",
    tags: ["Rust","Kafka","AWS"],
  },
];

const CONTACTS = [
  { platform: "Email",    value: "1110tanmay@gmail.com",   href: "mailto:1110tanmay@gmail.com" },
  { platform: "GitHub",   value: "github.com/1110",        href: "https://github.com/1110tanmay" },
  { platform: "LinkedIn", value: "linkedin.com/in/tanmay-shelar",   href: "https://www.linkedin.com/in/tanmay-shelar/"},
  { platform: "Resume",   value: "Download PDF",               href: "https://drive.google.com/file/d/1kza-oXXoKMrxJEFJzOJIQC3kdtcEAMtM/view?usp=sharing" },
];

// ── Scroll reveal hook ──
function useReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const ref = el => { if (el && !refs.current.includes(el)) refs.current.push(el); };
  return ref;
}

// ── Cursor ──
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = e => { if (e.target.closest("a, button")) setExpanded(true); };
    const out  = e => { if (e.target.closest("a, button")) setExpanded(false); };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div
      className={`ps-cursor${expanded ? " expand" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

// ── Nav ──
function Nav() {
  return (
    <nav className="ps-nav">
      <a className="ps-nav-logo" href="#">AC</a>
      <ul className="ps-nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

// ── Hero ──
function Hero() {
  return (
    <section className="ps-hero" id="hero">
      <div className="ps-hero-left">
        <p className="ps-hero-tag ps-fadein" style={{ animationDelay: "0.4s", opacity: 0 }}>
          Software Engineer · Based in Phoenix
        </p>
        <h1 className="ps-h1 ps-fadein" style={{ animationDelay: "0.7s", opacity: 0 }}>
          Building things <em>that matter.</em>
        </h1>
        <p className="ps-hero-desc ps-fadein" style={{ animationDelay: "0.95s", opacity: 0 }}>
          I'm Tanmay Shelar — a software engineer who cares deeply about clean code,
          thoughtful systems, and interfaces people actually enjoy using.
        </p>
        <div className="ps-hero-ctas ps-fadein" style={{ animationDelay: "1.15s", opacity: 0 }}>
          <a href="#projects" className="ps-btn-primary">View Work</a>
          <a href="#contact"  className="ps-btn-ghost">Get in Touch</a>
        </div>
      </div>

      <div className="ps-hero-right">
  <img
    src={photo}
    alt="Tanmay Shelar"
    style={{
      width: '420px',
    height: '520px',
    objectFit: 'cover',
    borderRadius: '12px',
    }}
  />
</div>

      <div className="ps-scroll-hint ps-fadein" style={{ animationDelay: "1.5s", opacity: 0 }}>
        <span>Scroll</span>
        <div className="ps-scroll-line" />
      </div>
    </section>
  );
}

// ── About ──
function About({ revealRef }) {
  return (
    <section className="ps-section" id="about">
      <p className="ps-section-label ps-reveal" ref={revealRef}>About</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        Crafting software<br />with intention.
      </h2>
      <div className="ps-about-grid">
        <div className="ps-about-text ps-reveal" ref={revealRef}>
          <p>
            With 6+ years of experience across startups and scale-ups, I specialize in building
            robust backend systems and clean, performant frontends. I believe the best software
            is invisible — it just works.
          </p>
          <p>
            I'm drawn to problems at the intersection of engineering and product: where a
            well-designed system can meaningfully change how people work and create.
          </p>
          <p>
            When I'm not in a code editor, I'm probably hiking, reading about distributed
            systems, or perfecting my espresso technique.
          </p>
        </div>

        <div className="ps-reveal" ref={revealRef}>
          <div className="ps-skills-grid">
            {SKILLS.map(s => (
              <div className="ps-skill-item" key={s}>
                <span className="ps-skill-dot" />
                <span className="ps-skill-name">{s}</span>
              </div>
            ))}
          </div>
          <div className="ps-stats-row">
            {[["6+","Years exp."],["40+","Projects"],["12","Open source"]].map(([n, l]) => (
              <div className="ps-stat" key={l}>
                <div className="ps-stat-num">{n}</div>
                <div className="ps-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ──
function Projects({ revealRef }) {
  return (
    <section className="ps-section ps-projects-section" id="projects">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Selected Work</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        Projects I'm<br />proud of.
      </h2>
      <div className="ps-projects-grid ps-reveal" ref={revealRef}>
        {PROJECTS.map(p => (
          <div className="ps-project-card" key={p.num}>
            <p className="ps-project-num">{p.num}</p>
            <h3 className="ps-project-title">{p.title}</h3>
            <p className="ps-project-desc">{p.desc}</p>
            <div className="ps-project-tags">
              {p.tags.map(t => <span className="ps-project-tag" key={t}>{t}</span>)}
            </div>
            <a href="#" className="ps-project-link">Case Study →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact --
function Contact({ revealRef }) {
  return (
    <section className="ps-section" id="contact">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Contact</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        Let's build<br />something together.
      </h2>
      <div className="ps-contact-inner ps-reveal" ref={revealRef}>
        <p className="ps-contact-desc">
          Open to senior engineering roles, fractional CTO opportunities, and the occasional
          interesting contract. If you have something worth building, I'd love to hear about it.
        </p>
        <div>
          {CONTACTS.map(c => (
            <a href={c.href} className="ps-contact-link-item" key={c.platform}>
              <div className="ps-contact-link-left">
                <span className="ps-contact-platform">{c.platform}</span>
                <span className="ps-contact-value">{c.value}</span>
              </div>
              <span className="ps-contact-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer className="ps-footer">
      <span>© 2026 Tanmay Shelar</span>
      <span>Designed &amp; built with care.</span>
    </footer>
  );
}

// ── Root ──
export default function PersonalSite() {
  const revealRef = useReveal();

  return (
    <>
      <style>{styles}</style>
      <Cursor />
      <Nav />
      <Hero />
      <About revealRef={revealRef} />
      <Projects revealRef={revealRef} />
      <Contact revealRef={revealRef} />
      <Footer />
    </>
  );
}
