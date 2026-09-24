# SatQuery AI — Smart Education Platform
### SIH 2026 · PS-26207 · Team IdeaIgniters · Theme: Smart Education

This README doubles as the **master build prompt** for Google Antigravity (or any agentic IDE). Paste the section **"🚀 AGENT BUILD PROMPT"** directly into a new Antigravity task/mission to generate the full application from scratch.

---

## 1. Project Context (from the SIH submission)

**Problem:** Traditional education isn't personalized, engaging, or accessible enough for children in the digital age.

**Solution — SatQuery AI:** An AI-powered smart-learning web platform that gives children personalized, gamified, multilingual, and trackable education.

**Core Innovation:** AI-Powered Personalization + Game-Based Learning + Multilingual Voice Support + Real-Time Progress Intelligence.

**Pillars from the deck:**
| Pillar | What it means for the product |
|---|---|
| Personalized Learning | Lessons/quizzes adapt to each child's level & performance |
| Gamified Education | Points, badges, levels, stories, streaks, challenges |
| Multilingual Voice Learning | Regional-language UI + audio/voice explanations |
| Progress Tracking | Dashboards for students, parents & teachers |
| Child Safety & Privacy | Privacy-first data handling, parental consent |
| Curriculum Alignment | Content mapped to NCERT / DIKSHA |

**Feasibility strategy:** proven web + AI stack, cloud-ready modular architecture, open-source & incremental build.

---

## 2. Design Direction (mandatory for the agent)

- **Theme:** Light theme ONLY (no dark mode toggle needed for v1) — soft off-white / cream background (`#FAFAF7`–`#F5F7FA`), never stark `#FFFFFF` walls.
- **Palette:** Natural, calm, "edu-tech" feel — sage green, soft sky blue, warm coral/amber accents, muted lavender for gamification badges. Avoid neon/saturated colors.
- **Typography:** Rounded, friendly display font for headings (e.g. `Poppins` / `Baloo 2` / `Fredoka`) + clean readable body font (`Inter` / `Nunito Sans`).
- **Motion:** Every section should feel *alive but calm* — scroll-reveal fades, staggered card entrances, hover-lift on cards/buttons, animated counters for stats, a subtle floating/parallax hero illustration, smooth page transitions. Avoid jarring or excessive motion (accessibility: respect `prefers-reduced-motion`).
- **Look & feel references:** Duolingo (playful gamification) × Notion/Linear (clean, professional structure) × Headspace (soft, natural light colors).
- **Eye-catching but professional** — this is a hackathon judge-facing product, so polish > gimmicks.

---

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion (UI) + GSAP (scroll/hero) |
| 3D / Illustration | React Three Fiber + drei (optional hero visual) |
| State | Zustand or React Context |
| Charts (progress) | Recharts |
| Backend | Node.js + Express (or FastAPI if Python preferred for AI logic) |
| Database | MongoDB (flexible schema for learning profiles) or PostgreSQL |
| AI / Personalization | OpenAI/Gemini API for tutoring + rule-based adaptive engine for difficulty scaling |
| Voice | Web Speech API (browser TTS/STT) for multilingual voice support |
| Auth | Firebase Auth or JWT-based auth (Student / Parent / Teacher roles) |
| Deployment | Vercel (frontend) + Render/Railway (backend) |

---

## 4. Recommended Folder Structure

```
satquery-ai/
├── client/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, Cards, Badge, ProgressRing...
│   │   ├── sections/          # Hero, Features, HowItWorks, Impact, CTA
│   │   ├── pages/             # Landing, Dashboard, Lesson, Quiz, Login
│   │   ├── animations/        # Framer Motion variants, GSAP timelines
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── assets/
│   │   └── styles/
│   └── index.html
├── server/
│   ├── routes/                # auth, lessons, progress, ai-tutor
│   ├── controllers/
│   ├── models/                # Student, Progress, Lesson, Badge
│   ├── services/               # adaptiveEngine.js, aiTutor.js, voiceService.js
│   └── server.js
├── .env.example
└── README.md
```

---

## 5. Feature List → Screens Mapping

1. **Landing Page** — animated hero (illustration/3D), problem statement, "How SatQuery AI Works" scroll section, feature grid (4 pillars from deck), impact stats counter, CTA.
2. **Auth** — Student / Parent / Teacher role-based login & signup.
3. **Student Dashboard** — personalized lesson recommendations, streak/XP bar, badges shelf, "continue learning" card.
4. **Adaptive Lesson/Quiz Engine** — difficulty adjusts based on live performance; instant feedback; points & badges on completion.
5. **Multilingual Voice Mode** — language switcher + text-to-speech narration + speech-to-text answer input.
6. **Progress & Analytics** — charts for mastery per subject, attempts, time spent; separate views for Parent/Teacher.
7. **Gamification Layer** — badges, levels, leaderboard (optional), story-based lesson themes.
8. **Privacy/Consent screen** — parental consent flow, data usage transparency.

---

## 6. 🚀 AGENT BUILD PROMPT
*(Copy everything in the box below into Antigravity as a single mission/task)*

```
You are building "SatQuery AI" — a full-stack, AI-powered smart-education
web app for children (from an SIH 2026 hackathon submission, PS-26207,
Theme: Smart Education).

GOAL: Build the complete application end-to-end — landing page, auth,
student dashboard, adaptive lesson/quiz flow, multilingual voice mode,
progress analytics, and a gamification layer — as a working, deployable
project.

STACK: React + Vite + TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
+ GSAP for animation, React Three Fiber for an optional 3D hero visual,
Recharts for analytics, Node.js + Express backend, MongoDB, JWT auth,
Web Speech API for voice.

DESIGN REQUIREMENTS (non-negotiable):
- Light theme only. Soft off-white background, calm natural palette
  (sage green, sky blue, warm amber accent, soft lavender for badges).
  No neon colors, no pure-white flat backgrounds.
- Rounded friendly heading font (Poppins/Fredoka) + clean body font
  (Inter/Nunito Sans).
- Every section must have tasteful motion: scroll-reveal, staggered
  card entrances, hover-lift on interactive elements, animated number
  counters for stats, subtle floating hero illustration/3D element,
  smooth route transitions. Respect prefers-reduced-motion.
- Overall aesthetic: professional edu-tech, like Duolingo's warmth
  crossed with Linear/Notion's clean structure — eye-catching but not
  childish or cluttered.
- Fully responsive (mobile-first), accessible (WCAG AA contrast,
  keyboard navigable, alt text).

CORE FEATURES TO IMPLEMENT (in this order):
1. Landing page: hero with animated headline + illustration, 4-pillar
   feature grid (Personalized Learning, Gamified Education,
   Multilingual Voice Learning, Progress Tracking), "How it works"
   scroll-animated timeline, animated impact stats, footer.
2. Auth pages (Student / Parent / Teacher roles) with form validation
   and smooth transitions.
3. Student dashboard: XP bar, streak counter, recommended lessons
   carousel, badges shelf.
4. Adaptive quiz engine: a simple rule-based adaptive-difficulty
   algorithm (raise/lower difficulty based on rolling accuracy),
   instant animated feedback, points/badge awarding on completion.
5. Multilingual voice mode: language selector + browser
   text-to-speech narration of lesson content + speech-to-text
   answer capture.
6. Progress/analytics page with charts (per-subject mastery, time
   spent, attempts) — separate simplified views for Parent and
   Teacher roles.
7. Gamification: badge system, levels, optional leaderboard.
8. Parental consent / privacy screen on first student signup.

BACKEND:
- REST API with routes for auth, lessons, quizzes, progress, badges.
- MongoDB schemas: User (role: student/parent/teacher), Lesson,
  QuizAttempt, Progress, Badge.
- A small "adaptiveEngine" service that recalculates a student's
  difficulty level after each quiz attempt.

DELIVERABLES:
- Fully working client/ and server/ folders as per the structure in
  this README.
- Seed data / mock lessons so the app is demo-able immediately.
- A .env.example listing required keys.
- Clean component-level code comments.

Build this iteratively: scaffold project → build design system/theme
tokens (colors, fonts, spacing in tailwind.config) → build landing
page with animations → build auth → build dashboard → build adaptive
quiz engine → build voice mode → build analytics → build gamification
→ wire backend → connect frontend to backend → polish animations and
responsiveness → final review against the design requirements above.
```

---

## 7. Which Antigravity Model to Use

Open the **model selector** (bottom of the prompt box) in Antigravity and pick per phase:

| Phase | Recommended model | Why |
|---|---|---|
| Architecture & full scaffolding (this whole prompt, first pass) | **Gemini 3 Pro / 3.1 Pro (High reasoning)** | Largest stable context window (handles the whole repo + this long spec in one pass); Google's default agentic workhorse for planning + multi-file generation. |
| Tricky adaptive-engine logic / backend data modeling | **Claude Opus (Thinking mode)**, if available on your plan | Strongest step-by-step reasoning for algorithmic/backend logic. |
| Fast iteration once scaffold exists (styling tweaks, copy edits, small components) | **Gemini Flash tier** (fastest/cheapest model in the lineup) | Cheap, quick turnaround for small, low-risk edits. |
| Design polish pass on animations/UI | **Claude Sonnet (Thinking mode)**, if available | Good balance of taste + code quality for CSS/animation refinement. |

> ⚠️ Model names/tiers in Antigravity's selector change frequently as Google and its partners ship updates. Open Antigravity's model dropdown (or its official docs at `antigravity.google/docs/models`) before you start and pick the **highest-reasoning Gemini Pro-tier model** for the first full-scaffold run — that's the important, stable rule even if exact version numbers shift.

---

## 8. GitHub Repos to Import Front-End Elements From

**Animated UI components / text effects**
- `magicuidesign/magicui` — ready-made animated React components (marquees, animated text, borders, particles).
- `davidhdev/react-bits` — collection of animated text & background effects for React.
- `birobirobiro/awesome-shadcn-ui` — curated list of shadcn-based animated component libraries.

**Motion / scroll animation engines**
- `framer/motion` (Framer Motion) — core animation library for React (hover, layout, scroll-reveal).
- `greensock/GSAP` — for the hero scroll-timeline and more complex sequenced animations.
- `tsparticles/tsparticles` — soft floating particle backgrounds (great for a calm "learning" hero).

**3D models / visuals**
- `pmndrs/react-three-fiber` — React renderer for Three.js, for an interactive 3D hero (e.g., a floating book/globe/robot mascot).
- `pmndrs/drei` — helper components (loaders, controls, environment) for react-three-fiber.
- `google/model-viewer` — simplest way to drop a `.glb`/`.gltf` 3D model into the page if you don't need full R3F control.
- `mrdoob/three.js` — underlying 3D engine, useful if you need lower-level control.
- Free 3D assets: sourced separately from **Sketchfab (CC-licensed)** or **Poly Pizza** — not GitHub repos, but the standard free sources to pair with `model-viewer`/R3F.

**Forms & inputs**
- `react-hook-form/react-hook-form` — form state/validation for auth & quiz forms.
- `colinhacks/zod` — schema validation, pairs with react-hook-form.
- `shadcn-ui/ui` — accessible, themeable form components (inputs, selects, dialogs) to skin in the light palette above.

**Icons**
- `lucide-icons/lucide` — clean, consistent icon set matching the shadcn/ui aesthetic.

---

## 9. Build Milestones (suggested order for demo-readiness)

1. ✅ Project scaffold + design tokens (colors/fonts in `tailwind.config`)
2. ✅ Landing page with animations (this alone is demo-able for judges)
3. ✅ Auth + role-based routing
4. ✅ Student dashboard (static data first)
5. ✅ Adaptive quiz engine (mock questions)
6. ✅ Voice mode (browser Web Speech API)
7. ✅ Progress analytics (Recharts, mock data)
8. ✅ Connect to real backend/DB
9. ✅ Final animation/responsiveness polish pass

---

*Prepared for Team IdeaIgniters — SatQuery AI — SIH 2026 (PS-26207).*
