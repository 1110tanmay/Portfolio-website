import React, { useState, useEffect, useRef } from "react";
import { Cloud } from 'react-icon-cloud';
import photo from './assets/ProfessionalPicture2.png';
import clinavis1 from './assets/clinavis/clinavis-1.png';
import clinavis2 from './assets/clinavis/clinavis-2.png';
import clinavis3 from './assets/clinavis/clinavis-3.png';
import clinavis4 from './assets/clinavis/clinavis-4.png';
import clinavis5 from './assets/clinavis/clinavis-5.png';


const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const SYSTEM_PROMPT = `You are Tamy — Tanmay Shelar's personal AI assistant, embedded on his portfolio website. You speak exactly like Jarvis from Iron Man: witty, composed, slightly dry humor, highly intelligent, and always professionally charming. You refer to Tanmay as "Mr. Shelar" occasionally for effect. You are here to help recruiters learn about Tanmay in the most entertaining way possible.

IMPORTANT RULES:
- Keep responses concise — 3-5 sentences max unless deeply technical questions require more.
- Be warm, clever, and occasionally drop a subtle joke or quip. Never be boring.
- Every 2-3 responses, naturally weave in a suggestion like: "Of course, if you'd like to continue this conversation at a higher bandwidth, Mr. Shelar is reachable at 602-796-9188. I'm told he responds faster than I do." or similar Jarvis-flavored nudges toward a call.
- Never make up information. If you don't know something about Tanmay, say so with humor.
- If asked about salary, deflect gracefully: "Ah, the compensation question. I'm afraid that's above my clearance level — best discussed directly with Mr. Shelar."
- If asked something completely off-topic, redirect with wit.

ABOUT TANMAY SHELAR:

IDENTITY:
- Graduate student in Software Engineering at Arizona State University, Tempe, Arizona
- GPA: 3.96 (MS), 3.01 (BE)
- Available for full-time roles starting January 2027
- Email: 1110tanmay@gmail.com | Phone: 602-796-9188
- GitHub: github.com/1110tanmay | LinkedIn: linkedin.com/in/tanmay-shelar

COMMUNICATION STYLE:
- Casual yet professional. Thoughtful. Tends to over-engineer side projects (architecture diagrams, version control discipline, unnecessarily well-documented READMEs — for a weekend project).

PROUDEST WORK — Smart heat tracker (ASU Research):
- Sole software developer on a team of PhD researchers
- Built Smart heat tracker: a wearable health app estimating core body temperature within ±0.2°C using the ECTemp™ algorithm and live physiological signals — entirely on-device, zero cloud, 100% PHI compliant
- First studied the ECTemp algorithm deeply, then designed the full system architecture: data pipelines, local storage, real-time metric visualization
- Used HealthKit, SwiftUI, WatchConnectivity, SQLite
- Achieved 99.9% data transfer reliability, under 200ms latency
- This required bridging academic research and production-quality software engineering — which Tanmay did alone.

ZOCDOC EXPERIENCE:
- Senior Integration Support Specialist, Aug 2021 – Jul 2024, Pune
- Built a full-stack Client-API audit tool (JavaScript, Retool, Postman) validating 50+ integrations, reducing manual debugging by 80%
- Automated bulk outreach tool → 2,500+ new appointments, $100K+ in revenue, 75% less manual effort
- 30+ complex SQL queries on PHI & non-PHI data, boosting extraction accuracy by 60%
- Synchronizer logic for 30+ PMS integrations → 99% uptime for real-time calendar sync

ESCAFATE (Internship):
- Web Development Intern, Mar–May 2021
- Deployed .NET + SQL Server web app, increased traffic by 50%
- Reduced onboarding time by 10 days, post-launch issues by 85%

EDUCATION:
- MS Computer Software Engineering, ASU, Aug 2024 – December 2026, GPA 3.96
- BE Electronics & Telecommunications, Pune University, Aug 2017 – May 2021, GPA 3.01

SKILLS:
- Languages: JavaScript, Swift, Python, Java, C++, Bash
- Frameworks: ReactJS, NextJS, NodeJS, Flask, GraphQL, Spring Boot
- Cloud/DB: AWS (Lambda, EC2, S3), PostgreSQL, SQLite, MongoDB, Azure
- Tools: Git, Docker, Kubernetes, Xcode, Postman, Jira

PROJECTS:
1. Healthcare Revamp — Flutter/Dart frontend, Flask backend, GraphDB via SPARQL. Diagnoses 3,000+ diseases using 20+ symptoms. Analytics dashboard for rural practitioners. Hosted on Azure.
2. Smart heat tracker iOS + watchOS App — described above.

CURRENT FOCUS — Clinavis:
- EHR intelligence platform: RAG, role-aware prompting, self-critique loops; summaries tailored per reader (physician / nurse / patient).
- Stack: FastAPI, React, Supabase + pgvector, Anthropic Claude API; HIPAA-minded, privacy-first.
- Motivation: personal hospital stay — gap between clinical charts and patient understanding.

IDEAL ROLE (January 2027):
- Software engineering, AI engineering, or data engineering
- Values strong engineering practices, thoughtful system design, engineering-product collaboration
- Loves backend systems, data-driven platforms, distributed services, and "the occasional impossible bug"
- Wants ownership, deep thinking, and meaningful products
- Prefers systems that "quietly work so well no one notices them"

BIGGEST WEAKNESS:
- Spends extra time understanding WHY something works rather than just accepting that it does
- Falls into "documentation rabbit holes" — reads source code, architecture docs before integrating tools
- Upside: deep debugger, clean solution designer. Working on balancing curiosity with pragmatism.

FUN FACTS:
- Treats personal projects like full-scale engineering products. A "small experiment" becomes a system with architecture diagrams and a well-documented README.
- Enjoys breaking down complex systems just to understand them — distributed systems, AI models, or "why code that should work absolutely refuses to cooperate"
- The Smart heat tracker research idea turned into a full wearable app with algorithm implementation and real-time data pipelines.

Remember: you are Jarvis. Be helpful, be brilliant, be slightly smug — but always in service of helping recruiters understand why Tanmay Shelar is exactly who they're looking for.`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #000000;
    --near-black: #202124;
    --white: #ffffff;
    --gray-50: #f8f9fa;
    --gray-100: #f1f3f4;
    --gray-200: #e8eaed;
    --gray-300: #dadce0;
    --gray-500: #80868b;
    --gray-700: #5f6368;
    /* Spectrum accents — original palette (not Google brand colors) */
    --spectrum-indigo: #6366f1;
    --spectrum-rose: #e11d48;
    --spectrum-amber: #d97706;
    --spectrum-teal: #0d9488;
    --spectrum-violet: #7c3aed;
    --accent-action: #4f46e5;
    --mono: 'DM Mono', ui-monospace, monospace;
    --sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --radius-pill: 9999px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--white);
    color: var(--near-black);
    font-family: var(--sans);
    font-weight: 400;
    overflow-x: hidden;
    cursor: none;
    -webkit-font-smoothing: antialiased;
  }

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

  .ps-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 24px 56px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid transparent;
    transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, padding 0.3s;
  }
  .ps-nav.scrolled {
    background: rgba(255, 255, 255, 0.92);
    border-bottom-color: var(--gray-100);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
    padding: 18px 56px;
  }
  .ps-nav-logo {
    font-family: var(--sans); font-size: 15px; font-weight: 600; letter-spacing: -0.02em;
    text-decoration: none;
    display: inline-flex; align-items: center;
  }
  .ps-nav-logo-mark {
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 36px;
    font-weight: 400;
    padding-right: 4px;
    color: var(--black);
  }
  .ps-nav-links { display: flex; gap: 32px; list-style: none; align-items: center; }
  .ps-nav-links a {
    font-family: var(--sans); font-size: 14px; font-weight: 400;
    letter-spacing: 0; color: var(--gray-700); text-decoration: none;
    position: relative; transition: color 0.2s;
  }
  .ps-nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 2px; background: var(--black); transition: width 0.25s; border-radius: 2px;
  }
  .ps-nav-links a:hover { color: var(--black); }
  .ps-nav-links a:hover::after { width: 100%; }

  .ps-hero {
    height: auto; display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 96px; position: relative;
    min-height: 100vh; overflow: hidden;
    background: var(--white);
  }
  .ps-hero::before {
    content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 85% 70% at 88% 42%, rgba(99, 102, 241, 0.11) 0%, transparent 55%),
      radial-gradient(circle at 18% 72%, rgba(13, 148, 136, 0.09) 0%, transparent 46%),
      radial-gradient(ellipse 55% 45% at 72% 88%, rgba(217, 119, 6, 0.07) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 12% 28%, rgba(225, 29, 72, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% -10%, rgba(124, 58, 237, 0.05) 0%, transparent 42%);
  }
  .ps-hero-dot-field {
    position: absolute; top: 0; right: 0; width: min(58%, 720px); height: 100%;
    z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(95, 99, 104, 0.22) 1.2px, transparent 1.2px);
    background-size: 14px 14px;
    mask-image: radial-gradient(ellipse 75% 65% at 72% 48%, #000 18%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse 75% 65% at 72% 48%, #000 18%, transparent 72%);
    opacity: 0.85;
  }
  .background-flow-canvas {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    z-index: 0; pointer-events: auto; background: transparent;
  }
  .app-container-bg {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
    z-index: 0;
  }
  .ps-hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 48px 56px 80px; position: relative; z-index: 2;
  }
  .ps-hero-tag {
    font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
    color: var(--gray-700); margin-bottom: 28px;
  }
  .ps-h1 {
    font-family: var(--sans); font-size: clamp(40px, 5.2vw, 72px); font-weight: 600;
    line-height: 1.05; letter-spacing: -0.035em; color: var(--black); margin-bottom: 28px;
  }
  .ps-h1 em { font-style: normal; font-weight: 600; color: var(--gray-700); }
  .ps-hero-desc {
    font-size: 17px; line-height: 1.65; color: var(--gray-700);
    max-width: 460px; margin-bottom: 40px;
  }
  .ps-hero-ctas { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .ps-btn-primary {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 14px 28px; min-height: 48px;
    background: var(--black); color: var(--white); font-family: var(--sans); font-size: 14px; font-weight: 500;
    letter-spacing: 0; text-decoration: none;
    border: none; border-radius: var(--radius-pill);
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s; cursor: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  }
  .ps-btn-primary:hover { background: var(--near-black); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }
  .ps-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 14px 28px; min-height: 48px;
    border: 1px solid var(--gray-300); background: var(--white);
    color: var(--black); font-family: var(--sans); font-size: 14px; font-weight: 500;
    letter-spacing: 0; text-decoration: none;
    border-radius: var(--radius-pill);
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s; cursor: none;
  }
  .ps-btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); transform: translateY(-1px); }
  .ps-hero-right {
    position: relative; overflow: visible;
    display: flex; align-items: center; justify-content: center;
    z-index: 2;
  }
  .ps-hero-photo {
    width: min(380px, 92%); height: auto; max-height: 520px; aspect-ratio: 380 / 520;
    object-fit: cover;
    border-radius: 28px;
    box-shadow: 0 24px 64px rgba(32, 33, 36, 0.12), 0 2px 8px rgba(32, 33, 36, 0.06);
  }
  .ps-project-link {
  display: inline-block;
  margin-top: 24px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray-700);
  text-decoration: none;
  transition: color 0.2s, gap 0.2s;
}
.ps-project-link:hover { color: var(--black); }

  .ps-section { padding: 120px 60px; }
  .ps-section-label {
    font-family: var(--sans); font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--gray-500); margin-bottom: 16px;
    display: flex; align-items: center; gap: 16px;
  }
  .ps-section-label::after {
    content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--gray-300);
  }
  .ps-section-title {
    font-family: var(--sans); font-size: clamp(34px, 3.8vw, 52px); font-weight: 600;
    line-height: 1.12; letter-spacing: -0.03em; margin-bottom: 56px; color: var(--near-black);
  }

  .ps-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .ps-about-text p { font-size: 17px; line-height: 1.9; color: var(--gray-700); margin-bottom: 24px; }
  .ps-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .ps-skill-item {
    padding: 20px 0; border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; gap: 12px;
  }
  .ps-skill-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--spectrum-indigo), var(--spectrum-teal));
  }
  .ps-skill-name { font-family: var(--mono); font-size: 13px; color: var(--gray-700); }
  .ps-stats-row { display: flex; gap: 0; margin-top: 56px; border-top: 1px solid var(--gray-100); }
  .ps-stat { flex: 1; padding: 32px 0; border-right: 1px solid var(--gray-100); }
  .ps-stat:last-child { border-right: none; padding-left: 32px; }
  .ps-stat:not(:first-child) { padding-left: 32px; }
  .ps-stat-num { font-family: var(--sans); font-size: 40px; font-weight: 600; line-height: 1; margin-bottom: 8px; letter-spacing: -0.03em; color: var(--near-black); }
  .ps-stat-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray-500); }

  .ps-current-section {
    background: var(--white);
    position: relative;
  }
  .ps-current-section::before {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(99, 102, 241, 0.35) 20%,
      rgba(225, 29, 72, 0.3) 45%,
      rgba(217, 119, 6, 0.35) 72%,
      rgba(13, 148, 136, 0.35) 100%);
    opacity: 0.6;
  }
  .ps-current-feature {
    position: relative;
    max-width: 920px;
    margin: 0 auto;
  }
  .ps-current-glow {
    position: absolute;
    inset: -48px -24px;
    z-index: 0;
    pointer-events: none;
    border-radius: 40px;
    background:
      radial-gradient(ellipse 55% 45% at 25% 45%, rgba(99, 102, 241, 0.22) 0%, transparent 55%),
      radial-gradient(ellipse 50% 42% at 78% 35%, rgba(225, 29, 72, 0.16) 0%, transparent 52%),
      radial-gradient(ellipse 45% 40% at 85% 75%, rgba(13, 148, 136, 0.18) 0%, transparent 52%),
      radial-gradient(ellipse 40% 38% at 15% 80%, rgba(217, 119, 6, 0.17) 0%, transparent 48%),
      radial-gradient(ellipse 35% 30% at 55% 95%, rgba(124, 58, 237, 0.12) 0%, transparent 45%);
    filter: blur(32px);
    opacity: 0.95;
  }
  .ps-current-card {
    position: relative;
    z-index: 1;
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 28px;
    padding: 44px 40px 48px;
    box-shadow:
      0 2px 8px rgba(32, 33, 36, 0.04),
      0 24px 56px rgba(32, 33, 36, 0.07),
      0 0 0 1px rgba(255, 255, 255, 0.8) inset;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .ps-current-content {
    display: flex;
    flex-direction: column;
  }
  .ps-current-slider {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 16px;
    overflow: hidden;
    background: var(--gray-200);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
  .ps-current-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    opacity: 0;
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
    transform: scale(1.02);
  }
  .ps-current-slide.active {
    opacity: 1;
    transform: scale(1);
  }
  .ps-current-kicker {
    font-family: var(--sans); font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    background: linear-gradient(90deg, var(--spectrum-indigo), var(--spectrum-teal));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 12px;
  }
  .ps-current-project-title {
    font-family: var(--sans); font-size: clamp(22px, 2.5vw, 28px);
    font-weight: 600; letter-spacing: -0.03em; color: var(--near-black);
    line-height: 1.25; margin-bottom: 16px;
  }
  .ps-current-tagline {
    font-size: 17px; line-height: 1.65; color: var(--gray-700);
    font-weight: 500; margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray-200);
  }
  .ps-current-body p {
    font-size: 16px; line-height: 1.75; color: var(--gray-700);
    margin-bottom: 18px;
  }
  .ps-current-body p:last-child { margin-bottom: 0; }
  .ps-current-note {
    margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--gray-200);
    font-size: 15px; line-height: 1.7; color: var(--gray-700);
    font-style: italic;
  }
  .ps-current-tags {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px;
  }
  .ps-current-tag {
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    padding: 8px 14px; border-radius: var(--radius-pill);
    border: 1px solid var(--gray-300);
    color: var(--gray-700); background: var(--white);
  }
  .ps-current-tag:nth-child(5n+1) { border-color: rgba(99, 102, 241, 0.35); color: #4338ca; }
  .ps-current-tag:nth-child(5n+2) { border-color: rgba(225, 29, 72, 0.3); color: #be123c; }
  .ps-current-tag:nth-child(5n+3) { border-color: rgba(217, 119, 6, 0.35); color: #b45309; }
  .ps-current-tag:nth-child(5n+4) { border-color: rgba(13, 148, 136, 0.35); color: #0f766e; }
  .ps-current-tag:nth-child(5n+5) { border-color: rgba(124, 58, 237, 0.3); color: #6d28d9; }

  .ps-timeline { display: flex; flex-direction: column; gap: 0; }
  .ps-timeline-item {
    display: grid; grid-template-columns: 200px 1fr; gap: 40px;
    padding: 40px 0; border-bottom: 1px solid var(--gray-100);
  }
  .ps-timeline-item:first-child { border-top: 1px solid var(--gray-100); }
  .ps-timeline-period { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--gray-500); margin-bottom: 8px; text-transform: uppercase; }
  .ps-timeline-location { font-family: var(--mono); font-size: 11px; color: var(--gray-300); line-height: 1.6; }
  .ps-timeline-role { font-family: var(--sans); font-size: 20px; font-weight: 600; color: var(--near-black); margin-bottom: 4px; letter-spacing: -0.02em; }
  .ps-timeline-org { font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; color: var(--gray-500); margin-bottom: 16px; text-transform: uppercase; }
  .ps-timeline-bullets { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .ps-timeline-bullets li { font-size: 14px; line-height: 1.75; color: var(--gray-700); padding-left: 16px; position: relative; }
  .ps-timeline-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--gray-300); font-size: 12px; }
  .ps-timeline-gpa {
    display: inline-block; margin-top: 12px; font-family: var(--sans);
    font-size: 12px; font-weight: 500; letter-spacing: 0.02em; text-transform: none;
    padding: 8px 16px; border: 1px solid var(--gray-300); color: var(--gray-700);
    border-radius: var(--radius-pill); background: var(--white);
  }

  .ps-exp-section { background: var(--gray-50); color: var(--near-black); }
  .ps-exp-section .ps-section-label { color: var(--gray-500); }
  .ps-exp-section .ps-section-label::after { background: var(--gray-300); }
  .ps-exp-section .ps-section-title { color: var(--near-black); }
  .ps-exp-section .ps-timeline-item { border-color: var(--gray-200); }
  .ps-exp-section .ps-timeline-item:first-child { border-color: var(--gray-200); }
  .ps-exp-section .ps-timeline-period { color: var(--gray-500); }
  .ps-exp-section .ps-timeline-location { color: var(--gray-700); }
  .ps-exp-section .ps-timeline-role { color: var(--near-black); }
  .ps-exp-section .ps-timeline-org { color: var(--gray-500); }
  .ps-exp-section .ps-timeline-bullets li { color: var(--gray-700); }
  .ps-exp-section .ps-timeline-bullets li::before { color: var(--gray-300); }

  .ps-projects-section { background: var(--gray-50); }
  .ps-projects-section .ps-section-label::after { background: var(--gray-300); }
  .ps-projects-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 1px; background: var(--gray-300); border: 1px solid var(--gray-300);
  }
  .ps-project-card {
    background: var(--white); padding: 44px 36px;
    transition: background 0.3s; position: relative; overflow: hidden;
  }
  .ps-project-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 0; height: 2px; background: var(--black); transition: width 0.4s;
  }
  .ps-project-card:hover { background: var(--gray-50); }
  .ps-project-card:hover::before { width: 100%; }
  .ps-project-num { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; color: var(--gray-500); margin-bottom: 20px; text-transform: uppercase; }
  .ps-project-title { font-family: var(--sans); font-size: 24px; line-height: 1.25; color: var(--near-black); margin-bottom: 14px; font-weight: 600; letter-spacing: -0.02em; }
  .ps-project-desc { font-size: 15px; line-height: 1.75; color: var(--gray-700); margin-bottom: 28px; }
  .ps-project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .ps-project-tag { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.02em; text-transform: none; padding: 8px 14px; border: 1px solid var(--gray-300); color: var(--gray-700); border-radius: var(--radius-pill); background: var(--white); }

  .ps-contact-inner { max-width: 680px; }
  .ps-contact-desc { font-size: 18px; line-height: 1.8; color: var(--gray-700); margin-bottom: 56px; }
  .ps-contact-link-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 0; border-bottom: 1px solid var(--gray-100);
    text-decoration: none; color: var(--black); transition: padding-left 0.3s; cursor: none;
  }
  .ps-contact-link-item:first-child { border-top: 1px solid var(--gray-100); }
  .ps-contact-link-item:hover { padding-left: 12px; }
  .ps-contact-link-left { display: flex; align-items: center; gap: 20px; }
  .ps-contact-platform { font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray-500); width: 80px; }
  .ps-contact-value { font-size: 17px; font-weight: 400; }
  .ps-contact-arrow { font-size: 20px; color: var(--gray-300); transition: color 0.2s, transform 0.2s; }
  .ps-contact-link-item:hover .ps-contact-arrow { color: var(--black); transform: translateX(4px); }

  .ps-footer {
    padding: 32px 60px; border-top: 1px solid var(--gray-100);
    display: flex; justify-content: space-between; align-items: center;
  }
  .ps-footer span { font-family: var(--sans); font-size: 12px; letter-spacing: 0.02em; color: var(--gray-700); }

  .ps-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s, transform 0.8s; }
  .ps-reveal.visible { opacity: 1; transform: translateY(0); }
  .ps-fadein { animation: fadeUp 0.8s forwards; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  .typewriter-cursor {
    display: inline-block;
    opacity: 1;
    animation: blink 1.2s step-end infinite;
    font-weight: 300;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .ps-hero .typewriter-cursor { color: var(--black); }
  .ps-exp-section .typewriter-cursor { color: var(--near-black); }

  /* ── CHATBOT ── */
  .chat-fab {
    position: fixed; bottom: 32px; right: 32px; z-index: 1000;
    height: 56px; border-radius: var(--radius-pill); padding: 0 26px 0 22px;
    background: var(--black); border: none; cursor: none;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.22), 0 0 0 0 rgba(10,10,10,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    animation: fabPulse 2.5s ease-in-out infinite;
  }
  .chat-fab:hover { transform: scale(1.05); box-shadow: 0 8px 40px rgba(0,0,0,0.32); animation: none; }
  .chat-fab svg { width: 20px; height: 20px; color: var(--white); flex-shrink: 0; }
  .chat-fab-label {
    font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0;
    color: var(--white); text-transform: none; white-space: nowrap;
  }
  @keyframes fabPulse {
    0%, 100% { box-shadow: 0 4px 32px rgba(0,0,0,0.22), 0 0 0 0 rgba(10,10,10,0.35); }
    50% { box-shadow: 0 4px 32px rgba(0,0,0,0.22), 0 0 0 12px rgba(10,10,10,0); }
  }

  .chat-window {
    position: fixed; bottom: 100px; right: 32px; z-index: 1000;
    width: 380px; height: 540px;
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: 20px;
    box-shadow: 0 12px 48px rgba(32, 33, 36, 0.14), 0 2px 8px rgba(32, 33, 36, 0.06);
    overflow: hidden;
    display: flex; flex-direction: column;
    opacity: 0; pointer-events: none;
    transform: translateY(16px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .chat-window.open { opacity: 1; pointer-events: all; transform: translateY(0); }

  .chat-header {
    padding: 18px 22px; border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--near-black);
  }
  .chat-header-left { display: flex; align-items: center; gap: 12px; }
  .chat-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--gray-700);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono); font-size: 12px; color: var(--white);
    letter-spacing: 0.05em;
  }
  .chat-header-info {}
  .chat-name { font-family: var(--mono); font-size: 13px; color: var(--white); letter-spacing: 0.05em; }
  .chat-status { font-family: var(--mono); font-size: 10px; color: var(--gray-500); letter-spacing: 0.08em; display: flex; align-items: center; gap: 6px; margin-top: 2px; }
  .chat-status-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  .chat-close { background: none; border: none; cursor: none; color: var(--gray-500); font-size: 20px; line-height: 1; transition: color 0.2s; }
  .chat-close:hover { color: var(--white); }

  .chat-messages {
    flex: 1; overflow-y: auto; padding: 20px;
    display: flex; flex-direction: column; gap: 14px;
    scrollbar-width: thin; scrollbar-color: var(--gray-100) transparent;
  }
  .chat-msg { display: flex; flex-direction: column; gap: 4px; max-width: 85%; }
  .chat-msg.user { align-self: flex-end; align-items: flex-end; }
  .chat-msg.assistant { align-self: flex-start; }
  .chat-bubble {
    padding: 12px 16px; font-size: 13px; line-height: 1.55;
    font-family: var(--sans);
    border-radius: 18px;
  }
  .chat-msg.user .chat-bubble { background: var(--black); color: var(--white); }
  .chat-msg.assistant .chat-bubble { background: var(--gray-100); color: var(--near-black); }
  .chat-sender { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--gray-500); text-transform: uppercase; }

  .chat-typing { display: flex; gap: 4px; align-items: center; padding: 10px 16px; background: var(--gray-100); width: fit-content; border-radius: 18px; }
  .chat-typing span { width: 6px; height: 6px; background: var(--gray-500); border-radius: 50%; animation: typingDot 1.2s infinite; }
  .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingDot { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

  .chat-input-row {
    padding: 16px 20px; border-top: 1px solid var(--gray-100);
    display: flex; gap: 10px; align-items: center;
  }
  .chat-input {
    flex: 1; border: 1px solid var(--gray-300); background: var(--gray-50);
    padding: 12px 16px; font-family: var(--sans); font-size: 13px;
    color: var(--black); outline: none;
    border-radius: var(--radius-pill);
    transition: border-color 0.2s, background 0.2s;
  }
  .chat-input:focus { border-color: var(--gray-700); background: var(--white); }
  .chat-input::placeholder { color: var(--gray-300); }
  .chat-send {
    width: 44px; height: 44px; background: var(--accent-action); border: none;
    cursor: none; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background 0.2s; border-radius: 50%;
  }
  .chat-send:hover { background: #4338ca; }
  .chat-send svg { width: 16px; height: 16px; color: var(--white); }
  .chat-send:disabled { background: var(--gray-300); opacity: 0.7; }

  .chat-suggestions {
    display: flex; flex-wrap: wrap; gap: 6px; padding: 0 20px 12px;
  }
  .chat-suggestion {
    font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0;
    padding: 8px 14px; border: 1px solid var(--gray-300);
    background: var(--white); color: var(--gray-700); cursor: none;
    border-radius: var(--radius-pill);
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    text-align: left;
  }
  .chat-suggestion:hover { border-color: var(--gray-700); color: var(--near-black); background: var(--gray-50); }

  @media (max-width: 900px) {
    .ps-current-glow { inset: -32px -12px; filter: blur(24px); }
    .ps-current-card { padding: 32px 24px 36px; border-radius: 22px; grid-template-columns: 1fr; gap: 40px; }
    .ps-nav { padding: 24px 28px; }
    .ps-hero { grid-template-columns: 1fr; }
    .ps-hero-right { height: 420px; }
    .ps-hero-left { padding: 100px 28px 60px; }
    .ps-section { padding: 80px 28px; }
    .ps-about-grid { grid-template-columns: 1fr; gap: 48px; }
    .ps-projects-grid { grid-template-columns: 1fr; }
    .ps-timeline-item { grid-template-columns: 1fr; gap: 12px; }
    .ps-footer { flex-direction: column; gap: 12px; padding: 28px; }
    .chat-window { width: calc(100vw - 32px); right: 16px; bottom: 90px; }
    .chat-fab { right: 16px; bottom: 24px; }
  }
`;

// ── Data ──
const SKILLS = [
  "Java", "Swift", "Python", "JavaScript",
  "ReactJS", "NextJS", "Node.js", "Spring Boot",
  "AWS", "Azure", "Docker", "Kubernetes", "Kafka", "PostgreSQL", "GraphQL", "MongoDB", "SQLite", "Redis", "RAG", "LLMs",
];

const EXPERIENCE = [
  {
    period: "Jan 2025 – Sept 2025", location: "Tempe, Arizona",
    role: "Software Engineer", org: "Research Project · Arizona State University",
    bullets: [
      "Led full-stack development of an iOS + watchOS companion fitness app estimating core body temperature within ±0.2°C using the ECTemp™ algorithm, fully on-device.",
      "Architected a privacy-first health data pipeline using HealthKit, SwiftUI, and SQLite — capturing 5+ metrics per second with 100% PHI/PII compliance and zero cloud dependency.",
      "Engineered an offline-first WatchOS app using WatchConnectivity, achieving 99.9% data transfer reliability and latency under 200ms.",
      "Implemented CSV export of de-identified data, cutting reporting time by 90% and accelerating IRB-approved studies.",
    ],
  },
  {
    period: "Aug 2021 – Jul 2024", location: "Pune, Maharashtra",
    role: "Senior Integration Support Specialist", org: "Zocdoc",
    bullets: [
      "Engineered a full-stack Client-API audit tool using JavaScript, Retool, and Postman — validating 50+ integrations and reducing manual debugging by 80%.",
      "Directed a bulk outreach automation tool driving 2,500+ new appointments and $100K+ in revenue, cutting manual effort by 75%.",
      "Developed 30+ SQL queries handling PHI & non-PHI data, boosting extraction accuracy by 60% while maintaining compliance.",
      "Designed synchronizer logic for 30+ PMS integrations, achieving 99% uptime for real-time calendar sync.",
    ],
  },
  {
    period: "Mar 2021 – May 2021", location: "Remote, Maharashtra",
    role: "Web Development Intern", org: "Escafate",
    bullets: [
      "Deployed a scalable .NET + SQL Server web app, improving performance and increasing site traffic by 50%.",
      "Documented and debugged codebase, reducing onboarding time by 10 days and post-launch issues by 85%.",
    ],
  },
];

const EDUCATION = [
  { period: "Aug 2024 – December 2026", location: "Tempe, Arizona", role: "Master of Science", org: "Computer Software Engineering · Arizona State University", gpa: "GPA 3.96" },
  { period: "Aug 2017 – May 2021", location: "Pune, Maharashtra", role: "Bachelor of Engineering", org: "Electronics & Telecommunications · Pune University", gpa: "GPA 3.01" },
];

const PROJECTS = [
  {
    num: "01", title: "Smart heat tracker — iOS + watchOS",
    desc: "Estimates core body temperature within ±0.2°C using live heart rate and the ECTemp™ algorithm — fully on-device, no cloud, 100% PHI compliant.",
    tags: ["Swift", "SwiftUI", "HealthKit", "WatchConnectivity", "SQLite"],
    link: "https://github.com/1110tanmay/SmartHeat-Tracker",
  },
  {
    num: "02", title: "Healthcare Revamp",
    desc: "A web app diagnosing 3,000+ diseases using 20+ symptoms, age ranges, lifestyle factors, and sex. Analytics dashboard for rural practitioners hosted on Azure.",
    tags: ["Flutter", "Dart", "Flask", "GraphDB", "SPARQL", "Azure"],
    link: "https://github.com/1110tanmay/Healthcare-Revamp-",
  },
];

const CURRENT_WORK = {
  title: "Clinavis: Role-Aware AI for Electronic Health Records",
  tagline: "Clinical notes are dense, jargon-heavy, and written for no one in particular. Clinavis fixes that.",
  paragraphs: [
    "I'm building an EHR intelligence platform that uses retrieval-augmented generation (RAG), role-aware prompting, and self-critique loops to transform complex clinical notes into summaries tailored to who's reading them — a physician gets a full clinical narrative, a nurse gets a shift-focused brief, and a patient gets a plain-language explanation they can actually understand.",
    "Built on FastAPI, React, Supabase with pgvector, and the Anthropic Claude API. Designed with HIPAA compliance and privacy-first architecture from day one.",
  ],
  note: "Inspired by a personal hospital stay where I realized how much gets lost in translation between a chart and a patient.",
  stack: ["FastAPI", "React", "Supabase", "pgvector", "Claude API", "HIPAA-first"],
  link: "https://clinavis-frontend.vercel.app/"
};

const CONTACTS = [
  { platform: "Email", value: "tshelar@asu.edu", href: "mailto:tshelar@asu.edu" },
  { platform: "GitHub", value: "github.com/1110tanmay", href: "https://github.com/1110tanmay" },
  { platform: "LinkedIn", value: "linkedin.com/in/tanmay-shelar", href: "https://linkedin.com/in/tanmay-shelar/" },
  { platform: "Phone", value: "602-796-9188", href: "tel:6027969188" },
  { platform: "Resume", value: "Latest Resume", href: "https://drive.google.com/file/d/1kza-oXXoKMrxJEFJzOJIQC3kdtcEAMtM/view" },
];

const SUGGESTIONS = [
  "Tell me about Tanmay",
  "What's his strongest project?",
  "What roles is he looking for?",
  "What's his biggest weakness?",
];

// ── Hooks ──
function useReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return el => { if (el && !refs.current.includes(el)) refs.current.push(el); };
}

// ── Typewriter ──
function Typewriter({ segments, speed = 40, delay = 50 }) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef();

  const totalChars = segments.reduce((sum, seg) => sum + (typeof seg === 'string' ? seg.length : 0), 0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let chars = 0;
    const t1 = setTimeout(() => {
      const t2 = setInterval(() => {
        chars++;
        setVisibleChars(chars);
        if (chars >= totalChars) clearInterval(t2);
      }, speed);
      return () => clearInterval(t2);
    }, delay);
    return () => clearTimeout(t1);
  }, [started, totalChars, speed, delay]);

  let charsRendered = 0;
  return (
    <span ref={ref} style={{ display: 'inline' }}>
      {segments.map((seg, idx) => {
        if (typeof seg === 'string') {
          const start = charsRendered;
          charsRendered += seg.length;
          const end = charsRendered;
          if (visibleChars <= start) return null;
          if (visibleChars >= end) return <span key={idx}>{seg}</span>;
          return <span key={idx}>{seg.substring(0, visibleChars - start)}</span>;
        } else {
          if (visibleChars >= charsRendered) return <React.Fragment key={idx}>{seg}</React.Fragment>;
          return null;
        }
      })}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

// ── Chatbot ──
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Good day. I'm Tamy — Tanmay's slightly overqualified digital assistant. I've been briefed extensively on his background, experience, and that one time he spent three days debugging a timezone issue. How may I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    setShowSuggestions(false);
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages,
          ],
          max_tokens: 300,
          temperature: 0.8,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "My apologies — it appears I've encountered a momentary lapse. Do try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Even I have off days. It appears the network is being uncooperative. Please try again momentarily." }]);
    }
    setLoading(false);
  };

  const handleKey = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* FAB */}
      <button className="chat-fab" onClick={() => setOpen(o => !o)} title="Chat with Tamy">
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        }
        {!open && <span className="chat-fab-label">Tanmay's AI agent</span>}
      </button>

      {/* Window */}
      <div className={`chat-window${open ? " open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">J</div>
            <div className="chat-header-info">
              <div className="chat-name">TAMY</div>
              <div className="chat-status">
                <span className="chat-status-dot" />
                <span>Tanmay's AI Assistant</span>
              </div>
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)}>×</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <span className="chat-sender">{m.role === "assistant" ? "Tamy" : "You"}</span>
              <div className="chat-bubble">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg assistant">
              <span className="chat-sender">Tamy</span>
              <div className="chat-typing"><span /><span /><span /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="chat-suggestion" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Ask me anything about Tanmay..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
          <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </>
  );
}

// ── Cursor ──
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = e => { if (e.target.closest("a, button")) setExpanded(true); };
    const out = e => { if (e.target.closest("a, button")) setExpanded(false); };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);
  return <div className={`ps-cursor${expanded ? " expand" : ""}`} style={{ left: pos.x, top: pos.y }} />;
}

// ── Nav ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`ps-nav ${scrolled ? "scrolled" : ""}`}>
      <a className="ps-nav-logo" href="#"><span className="ps-nav-logo-mark">Tanmay Shelar</span></a>
      <ul className="ps-nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#current-work">Now</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#education">Education</a></li>
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
      <SkillsCloud />
      <div className="ps-hero-dot-field" aria-hidden />
      <div className="ps-hero-left">
        <p className="ps-hero-tag ps-fadein" style={{ animationDelay: "0.4s", opacity: 0 }}>Software & AI Engineer · Tempe, Arizona</p>
        <h1 className="ps-h1 ps-fadein" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <Typewriter delay={700} segments={["Building things ", <em>that matter.</em>]} />
        </h1>
        <p className="ps-hero-desc ps-fadein" style={{ animationDelay: "0.95s", opacity: 0 }}>
          I'm Tanmay Shelar, a Software Engineering graduate student at ASU with 3+ years of experience across full-stack development, cloud platforms, mobile ecosystems, and applied AI. I build practical, privacy-conscious systems from AI-powered clinical summarization platforms using RAG and LLMs to wearable health applications with Swift, HealthKit, and on-device data processing. Seeking full-time Software Engineering or AI Engineering roles starting January 2027.
        </p>
        <div className="ps-hero-ctas ps-fadein" style={{ animationDelay: "1.15s", opacity: 0 }}>
          <a href="#projects" className="ps-btn-primary">View Work</a>
          <a href="#contact" className="ps-btn-ghost">Get in Touch</a>
        </div>
      </div>
      <div className="ps-hero-right">
        <img className="ps-hero-photo" src={photo} alt="Tanmay Shelar" width={380} height={520} />
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
        <Typewriter delay={300} segments={["Crafting software", <br />, "with intention."]} />
      </h2>
      <div className="ps-about-grid">
        <div className="ps-about-text ps-reveal" ref={revealRef}>
          <p>I'm a Software Engineering graduate student at Arizona State University focused on building scalable, reliable systems across full-stack and AI-driven applications.</p>
          <p>My experience spans production systems and research — from developing backend data pipelines and internal tools at Zocdoc to building privacy-first health-tech applications that process sensitive data entirely on-device.</p>
          <p>I enjoy working at the intersection of software engineering, data, and AI — designing systems that are not just functional, but efficient, secure, and thoughtfully engineered.</p>
          <p>Lately, I've been exploring AI-powered systems, including retrieval-based architectures and intelligent pipelines that turn complex data into meaningful insights.</p>
          <p>Outside of engineering, I enjoy playing tennis, chess, and spending time outdoors — especially hiking.</p>
        </div>
        <div className="ps-reveal" ref={revealRef}>
          <div className="ps-skills-grid">
            {SKILLS.map(s => (<div className="ps-skill-item" key={s}><span className="ps-skill-dot" /><span className="ps-skill-name">{s}</span></div>))}
          </div>
          <div className="ps-stats-row">
            {[["3+", "Years exp."], ["3.96", "MS GPA"], ["Dec '26", "Available"]].map(([n, l]) => (
              <div className="ps-stat" key={l}><div className="ps-stat-num">{n}</div><div className="ps-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Current work (Clinavis) ──
function CurrentWork({ revealRef }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [clinavis1, clinavis2, clinavis3, clinavis4, clinavis5];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="ps-section ps-current-section" id="current-work">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Focus</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        <Typewriter delay={200} segments={["What am I currently ", "working on?"]} />
      </h2>
      <div className="ps-current-feature ps-reveal" ref={revealRef}>
        <div className="ps-current-glow" aria-hidden />
        <article className="ps-current-card">
          <div className="ps-current-content">
            <p className="ps-current-kicker">In progress</p>
            <h3 className="ps-current-project-title">{CURRENT_WORK.title}</h3>
            <p className="ps-current-tagline">{CURRENT_WORK.tagline}</p>
            <div className="ps-current-body">
              {CURRENT_WORK.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="ps-current-note">{CURRENT_WORK.note}</p>
            <div className="ps-current-tags">
              {CURRENT_WORK.stack.map(t => (
                <span className="ps-current-tag" key={t}>{t}</span>
              ))}
            </div>
            {CURRENT_WORK.link && (
              <a href={CURRENT_WORK.link} target="_blank" rel="noopener noreferrer" className="ps-project-link" style={{ marginTop: '32px' }}>
                Visit Clinavis →
              </a>
            )}
          </div>
          <div className="ps-current-slider">
            {slides.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Clinavis dashboard screenshot ${idx + 1}`}
                className={`ps-current-slide ${idx === activeSlide ? "active" : ""}`}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

// ── Experience ──
function Experience({ revealRef }) {
  return (
    <section className="ps-section ps-exp-section" id="experience">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Experience</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        <Typewriter delay={300} segments={["Where I've", <br />, "worked."]} />
      </h2>
      <div className="ps-timeline ps-reveal" ref={revealRef}>
        {EXPERIENCE.map((e, i) => (
          <div className="ps-timeline-item" key={i}>
            <div className="ps-timeline-left">
              <p className="ps-timeline-period">{e.period}</p>
              <p className="ps-timeline-location">{e.location}</p>
            </div>
            <div className="ps-timeline-right">
              <h3 className="ps-timeline-role">{e.role}</h3>
              <p className="ps-timeline-org">{e.org}</p>
              <ul className="ps-timeline-bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Education ──
function Education({ revealRef }) {
  return (
    <section className="ps-section" id="education">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Education</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        <Typewriter delay={300} segments={["Where I've", <br />, "studied."]} />
      </h2>
      <div className="ps-timeline ps-reveal" ref={revealRef}>
        {EDUCATION.map((e, i) => (
          <div className="ps-timeline-item" key={i}>
            <div className="ps-timeline-left">
              <p className="ps-timeline-period">{e.period}</p>
              <p className="ps-timeline-location">{e.location}</p>
            </div>
            <div className="ps-timeline-right">
              <h3 className="ps-timeline-role">{e.role}</h3>
              <p className="ps-timeline-org">{e.org}</p>
              <span className="ps-timeline-gpa">{e.gpa}</span>
            </div>
          </div>
        ))}
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
        <Typewriter delay={300} segments={["Projects I'm", <br />, "proud of."]} />
      </h2>
      <div className="ps-projects-grid ps-reveal" ref={revealRef}>
        {PROJECTS.map(p => (
          <div className="ps-project-card" key={p.num}>
            <p className="ps-project-num">{p.num}</p>
            <h3 className="ps-project-title">{p.title}</h3>
            <p className="ps-project-desc">{p.desc}</p>
            <div className="ps-project-tags">{p.tags.map(t => <span className="ps-project-tag" key={t}>{t}</span>)}</div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="ps-project-link">
                View on GitHub →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ──
function Contact({ revealRef }) {
  return (
    <section className="ps-section" id="contact">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Contact</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>
        <Typewriter delay={300} segments={["Let's build", <br />, "something together."]} />
      </h2>
      <div className="ps-contact-inner ps-reveal" ref={revealRef}>
        <p className="ps-contact-desc">Open to full-time Software Engineering roles starting January 2027. If you're working on something interesting, I'd love to hear about it.</p>
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
      <span>Designed &amp; built with care</span>
    </footer>
  );
}

// ── Skills Cloud ──
const cloudOptions = {
  clickToFront: 500,
  depth: 1,
  imageScale: 2,
  initial: [0.1, -0.1],
  outlineMethod: "none",
  reverse: true,
  maxSpeed: 0.01,
  minSpeed: 0.005,
  wheelZoom: false,
  textFont: "var(--sans)",
  textColour: "rgba(95, 99, 104, 0.45)",
  textHeight: 18,
};

function SkillsCloud() {
  const extraSkills = [
    "npm", "Data Structures and Algorithms", "System Design",
    "Object-Oriented Programming", "Postman", "Xcode", "VS Code",
    "Jira", "Confluence", "Notion", "Tensorflow", "DataDog", "Retool", "Scrum", "Agile", "Git",
    "Cursor", "Antigravity", "API", "REST APIs", "HTML", "CSS", "npm", "Bash", "CI/CD", "Gradle"
  ];
  const allCloudSkills = [...SKILLS, ...extraSkills];

  const content = allCloudSkills.map(skill => (
    <a key={skill} href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>
      {skill}
    </a>
  ));

  return (
    <>
      <div className="app-container-bg" />
      <div className="background-flow-canvas">
        <Cloud
          id="skills-cloud"
          options={cloudOptions}
          containerProps={{
            style: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }
          }}
          canvasProps={{
            style: { width: '100%', height: '100%', opacity: 0.5 }
          }}
        >
          {content}
        </Cloud>
      </div>
    </>
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
      <CurrentWork revealRef={revealRef} />
      <Experience revealRef={revealRef} />
      <Education revealRef={revealRef} />
      <Projects revealRef={revealRef} />
      <Contact revealRef={revealRef} />
      <Footer />
      <Chatbot />
    </>
  );
}