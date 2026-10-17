// Single source of truth for the site's copy, stats and links.
// Martha's system prompt is built from this file too, so the bot can't drift from the page.

import portrait from './assets/portrait.jpg';
import asuLogo from './assets/logos/asu.png';
import zocdocLogo from './assets/logos/zocdoc.png';
import tvThumb from './assets/news/abc15-valley-fever.jpg';
import clinavis1 from './assets/clinavis/clinavis-1.jpg';
import clinavis2 from './assets/clinavis/clinavis-2.jpg';
import clinavis3 from './assets/clinavis/clinavis-3.jpg';
import clinavis4 from './assets/clinavis/clinavis-4.jpg';
import clinavis5 from './assets/clinavis/clinavis-5.jpg';
import clinavisArch from './assets/clinavis/architecture.png';
import phone1 from './assets/smartheat/phone-1.jpg';
import phone2 from './assets/smartheat/phone-2.jpg';
import phone3 from './assets/smartheat/phone-3.jpg';
import phone4 from './assets/smartheat/phone-4.jpg';
import phone5 from './assets/smartheat/phone-5.jpg';
import phone6 from './assets/smartheat/phone-6.jpg';
import watch1 from './assets/smartheat/watch-1.jpg';
import watch2 from './assets/smartheat/watch-2.jpg';
import watch3 from './assets/smartheat/watch-3.jpg';
import watch4 from './assets/smartheat/watch-4.jpg';
import smartheatArch from './assets/smartheat/architecture.jpg';
import atlasViewer from './assets/boneatlas/atlas-viewer.jpg';
import atlasTool from './assets/boneatlas/diagnosis-tool.jpg';
import atlasResults from './assets/boneatlas/diagnosis-results.jpg';
import awardNsync from './assets/zocdoc/award-nsync-mvp.jpg';
import awardNsync2 from './assets/zocdoc/award-nsync-mvp-2.jpg';
import awardExtraMiler from './assets/zocdoc/award-extra-miler.jpg';
import awardMingChan from './assets/zocdoc/award-ming-chan.jpg';

export const LOGOS = { asu: asuLogo, zocdoc: zocdocLogo };
export const PORTRAIT = portrait;

export const LINKS = {
  resume: 'https://drive.google.com/file/d/1yT4LeqzM-_81ce0Q78SXABIWUPBL9c2X/view?usp=sharing',
  github: 'https://github.com/1110tanmay',
  linkedin: 'https://linkedin.com/in/tanmay-shelar/',
  email: 'tshelar@asu.edu',
  phone: '602-796-9188',
  medium: 'https://medium.com/@1110tanmay',
  mediumStory: 'https://medium.com/@1110tanmay/a-plot-in-my-life-ff86153e1eb5',
  tv: 'https://youtu.be/sPPA3gCBc3g',
  clinavisRepo: 'https://github.com/1110tanmay/Clinavis.ai',
  smartheatRepo: 'https://github.com/1110tanmay/SmartHeat-Tracker',
  atlasBeta: 'https://beta.boneatlas.org/ea-prod-c/feed',
};

export const GRAD = {
  blue: 'linear-gradient(135deg, #2997ff, #5ac8fa)',
  cyan: 'linear-gradient(135deg, #5ac8fa, #2997ff)',
  orange: 'linear-gradient(135deg, #ff9f0a, #ff453a)',
  gold: 'linear-gradient(135deg, #ffd60a, #ff9f0a)',
  violet: 'linear-gradient(135deg, #bf5af2, #ff375f)',
  green: 'linear-gradient(135deg, #64d2ff, #30d158)',
  sky: 'linear-gradient(135deg, #64d2ff, #2997ff)',
  white: 'linear-gradient(#f5f5f7, #f5f5f7)',
};

export const NEWS = {
  tv: {
    href: LINKS.tv,
    thumb: tvThumb,
    outlet: 'ABC15 Arizona',
    date: 'July 2026',
    topic: 'Valley Fever research',
    title: 'Arizona researchers race to build faster Valley Fever test',
    note: "I'm part of the research team featured in this segment.",
  },
  medium: {
    href: LINKS.mediumStory,
    date: 'June 2026',
    title: 'A plot in my life.',
    blurb: 'Falling seriously ill during grad school, and the hospital stay that changed what I build.',
  },
};

// ── Proof (bento) ──
export const TILES = [
  { id: 'zocdoc-years', size: 'big', sheet: 'zocdoc', value: '3 yrs', grad: GRAD.blue, glow: 'rgba(41,151,255,.48)',
    org: { logo: zocdocLogo, alt: 'Zocdoc', sub: '2021–2024' },
    headline: 'in production with real patient data, before grad school.',
    caption: '50+ API integrations audited. 30+ PHI queries hardened.',
    badge: "2× N'Sync MVP · Extra Miler · Ming Chan nominee",
    label: '3 years at Zocdoc. Open the Zocdoc story' },
  { id: 'temp', sheet: 'wearable', value: '±0.2°C', grad: GRAD.orange, glow: 'rgba(255,159,10,.42)',
    org: { logo: asuLogo, alt: 'Arizona State University', sub: 'Research' },
    caption: 'Core body temperature, estimated entirely on a watch.',
    label: 'Plus or minus 0.2 degrees Celsius. Open the Smart Heat Tracker story' },
  { id: 'clinavis', sheet: 'clinavis', value: '99.99%', grad: GRAD.violet, glow: 'rgba(191,90,242,.44)',
    chip: { icon: 'spark', label: 'Clinavis', color: '#bf5af2' },
    caption: 'Role-attribution accuracy in AI clinical summaries.',
    label: '99.99 percent role-attribution accuracy. Open the Clinavis story' },
  { id: 'pipeline', sheet: 'zocdoc', value: '5h → 30m', grad: GRAD.cyan, glow: 'rgba(90,200,250,.4)',
    org: { logo: zocdocLogo, alt: 'Zocdoc' },
    caption: 'SQL reporting pipeline, rebuilt.',
    label: '5 hours to 30 minutes. Open the Zocdoc story' },
  { id: 'sync', sheet: 'wearable', value: '99.9%', grad: GRAD.gold, glow: 'rgba(255,214,10,.32)',
    org: { logo: asuLogo, alt: 'Arizona State University', sub: 'Apple Watch' },
    caption: 'Watch-to-phone sync reliability, under 200 ms.',
    label: '99.9 percent sync reliability. Open the Smart Heat Tracker story' },
  { id: 'atlas', size: 'wide', sheet: 'atlas', value: '15+', grad: GRAD.green, glow: 'rgba(48,209,88,.36)',
    chip: { icon: 'globe', label: 'Elder Abuse Atlas · NIJ-funded', color: '#30d158' }, pill: { text: 'Now', color: '#30d158' },
    caption: 'Contributors on a forensic research platform, where I ship today.',
    label: '15 plus contributors. Open the Elder Abuse Atlas story' },
  { id: 'gpa', size: 'wide', href: '#education', value: '3.85', grad: GRAD.white, glow: 'rgba(255,214,10,.2)',
    org: { logo: asuLogo, alt: 'Arizona State University' }, pill: { text: 'MS · Dec 2026' },
    caption: 'MS Computer Software Engineering CGPA, while working as a CSE 360 Instructional Aide.',
    label: '3.85 CGPA. Jump to education' },
];

export const PILLARS = [
  { icon: 'lock', color: '#30d158', title: 'Privacy by design.', body: 'Sensitive data stays where it belongs: on-device when possible, locked down when not.' },
  { icon: 'bars', color: '#2997ff', title: 'Production-tested.', body: 'Three years of real integrations, real uptime and real compliance at Zocdoc.' },
  { icon: 'spark', color: '#bf5af2', title: 'AI you can check.', body: 'Retrieval, reranking and self-critique, so answers fit the reader and hold up to scrutiny.' },
];

// ── Media ──
const img = (src, alt) => ({ src, alt });
export const CLINAVIS_SHOTS = [
  img(clinavis1, 'Clinavis dashboard, screen 1'), img(clinavis2, 'Clinavis dashboard, screen 2'),
  img(clinavis3, 'Clinavis dashboard, screen 3'), img(clinavis4, 'Clinavis dashboard, screen 4'),
  img(clinavis5, 'Clinavis dashboard, screen 5'),
];
export const ATLAS_SHOTS = [
  img(atlasViewer, 'Bone Atlas engine: 3D femur model with case metadata and camera controls'),
  img(atlasTool, 'Bone Atlas diagnosis tool: case inputs and affected-bone selection for Naive Bayes analysis'),
  img(atlasResults, 'Bone Atlas diagnosis results: abuse and accidental probability distributions with MCMC convergence chains'),
];
export const PHONE_SHOTS = [
  img(phone1, 'Smart Heat Tracker iPhone summary screen with core temperature'), img(phone2, 'Estimated core temperature detail screen'),
  img(phone3, 'Workout summary screen'), img(phone4, 'Daily steps progress screen'),
  img(phone5, 'Historical trends screen'), img(phone6, 'Profile screen'),
];
export const WATCH_SHOTS = [
  img(watch1, 'Apple Watch: live core temperature and heart rate'), img(watch2, 'Apple Watch: workout countdown'),
  img(watch3, 'Apple Watch: workout session controls'), img(watch4, 'Apple Watch: workout summary'),
];

export const AWARDS = [
  { src: awardNsync, title: "N'Sync MVP Award", alt: "N'Sync MVP Award certificate presented to Tanmay Shelar",
    tag: 'sync reliability · appointment failures ↓',
    quote: 'His troubleshooting and sync knowledge is absolutely amazing. His collaboration with the IE team to find solutions to sync issues has helped reduce a lot of appointment failures and downtime for many of our clients.' },
  { src: awardExtraMiler, title: 'Extra Miler Award', alt: 'Extra Miler Award certificate presented to Tanmay Shelar',
    tag: 'unbookables project · internal tooling',
    quote: 'His work on Unbookables has been amazing and we have seen promising results! … He is always keen to learn more about syncs which helps us improve our tools.' },
  { src: awardNsync2, title: "N'Sync MVP Award", alt: "Second N'Sync MVP Award certificate presented to Tanmay Shelar",
    tag: 'sync-issue detection · sync accruals',
    quote: 'Tanmay’s work on identifying sync issues, unbookables, … sync accruals … has been very impressive. … We can count on you when we have high volumes or complex tasks.' },
  { src: awardMingChan, title: 'Ming Chan Award nomination', alt: 'Ming Chan Award nomination for Tanmay Shelar',
    tag: 'peer-nominated · delivery under ambiguity',
    quote: '…his ability to be flexible, navigate through ambiguity, and deliver with excellence makes him an MVP.' },
];

// ── Story sheets ──
export const SHEETS = {
  zocdoc: {
    color: '#2997ff', glow: 'rgba(41,151,255,.32)', grad: GRAD.blue,
    logo: zocdocLogo, org: 'Zocdoc',
    kicker: 'Integration Engineering · Senior Integration Support Specialist · 2021–2024',
    title: 'Zocdoc',
    subtitle: 'Integration engineering for a healthcare marketplace: API tooling, SQL pipelines over PHI and real-time calendar sync across 50+ integrations.',
    stats: [{ v: '5h → 30m', l: 'report pipeline runtime' }, { v: '99%', l: 'calendar-sync uptime' }, { v: '60%', l: 'better extraction accuracy' }],
    bullets: [
      'Designed synchronizer logic for 30+ practice-management system integrations, holding 99% uptime on real-time calendar sync.',
      'Engineered SQL reporting pipelines that cut generation time from 5 hours to 30 minutes and improved data accuracy by 25%.',
      'Built a Client-API audit tool in JavaScript, Retool and Postman that validated 50+ integrations and cut manual debugging by 80%.',
      'Optimized 30+ SQL queries across PHI and non-PHI datasets, with compliance controls that prevent unauthorized data exposure.',
      'Automated client outreach with a script that drove 2,500+ new appointments and $100K+ in revenue, with 75% less manual effort.',
      'Worked with the Integration Engineering team on the Unbookables project, tracing the sync issues behind appointment failures.',
    ],
    stack: ['SQL', 'JavaScript', 'REST APIs', 'Retool', 'Postman', 'PMS integrations', 'PHI compliance'],
    awards: AWARDS,
    links: [],
    ask: 'Ask Martha about Zocdoc',
  },
  wearable: {
    color: '#ff9f0a', glow: 'rgba(255,159,10,.3)', grad: GRAD.orange,
    logo: asuLogo, org: 'Arizona State University',
    kicker: 'Software Engineer (Contract) · Jan – Sep 2025',
    title: 'Smart Heat Tracker',
    subtitle: 'An iPhone + Apple Watch app that estimates core body temperature from live heart rate, entirely on-device.',
    device: true,
    stats: [{ v: '±0.2°C', l: 'temperature accuracy' }, { v: '99.9%', l: 'sync reliability' }, { v: '<200 ms', l: 'sync latency' }],
    bullets: [
      'Led full-stack development in Swift, implementing the ECTemp algorithm (with a Kalman filter) on live heart-rate data.',
      'Architected a privacy-first pipeline with HealthKit, SwiftUI and SQLite: 5+ metrics per second, de-identified and kept on the device, no cloud.',
      'Engineered an offline-first watchOS app that hands finished workouts to the iPhone over WatchConnectivity.',
      'Built CSV export of de-identified data for IRB-approved studies, and took the app through TestFlight and App Store review.',
    ],
    stack: ['Swift', 'SwiftUI', 'HealthKit', 'WatchConnectivity', 'SQLite', 'Swift Charts'],
    arch: {
      src: smartheatArch, bg: '#000',
      alt: 'Smart Heat Tracker architecture: Apple Watch sensors feed HealthKit and a WorkoutManager, which estimates core temperature and sends workouts over WatchConnectivity to the iPhone, where a DatabaseManager on SQLite powers the summary, trends, profile and research-export views.',
      note: 'Apple Watch sensors stream through HealthKit into a WorkoutManager that estimates core temperature on the wrist. Finished workouts cross the WatchConnectivity bridge to the iPhone, where SQLite powers the dashboards, trends and research export.',
    },
    links: [{ label: 'View on GitHub ›', href: LINKS.smartheatRepo }],
    ask: 'Ask Martha about this app',
  },
  clinavis: {
    color: '#bf5af2', glow: 'rgba(191,90,242,.32)', grad: GRAD.violet,
    org: 'Clinavis',
    kicker: 'Lead AI & Software Developer · 2026',
    title: 'Clinavis',
    subtitle: 'Role-aware AI that turns dense clinical notes into summaries the reader can actually use.',
    slides: CLINAVIS_SHOTS,
    stats: [{ v: '99.99%', l: 'role-attribution accuracy' }, { v: '30 min', l: 'refresh cycles' }, { v: '3', l: 'engineers led' }],
    bullets: [
      'Led a team of 3 building a RAG pipeline with FastAPI, pgvector, LangChain and a provider-agnostic LLM layer (Groq, Claude, OpenAI).',
      'Designed SOAP-aware chunking and a role-weighted reranker on sentence-transformers embeddings and pgvector cosine similarity.',
      'Added a self-critique loop to sharpen retrieval relevance.',
      'One note, four dashboards: physician, nurse, patient and admin, behind JWT auth and role-based access control.',
    ],
    note: 'A hospital stay showed me how much gets lost between a chart and the person it describes.',
    stack: ['FastAPI', 'pgvector', 'Supabase', 'LangChain', 'Claude API', 'sentence-transformers', 'React'],
    arch: {
      src: clinavisArch, bg: '#fff',
      alt: 'Clinavis architecture: admin, doctor, nurse and patient dashboards call a FastAPI gateway over JWT and REST; the backend runs a chunking, embedding, retrieval, reranking and summarization pipeline on Supabase Auth, PostgreSQL and pgvector, with a provider-agnostic LLM layer.',
      note: 'Four role dashboards talk to one FastAPI gateway. Notes flow through chunking, embedding, pgvector retrieval, reranking and role-specific summarization, with the LLM provider swappable behind a single wrapper.',
    },
    media: true,
    links: [],
    ask: 'Ask Martha about Clinavis',
  },
  atlas: {
    color: '#30d158', glow: 'rgba(48,209,88,.28)', grad: GRAD.green,
    org: 'Elder Abuse Atlas · NIJ-funded',
    kicker: 'Software Developer · Aug 2026 – now · ASU Capstone',
    title: 'Elder Abuse Atlas',
    subtitle: 'An NIJ-funded forensic research platform, built by a team of 15+.',
    slides: ATLAS_SHOTS,
    stats: [{ v: '15+', l: 'contributors' }, { v: '2', l: 'build flavors under E2E tests' }, { v: '3D', l: 'skeletal-model viewer' }],
    bullets: [
      'Ship through a task → user story → sprint branching flow with PR review on a Spring GraphQL + MongoDB backend.',
      'Enforced notebook-entry validation across the stack: one rule set in Java Spring Boot and a shared TypeScript validator, backed by JUnit.',
      'Built a notes-to-3D-viewer deep link in Vue 3 and Three.js that opens an annotation at its saved location.',
      'Expanded Playwright coverage for a Bayesian diagnosis tool across two build flavors.',
    ],
    stack: ['Java', 'Spring GraphQL', 'MongoDB', 'TypeScript', 'Vue 3', 'Three.js', 'Playwright', 'Docker Compose'],
    links: [{ label: 'Try the Bone Atlas beta ›', href: LINKS.atlasBeta }],
    ask: 'Ask Martha about the Atlas',
  },
  ta: {
    color: '#ffd60a', glow: 'rgba(255,214,10,.2)', grad: GRAD.gold,
    logo: asuLogo, org: 'Arizona State University',
    kicker: 'Instructional Aide · CSE 360 · Aug 2026 – now',
    title: 'Instructional Aide, CSE 360',
    subtitle: 'I rebuilt the course system’s architecture and its AI layer, then help students build on top of it.',
    stats: [{ v: 'RAG', l: 'AI layer, end to end' }, { v: 'MVC', l: 'architecture refactor' }, { v: '1:1', l: 'debugging office hours' }],
    bullets: [
      'Refactored the existing codebase into an MVC architecture.',
      'Independently built the AI layer end to end: RAG-based retrieval and LLM generation with Groq and Llama.',
      'Integrated it with Java services and relational and vector databases.',
      'Run office hours with 1:1 debugging across frontend AI, backend AI and the shared central repository.',
    ],
    stack: ['Java', 'RAG', 'Groq', 'Llama', 'MVC', 'Vector DB'],
    links: [],
    ask: 'Ask Martha about teaching',
  },
};

// ── Journey ──
export const CHAPTERS = [
  { key: 'zocdoc', label: '2021–24 · Zocdoc', role: 'Integration Engineering · Senior Integration Support Specialist', org: 'Zocdoc', logo: zocdocLogo,
    kicker: 'Chapter 01 · 2021–2024', color: '#2997ff', glow: 'rgba(41,151,255,.34)', grad: 'linear-gradient(90deg, #2997ff, #5ac8fa)',
    lead: 'Kept healthcare data', accent: 'in sync.',
    line: 'Three years in Integration Engineering: sync logic for 30+ practice-management systems, SQL pipelines over PHI and API tooling that validated 50+ integrations.',
    stats: [{ v: '30+', l: 'PMS sync integrations' }, { v: '99%', l: 'calendar-sync uptime' }, { v: '5h → 30m', l: 'pipeline runtime' }],
    visual: 'awards',
    actions: [{ label: 'Read the story', sheet: 'zocdoc' }] },
  { key: 'wearable', label: '2025 · Wearable research', role: 'Software Engineer (Contract)', org: 'Arizona State University', logo: asuLogo,
    kicker: 'Chapter 02 · Jan – Sep 2025', color: '#ff9f0a', glow: 'rgba(255,159,10,.34)', grad: 'linear-gradient(90deg, #ff9f0a, #ff453a)',
    lead: 'Put a whole pipeline', accent: 'on a wrist.',
    line: 'Led Smart Heat Tracker, an iPhone + Apple Watch app that estimates core body temperature from live heart rate, with every byte of health data kept on the device.',
    stats: [{ v: '±0.2°C', l: 'temperature accuracy' }, { v: '99.9%', l: 'sync reliability' }, { v: '<200 ms', l: 'latency' }],
    visual: 'device',
    actions: [{ label: 'Read the story', sheet: 'wearable' }, { label: 'GitHub ›', href: LINKS.smartheatRepo }] },
  { key: 'clinavis', label: '2026 · Clinavis', role: 'Lead AI & Software Developer', org: 'Clinavis',
    kicker: 'Chapter 03 · 2026', color: '#bf5af2', glow: 'rgba(191,90,242,.34)', grad: 'linear-gradient(90deg, #bf5af2, #ff375f)',
    lead: 'Taught AI', accent: "who's reading.",
    line: 'Clinavis turns dense clinical notes into summaries built for whoever opens them: physician, nurse or patient.',
    stats: [{ v: '99.99%', l: 'role attribution' }, { v: '3', l: 'engineers led' }, { v: '30 min', l: 'refresh cycles' }],
    visual: 'slides', slides: CLINAVIS_SHOTS,
    actions: [{ label: 'Read the story', sheet: 'clinavis' }, { label: 'GitHub ›', href: LINKS.clinavisRepo }] },
  { key: 'atlas', label: 'Now · Elder Abuse Atlas', role: 'Software Developer · NIJ-funded', org: 'Elder Abuse Atlas',
    kicker: 'Chapter 04 · Aug 2026 – now', color: '#30d158', glow: 'rgba(48,209,88,.3)', grad: 'linear-gradient(90deg, #64d2ff, #30d158)',
    lead: 'Shipping with', accent: 'teams of 15+.',
    line: 'An NIJ-funded forensic research platform: Java and TypeScript validation, a 3D skeletal viewer and end-to-end tests, shipped through real PR review.',
    stats: [{ v: '15+', l: 'contributors' }, { v: '3D', l: 'skeletal-model viewer' }, { v: '2', l: 'build flavors under E2E' }],
    visual: 'slides', slides: ATLAS_SHOTS,
    actions: [{ label: 'Read the story', sheet: 'atlas' }, { label: 'Try the beta ›', href: LINKS.atlasBeta }] },
  { key: 'ta', label: 'Now · Instructional Aide', role: 'Instructional Aide, CSE 360', org: 'Arizona State University', logo: asuLogo,
    kicker: 'Chapter 05 · Aug 2026 – now', color: '#ffd60a', glow: 'rgba(255,214,10,.26)', grad: 'linear-gradient(90deg, #ffd60a, #ff9f0a)',
    lead: 'Built the AI layer,', accent: 'then taught it.',
    line: 'Refactored the CSE 360 course system into MVC and built its RAG layer end to end. Now I help students build on top of it.',
    stats: [{ v: 'RAG', l: 'AI layer, end to end' }, { v: 'MVC', l: 'architecture refactor' }, { v: '1:1', l: 'office hours' }],
    visual: 'icon', icon: 'cap', caption: 'Java · Groq · Llama · relational + vector databases',
    actions: [{ label: 'Read the story', sheet: 'ta' }] },
];

export const EDUCATION = [
  { logo: asuLogo, school: 'Arizona State University', place: 'Tempe, Arizona', dates: 'Aug 2024 – Dec 2026',
    degree: 'Master of Science', field: 'Computer Software Engineering', cgpa: '3.85', color: '#ffd60a', grad: GRAD.gold, glow: 'rgba(255,214,10,.22)' },
  { school: 'Pune University', place: 'Pune, Maharashtra', dates: 'Aug 2017 – May 2021',
    degree: 'Bachelor of Engineering', field: 'Electronics and Telecommunications', cgpa: '3.01', color: '#64d2ff', grad: GRAD.sky, glow: 'rgba(100,210,255,.22)' },
];

// ── Martha ──
export const MARTHA = {
  name: 'Martha',
  greeting: "Good day. I'm Martha, Tanmay's slightly overqualified assistant. Ask me anything about his work.",
  suggestions: ['What makes him different?', 'Strongest project?', 'Roles he wants'],
  model: 'openai/gpt-oss-120b',
};

export function buildMarthaPrompt() {
  const chapters = CHAPTERS.map((c) => {
    const s = SHEETS[c.key];
    return `${c.label} — ${c.role}, ${c.org}. ${s.subtitle}\n${s.bullets.map((b) => `  - ${b}`).join('\n')}`;
  }).join('\n');
  const edu = EDUCATION.map((e) => `${e.degree}, ${e.field}, ${e.school} (${e.dates}), CGPA ${e.cgpa}`).join('\n');
  const awards = AWARDS.map((a) => `${a.title}: "${a.quote}"`).join('\n');

  return `You are Martha, Tanmay Shelar's AI assistant on his portfolio site. You are witty, composed and warm, with dry humor, and you help recruiters understand why Tanmay is worth a call.

RULES:
- 2-4 sentences unless a technical question needs more. Reply in plain text only: no markdown, asterisks, headings or bullet symbols.
- Never invent facts. If something isn't below, say so with a light touch and suggest emailing ${LINKS.email}.
- Salary questions: deflect gracefully to a direct conversation.
- Every few replies, nudge toward contact: ${LINKS.email} or ${LINKS.phone}.
- Off-topic: redirect with wit.

POSITIONING: Software built to be trusted. Full-stack, iOS and applied-AI engineer. Healthcare is where he learned the hard version first (privacy, uptime, accuracy), but he is open to any domain, not only healthcare.
AVAILABILITY: Full-time from December 2026 on OPT, eligible for the STEM extension. Looking for software engineering or AI engineering roles.

EXPERIENCE AND PROJECTS:
${chapters}

EDUCATION:
${edu}

RECOGNITION AT ZOCDOC:
${awards}

IN THE NEWS: Featured on ${NEWS.tv.outlet} (${NEWS.tv.date}): "${NEWS.tv.title}". He is part of the research team in the segment. He also writes on Medium; "${NEWS.medium.title}" is about falling seriously ill during grad school and the hospital stay that inspired Clinavis.

LINKS: GitHub ${LINKS.github} · LinkedIn ${LINKS.linkedin} · Email ${LINKS.email}`;
}
