import { useState, useEffect, useRef } from "react";
import photo from './assets/ProfessionalPicture2.png';

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
- GPA: 3.89 (MS), 3.01 (BE)
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
- MS Computer Software Engineering, ASU, Aug 2024 – December 2026, GPA 3.89
- BE Electronics & Telecommunications, Pune University, Aug 2017 – May 2021, GPA 3.01

SKILLS:
- Languages: JavaScript, Swift, Python, Java, C++, Bash
- Frameworks: ReactJS, NextJS, NodeJS, Flask, GraphQL, Spring Boot
- Cloud/DB: AWS (Lambda, EC2, S3), PostgreSQL, SQLite, MongoDB, Azure
- Tools: Git, Docker, Kubernetes, Xcode, Postman, Jira

PROJECTS:
1. Healthcare Revamp — Flutter/Dart frontend, Flask backend, GraphDB via SPARQL. Diagnoses 3,000+ diseases using 20+ symptoms. Analytics dashboard for rural practitioners. Hosted on Azure.
2. Smart heat tracker iOS + watchOS App — described above.

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
    padding: 28px 60px;
    background: rgba(248,247,244,0.85);
    backdrop-filter: blur(8px);
  }
  .ps-nav-logo {
    font-family: var(--mono); font-size: 13px; letter-spacing: 0.08em;
    color: var(--black); text-decoration: none;
  }
  .ps-nav-links { display: flex; gap: 40px; list-style: none; }
  .ps-nav-links a {
    font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--gray-700); text-decoration: none;
    position: relative; transition: color 0.2s;
  }
  .ps-nav-links a::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: var(--black); transition: width 0.3s;
  }
  .ps-nav-links a:hover { color: var(--black); }
  .ps-nav-links a:hover::after { width: 100%; }

  .ps-hero {
    height: auto; display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 80px; position: relative;
  }
  .ps-hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px 60px;
  }
  .ps-hero-tag {
    font-family: var(--mono); font-size: 12px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--gray-500); margin-bottom: 32px;
  }
  .ps-h1 {
    font-family: var(--serif); font-size: clamp(52px, 6vw, 88px);
    line-height: 1.02; letter-spacing: -0.02em; color: var(--black); margin-bottom: 32px;
  }
  .ps-h1 em { font-style: italic; color: var(--gray-500); }
  .ps-hero-desc {
    font-size: 17px; line-height: 1.8; color: var(--gray-700);
    max-width: 420px; margin-bottom: 52px;
  }
  .ps-hero-ctas { display: flex; gap: 16px; align-items: center; }
  .ps-btn-primary {
    display: inline-block; padding: 14px 32px; background: var(--black);
    color: var(--white); font-family: var(--mono); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
    border: none; transition: background 0.2s, transform 0.2s; cursor: none;
  }
  .ps-btn-primary:hover { background: var(--gray-700); transform: translateY(-1px); }
  .ps-btn-ghost {
    display: inline-block; padding: 14px 32px; border: 1px solid var(--black);
    color: var(--black); font-family: var(--mono); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
    transition: background 0.2s, color 0.2s, transform 0.2s; cursor: none;
  }
  .ps-btn-ghost:hover { background: var(--black); color: var(--white); transform: translateY(-1px); }
  .ps-hero-right {
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
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
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gray-500); margin-bottom: 16px;
    display: flex; align-items: center; gap: 16px;
  }
  .ps-section-label::after {
    content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--gray-300);
  }
  .ps-section-title {
    font-family: var(--serif); font-size: clamp(36px, 4vw, 56px);
    line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 64px;
  }

  .ps-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .ps-about-text p { font-size: 17px; line-height: 1.9; color: var(--gray-700); margin-bottom: 24px; }
  .ps-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .ps-skill-item {
    padding: 20px 0; border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; gap: 12px;
  }
  .ps-skill-dot { width: 5px; height: 5px; background: var(--black); border-radius: 50%; flex-shrink: 0; }
  .ps-skill-name { font-family: var(--mono); font-size: 13px; color: var(--gray-700); }
  .ps-stats-row { display: flex; gap: 0; margin-top: 56px; border-top: 1px solid var(--gray-100); }
  .ps-stat { flex: 1; padding: 32px 0; border-right: 1px solid var(--gray-100); }
  .ps-stat:last-child { border-right: none; padding-left: 32px; }
  .ps-stat:not(:first-child) { padding-left: 32px; }
  .ps-stat-num { font-family: var(--serif); font-size: 42px; line-height: 1; margin-bottom: 8px; }
  .ps-stat-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray-500); }

  .ps-timeline { display: flex; flex-direction: column; gap: 0; }
  .ps-timeline-item {
    display: grid; grid-template-columns: 200px 1fr; gap: 40px;
    padding: 40px 0; border-bottom: 1px solid var(--gray-100);
  }
  .ps-timeline-item:first-child { border-top: 1px solid var(--gray-100); }
  .ps-timeline-period { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--gray-500); margin-bottom: 8px; text-transform: uppercase; }
  .ps-timeline-location { font-family: var(--mono); font-size: 11px; color: var(--gray-300); line-height: 1.6; }
  .ps-timeline-role { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--black); margin-bottom: 4px; }
  .ps-timeline-org { font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; color: var(--gray-500); margin-bottom: 16px; text-transform: uppercase; }
  .ps-timeline-bullets { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .ps-timeline-bullets li { font-size: 14px; line-height: 1.75; color: var(--gray-700); padding-left: 16px; position: relative; }
  .ps-timeline-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--gray-300); font-size: 12px; }
  .ps-timeline-gpa {
    display: inline-block; margin-top: 12px; font-family: var(--mono);
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 4px 12px; border: 1px solid var(--gray-100); color: var(--gray-500);
  }

  .ps-exp-section { background: var(--black); color: var(--white); }
  .ps-exp-section .ps-section-label { color: var(--gray-500); }
  .ps-exp-section .ps-section-label::after { background: var(--gray-700); }
  .ps-exp-section .ps-section-title { color: var(--white); }
  .ps-exp-section .ps-timeline-item { border-color: #1a1a1a; }
  .ps-exp-section .ps-timeline-item:first-child { border-color: #1a1a1a; }
  .ps-exp-section .ps-timeline-period { color: var(--gray-500); }
  .ps-exp-section .ps-timeline-location { color: #3a3a3a; }
  .ps-exp-section .ps-timeline-role { color: var(--white); }
  .ps-exp-section .ps-timeline-org { color: var(--gray-500); }
  .ps-exp-section .ps-timeline-bullets li { color: var(--gray-300); }
  .ps-exp-section .ps-timeline-bullets li::before { color: #333; }

  .ps-projects-section { background: var(--gray-100); }
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
  .ps-project-card:hover { background: var(--gray-100); }
  .ps-project-card:hover::before { width: 100%; }
  .ps-project-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em; color: var(--gray-500); margin-bottom: 24px; }
  .ps-project-title { font-family: var(--serif); font-size: 26px; line-height: 1.2; color: var(--black); margin-bottom: 16px; font-weight: 400; }
  .ps-project-desc { font-size: 14px; line-height: 1.8; color: var(--gray-700); margin-bottom: 32px; }
  .ps-project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .ps-project-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; border: 1px solid var(--gray-300); color: var(--gray-700); }

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
  .ps-footer span { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--gray-500); }

  .ps-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s, transform 0.8s; }
  .ps-reveal.visible { opacity: 1; transform: translateY(0); }
  .ps-fadein { animation: fadeUp 0.8s forwards; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  /* ── CHATBOT ── */
  .chat-fab {
    position: fixed; bottom: 32px; right: 32px; z-index: 1000;
    height: 60px; border-radius: 999px; padding: 0 28px 0 20px;
    background: var(--black); border: none; cursor: none;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.22), 0 0 0 0 rgba(10,10,10,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    animation: fabPulse 2.5s ease-in-out infinite;
  }
  .chat-fab:hover { transform: scale(1.05); box-shadow: 0 8px 40px rgba(0,0,0,0.32); animation: none; }
  .chat-fab svg { width: 20px; height: 20px; color: var(--white); flex-shrink: 0; }
  .chat-fab-label {
    font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em;
    color: var(--white); text-transform: uppercase; white-space: nowrap;
  }
  @keyframes fabPulse {
    0%, 100% { box-shadow: 0 4px 32px rgba(0,0,0,0.22), 0 0 0 0 rgba(10,10,10,0.35); }
    50% { box-shadow: 0 4px 32px rgba(0,0,0,0.22), 0 0 0 12px rgba(10,10,10,0); }
  }

  .chat-window {
    position: fixed; bottom: 100px; right: 32px; z-index: 1000;
    width: 380px; height: 540px;
    background: var(--white); border: 1px solid var(--gray-100);
    box-shadow: 0 16px 64px rgba(0,0,0,0.12);
    display: flex; flex-direction: column;
    opacity: 0; pointer-events: none;
    transform: translateY(16px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .chat-window.open { opacity: 1; pointer-events: all; transform: translateY(0); }

  .chat-header {
    padding: 20px 24px; border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--black);
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
    padding: 10px 14px; font-size: 13px; line-height: 1.6;
    font-family: var(--sans);
  }
  .chat-msg.user .chat-bubble { background: var(--black); color: var(--white); }
  .chat-msg.assistant .chat-bubble { background: var(--gray-100); color: var(--black); }
  .chat-sender { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--gray-500); text-transform: uppercase; }

  .chat-typing { display: flex; gap: 4px; align-items: center; padding: 10px 14px; background: var(--gray-100); width: fit-content; }
  .chat-typing span { width: 6px; height: 6px; background: var(--gray-500); border-radius: 50%; animation: typingDot 1.2s infinite; }
  .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingDot { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

  .chat-input-row {
    padding: 16px 20px; border-top: 1px solid var(--gray-100);
    display: flex; gap: 10px; align-items: center;
  }
  .chat-input {
    flex: 1; border: 1px solid var(--gray-100); background: var(--white);
    padding: 10px 14px; font-family: var(--sans); font-size: 13px;
    color: var(--black); outline: none;
    transition: border-color 0.2s;
  }
  .chat-input:focus { border-color: var(--black); }
  .chat-input::placeholder { color: var(--gray-300); }
  .chat-send {
    width: 38px; height: 38px; background: var(--black); border: none;
    cursor: none; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background 0.2s;
  }
  .chat-send:hover { background: var(--gray-700); }
  .chat-send svg { width: 16px; height: 16px; color: var(--white); }
  .chat-send:disabled { background: var(--gray-300); }

  .chat-suggestions {
    display: flex; flex-wrap: wrap; gap: 6px; padding: 0 20px 12px;
  }
  .chat-suggestion {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
    padding: 5px 10px; border: 1px solid var(--gray-100);
    background: none; color: var(--gray-700); cursor: none;
    transition: border-color 0.2s, color 0.2s;
    text-align: left;
  }
  .chat-suggestion:hover { border-color: var(--black); color: var(--black); }

  @media (max-width: 900px) {
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
  "Java", "Swift", "Python","JavaScript", 
  "ReactJS","NextJS","Node.js","Spring Boot",
  "AWS","Azure","Docker","Kubernetes", "Kafka", "PostgreSQL","GraphQL", "MongoDB", "SQLite", "Redis",
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
  { period: "Aug 2024 – December 2026", location: "Tempe, Arizona", role: "Master of Science", org: "Computer Software Engineering · Arizona State University", gpa: "GPA 3.89" },
  { period: "Aug 2017 – May 2021", location: "Pune, Maharashtra", role: "Bachelor of Engineering", org: "Electronics & Telecommunications · Pune University", gpa: "GPA 3.01" },
];

const PROJECTS = [
  {
    num: "01", title: "Smart heat tracker — iOS + watchOS",
    desc: "Estimates core body temperature within ±0.2°C using live heart rate and the ECTemp™ algorithm — fully on-device, no cloud, 100% PHI compliant.",
    tags: ["Swift","SwiftUI","HealthKit","WatchConnectivity","SQLite"],
    link: "https://github.com/1110tanmay/SmartHeat-Tracker",
  },
  {
    num: "02", title: "Healthcare Revamp",
    desc: "A web app diagnosing 3,000+ diseases using 20+ symptoms, age ranges, lifestyle factors, and sex. Analytics dashboard for rural practitioners hosted on Azure.",
    tags: ["Flutter","Dart","Flask","GraphDB","SPARQL","Azure"],
    link: "https://github.com/1110tanmay/Healthcare-Revamp-",
  },
];

const CONTACTS = [
  { platform: "Email",    value: "tshelar@asu.edu",               href: "mailto:tshelar@asu.edu" },
  { platform: "GitHub",   value: "github.com/1110tanmay",         href: "https://github.com/1110tanmay" },
  { platform: "LinkedIn", value: "linkedin.com/in/tanmay-shelar", href: "https://linkedin.com/in/tanmay-shelar/" },
  { platform: "Phone",    value: "602-796-9188",                  href: "tel:6027969188" },
  { platform: "Resume",    value: "Latest Resume",                  href: "https://drive.google.com/file/d/1kza-oXXoKMrxJEFJzOJIQC3kdtcEAMtM/view?usp=sharing" },
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
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
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
              <div className="chat-typing"><span/><span/><span/></div>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
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
    const out  = e => { if (e.target.closest("a, button")) setExpanded(false); };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);
  return <div className={`ps-cursor${expanded ? " expand" : ""}`} style={{ left: pos.x, top: pos.y }} />;
}

// ── Nav ──
function Nav() {
  return (
    <nav className="ps-nav">
      <a className="ps-nav-logo" href="#">TS</a>
      <ul className="ps-nav-links">
        <li><a href="#about">About</a></li>
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
      <div className="ps-hero-left">
        <p className="ps-hero-tag ps-fadein" style={{ animationDelay: "0.4s", opacity: 0 }}>Software Engineer · Tempe, Arizona</p>
        <h1 className="ps-h1 ps-fadein" style={{ animationDelay: "0.7s", opacity: 0 }}>Building things <em>that matter.</em></h1>
        <p className="ps-hero-desc ps-fadein" style={{ animationDelay: "0.95s", opacity: 0 }}>
          I'm Tanmay Shelar — a graduate student in Software Engineering at ASU with 3+ years of industry experience in full-stack development, cloud platforms, and mobile ecosystems. Seeking full-time roles starting January 2027.
        </p>
        <div className="ps-hero-ctas ps-fadein" style={{ animationDelay: "1.15s", opacity: 0 }}>
          <a href="#projects" className="ps-btn-primary">View Work</a>
          <a href="#contact" className="ps-btn-ghost">Get in Touch</a>
        </div>
      </div>
      <div className="ps-hero-right">
        <img src={photo} alt="Tanmay Shelar" style={{ width: '380px', height: '520px', objectFit: 'cover', borderRadius: '12px' }} />
      </div>
    </section>
  );
}

// ── About ──
function About({ revealRef }) {
  return (
    <section className="ps-section" id="about">
      <p className="ps-section-label ps-reveal" ref={revealRef}>About</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>Crafting software<br />with intention.</h2>
      <div className="ps-about-grid">
        <div className="ps-about-text ps-reveal" ref={revealRef}>
          <p>I'm a Software Engineering graduate student at Arizona State University with hands-on experience building iOS + watchOS applications, privacy-first health-tech systems, and scalable full-stack tools used in production.</p>
          <p>My work spans startups and research labs — from automating $100K+ in revenue at Zocdoc to building on-device health pipelines that are 100% PHI compliant and cloud-free.</p>
          <p>When I'm not coding, you'll find me exploring new technologies, hiking trails around Tempe, or obsessing over the perfect pour-over.</p>
          <p>Outside my work life, I love playing Tennis, chess and badminton. I also am a big-time hiker and love going outdoors.</p>
        </div>
        <div className="ps-reveal" ref={revealRef}>
          <div className="ps-skills-grid">
            {SKILLS.map(s => (<div className="ps-skill-item" key={s}><span className="ps-skill-dot" /><span className="ps-skill-name">{s}</span></div>))}
          </div>
          <div className="ps-stats-row">
            {[["3+","Years exp."],["3.89","MS GPA"],["Dec '26","Available"]].map(([n, l]) => (
              <div className="ps-stat" key={l}><div className="ps-stat-num">{n}</div><div className="ps-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experience ──
function Experience({ revealRef }) {
  return (
    <section className="ps-section ps-exp-section" id="experience">
      <p className="ps-section-label ps-reveal" ref={revealRef}>Experience</p>
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>Where I've<br />worked.</h2>
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
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>Where I've<br />studied.</h2>
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
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>Projects I'm<br />proud of.</h2>
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
      <h2 className="ps-section-title ps-reveal" ref={revealRef}>Let's build<br />something together.</h2>
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
      <Experience revealRef={revealRef} />
      <Education revealRef={revealRef} />
      <Projects revealRef={revealRef} />
      <Contact revealRef={revealRef} />
      <Footer />
      <Chatbot />
    </>
  );
}