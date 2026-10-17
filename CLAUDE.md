# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server with HMR
- `npm run build`: production build into `dist/` (gitignored)
- `npm run preview`: serve the built `dist/`
- `npm run lint`: ESLint (flat config in `eslint.config.js`; react-hooks + react-refresh rules, and `no-unused-vars` ignores names matching `^[A-Z_]`)

There is no test suite and no TypeScript. The `.venv/` directory is not used by the site.

## Architecture

This is a single-page personal portfolio built with Vite and React 19 (plain JSX). `main.jsx` → `App.jsx` → `PersonalSite.jsx`, and almost all of the site lives in `src/PersonalSite.jsx`:

- **Styling** is one big template string, `styles`, rendered through `<style>{styles}</style>` in the root component. Every class uses the `ps-` prefix (`chat-` for the chatbot). Design tokens (colors, fonts, the `--spectrum-*` accent palette, `--radius-pill`) are CSS variables on `:root` inside that string, and Google Fonts (Montserrat, Inter, DM Mono) are loaded with an `@import` there too. The responsive breakpoint is a single `@media (max-width: 900px)` block at the end. `src/index.css` is still the Vite template stylesheet and is imported globally; the embedded styles override it. `src/App.css` and `src/assets/hero-bg.mp4` are not imported anywhere.
- **Content** comes from data constants near the top of the file (`SKILLS`, `EXPERIENCE`, `EDUCATION`, `PROJECTS`, `CURRENT_WORK`, `CONTACTS`, `SUGGESTIONS`). Section components (`Hero`, `About`, `CurrentWork`, `Experience`, `Education`, `Projects`, `Contact`) render these constants. Copy changes usually belong in the constants, not the JSX. Some copy is still hardcoded in the JSX, though, such as the hero paragraph, the About paragraphs, and the stats row.
- **Section headings** use `<Typewriter segments={[...]} />`. Segments can be strings, which are typed out character by character, or React nodes such as `<br />` or `<em>`, which appear once typing reaches them. Typing starts when the heading scrolls into view.
- **Scroll reveal**: `useReveal()` in the root component returns a callback ref that is passed to each section as `revealRef`. Any element with class `ps-reveal` and `ref={revealRef}` gets the `visible` class from a shared IntersectionObserver.
- **Custom cursor**: `body` sets `cursor: none`, and the `Cursor` component draws the pointer, which expands over any `a` or `button`. New interactive elements should also set `cursor: none` to match.
- **Hero background** is a `react-icon-cloud` `<Cloud>` (`SkillsCloud`) that shows `SKILLS` plus a local `extraSkills` list as a rotating tag cloud.
- **Chatbot ("Tamy")** calls the Groq OpenAI-compatible API directly from the browser. The key comes from `VITE_GROQ_API_KEY` in `.env` (gitignored). Because of the `VITE_` prefix, the key is bundled into the client JS. The bot's persona and all of its facts about Tanmay are in the `SYSTEM_PROMPT` string.

## Chatbot model (Groq free tier)

- The model is `openai/gpt-oss-120b` with `reasoning_effort: "low"`. The user chose Groq's free tier: no card, but limited to roughly 30 requests/min, 8K tokens/min and 200K tokens/day.
- Groq retired `llama-3.3-70b-versatile` in 2026. Requests for it return `404 model_not_found`, and the UI hides the error behind its generic fallback reply ("momentary lapse"). If the bot shows that fallback, first check that the model still exists: `GET https://api.groq.com/openai/v1/models` with the key.
- `gpt-oss` spends tokens on reasoning, which count toward `max_tokens` (300). Low reasoning effort keeps replies from being cut off or coming back empty.
- The chat bubble renders raw text, so the prompt requires plain-text replies. Without that rule, the model emits `**bold**`.
- Fallback model: `qwen/qwen3.8-27b`.
- Meta's Muse Spark (Meta Model API, OpenAI-compatible) was considered but is paid-only, so it was not chosen.

## Deployment

- The site is hosted on Vercel (tanmayshelar.vercel.app) through its GitHub integration with `origin` = `github.com/1110tanmay/Portfolio-website`. There is no Vercel CLI or `vercel.json`, so deploying means pushing to GitHub.
- Work happens on the `upgrade` branch. Releases go to `main`. To deploy without switching branches: `git push origin upgrade && git push origin upgrade:main`. The second push fast-forwards `main` to `upgrade`.
- `VITE_GROQ_API_KEY` must also be set in the Vercel project's environment variables, because it is inlined at build time.
- Git auth uses the macOS Keychain HTTPS credential, and there are no SSH keys. If a push fails with "Invalid username or token", the user has to sign in to GitHub again (in VS Code or with a personal access token). Claude cannot do that non-interactively.

## Keeping content in sync

Facts about Tanmay are duplicated between `SYSTEM_PROMPT` and the rendered data constants and hardcoded copy, such as dates, GPA, availability, and contact details. When you change one, update the other so the chatbot doesn't contradict the page.
