# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server with HMR
- `npm run build`: production build into `dist/` (gitignored)
- `npm run preview`: serve the built `dist/`
- `npm run lint`: ESLint (flat config in `eslint.config.js`; react-hooks v7 rules, which include React Compiler purity checks such as no reassigning variables during render, and `no-unused-vars` ignores names matching `^[A-Z_]`; `dist` and `.venv` are ignored)

There is no test suite and no TypeScript. The `.venv/` directory is not used by the site.

## Architecture

This is a single-page portfolio built with Vite and React 19 (plain JSX) in an Apple "Dark Pro" style: black background, glowing gradients, large type. The page is a story: Hero → Proof (bento of stats) → How I work → Code reveal ("Code that ships.") → Journey (5 chapters) → Education → In the news → Contact. Clicking a tile or "Read the story" opens a story sheet with the details.

- **`src/content.js` is the single source of truth** for copy, stats, links, images, story sheets (`SHEETS`), Journey chapters (`CHAPTERS`), Zocdoc `AWARDS`, `EDUCATION`, `NEWS` and the chatbot. `buildMarthaPrompt()` builds the chatbot's system prompt from the same data, so the bot can't contradict the page. Copy changes belong here, not in components. Facts must come from the resume or the user: never invent stats.
- **`src/App.jsx`** composes the sections and owns the shared UI state: which story sheet is open (`sheetKey`, a key of `SHEETS`) and whether Martha's chat is open. Sections receive `onOpen(sheetKey)`.
- **`src/sections/`**: `Hero`, `Proof` (also exports `HowIWork`), `Journey`, `Closing` (`Education`, `News`, `Contact`) and `Layout` (`Nav`, `Footer`).
- **`src/components/`**:
  - `Motion.jsx`: `Odometer`, where each digit rolls through 0–9 and is driven by an `active` flag, and `TypeHeading`, which types its parts out once in view.
  - `Visuals.jsx`: `Slideshow`, `DeviceStage` (iPhone + Watch), `AwardsStage` and `IconStage`.
  - `StorySheet.jsx`: a native `<dialog>` with `showModal()`.
  - `Martha.jsx`: the chatbot.
  - `icons.jsx`: inline SVGs and brand logos.
- **`src/hooks.js`**:
  - `useInView`: `once` keeps it true; otherwise it flips back so odometers replay on re-entry.
  - `useReducedMotion`.
  - `useTick`: a slideshow timer, paused under reduced motion.
  - `useMouseVars`: writes the pointer position to the CSS vars `--mx` and `--my` on `<html>`. Elements with class `.follow` and `--fx`/`--fy` drift toward the cursor in pure CSS, with no React re-renders. Martha's eyes use the same vars.
- **Styling** lives in `src/styles/global.css`: tokens on `:root`, component classes, a breakpoint at 1000px (tablet) and one at 600px (phone, single-column bento). Inline styles are used for per-item data such as gradients and glow colors.
- **Scroll choreography**:
  - Reveal: `useRevealOnScroll` in `App` reveals every `[data-reveal]` element on first entry, using the `reveal-up` keyframes with `fill-mode: backwards`, so elements' own hover transitions still work afterwards. The `--d` CSS var staggers elements, and `--ry` sets the rise distance.
  - Overlap and depth: `.hero-depth` (the hero recedes while `.overlap`/Proof slides over it) and `.depth` (finished sections recede) are CSS scroll-driven animations inside `@supports (animation-timeline: view())`.
  - `CodeReveal`: a 340vh section with a sticky stage. JS writes the scroll progress to `--p`, and CSS derives every phase from it. The live code shows only inside the letters through a black mask with white text and `mix-blend-mode: multiply`.
  - All of it is disabled under reduced motion.
- **Gotcha:** for gradient text, set `backgroundImage`, never the `background` shorthand. The shorthand resets `background-clip: text`, and numbers render as solid color blocks. `background-clip: text` also doesn't reach into transformed children, which is why each odometer strip clips its own gradient.
- **Assets**: everything is under `src/assets/`, already optimized, and imported in `content.js`. Logos (`logos/asu.png`, `logos/zocdoc.png`) are official, recolored for dark backgrounds. The Smart Heat Tracker images and architecture diagram come from the SmartHeat-Tracker repo README. The Clinavis architecture diagram comes from that repo's `docs/architecture.svg`.

## Chatbot ("Martha", Groq free tier)

- `Martha.jsx` calls the Groq OpenAI-compatible API directly from the browser with `VITE_GROQ_API_KEY`. Because of the `VITE_` prefix, the key is inlined into the client bundle and visible to anyone. A planned follow-up is to move the call behind a Vercel serverless function (`api/chat.js`, using `GROQ_API_KEY`) and rotate the key afterwards.
- The model is `openai/gpt-oss-120b` with `reasoning_effort: "low"`; the fallback model is `qwen/qwen3.8-27b`. The user chose Groq's free tier: no card, but limited to roughly 30 requests/min, 8K tokens/min and 200K tokens/day. A 429 shows a polite "give me a moment" reply.
- Groq retired `llama-3.3-70b-versatile` in 2026. If Martha only returns the "momentary lapse" fallback, first check that the model still exists: `GET https://api.groq.com/openai/v1/models` with the key.
- `gpt-oss` reasoning tokens count toward `max_tokens`. The prompt requires plain-text replies, because the chat bubble renders raw text and the model otherwise emits `**bold**`.
- Meta's Muse Spark (Meta Model API, OpenAI-compatible) was considered but is paid-only, so it was not chosen.

## Contact form (Web3Forms)

- `Contact` in `sections/Closing.jsx` POSTs to Web3Forms using `FORM.accessKey` from `content.js`, and Web3Forms delivers to the user's inbox. The visitor's email becomes the reply-to. The access key is public by design. A hidden `botcheck` checkbox acts as a honeypot.
- The free plan **rejects server-side requests** (curl or Node return 403, "Use our API in client side"). It also rejects headless Chrome's default `HeadlessChrome` user agent. To test, submit from a browser page, or from headless Chrome with a normal `--user-agent`. Every successful test sends a real email to the user, so keep tests rare and label them `[TEST]`.

## Deployment

- The site is hosted on Vercel (tanmayshelar.vercel.app) through its GitHub integration with `origin` = `github.com/1110tanmay/Portfolio-website`. There is no Vercel CLI or `vercel.json`, so deploying means pushing to GitHub. Vercel serves `main` about 30 seconds after a push.
- Work happens on `upgrade`. To deploy without switching branches: `git push origin upgrade && git push origin upgrade:main`, which fast-forwards `main`. The user prefers small commits that go straight to the live site.
- The Vercel project has its own `VITE_GROQ_API_KEY`, which differs from the local `.env` key; both are valid. It is inlined at build time.
- Git auth uses the macOS Keychain HTTPS credential, and there are no SSH keys. If a push fails with "Invalid username or token" or "could not read Username", the user has to sign in again from their own terminal (a personal access token as the password) or through VS Code's Sync. Claude cannot do that non-interactively.
- Verifying layout: headless Chrome won't render windows narrower than about 500px. To check phone width, load the site inside a 390px `<iframe>` and screenshot that.
