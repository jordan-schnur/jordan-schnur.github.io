# Design: budget-pm article + GitHub URL fix

Date: 2026-06-08
Author: Jordan Schnur (with Claude Code)

Two pieces of work bundled in one pass: a small correctness fix to a wrong
GitHub URL, and a new blog post about `~/dev/budget-pm` with real screenshots.

## Part 1 — GitHub URL fix

The site links to `github.com/jordantschnur`, which is wrong. The correct
handle is `jordan-schnur` (https://github.com/jordan-schnur).

Changes:

- `index.html:69` — JSON-LD `sameAs` array entry → `https://github.com/jordan-schnur`.
- `index.html:555` — footer "GitHub" button `href` → `https://github.com/jordan-schnur`.
- `public/blogs/building-portfolio-with-ai.md:172` — the link `href` is already
  correct (`jordan-schnur`), but the visible anchor text still reads
  `github.com/jordantschnur/...`. Fix the display text to match the href.

No other behavior changes.

## Part 2 — The article

### Subject

`~/dev/budget-pm` ("budget-pm") — a local agent command center for the
`jordan-schnur/local-budgeting` (Reckon) project. It turns the
`github-workflow` label scheme into a dark, live dashboard showing a fleet of
Claude Code agents alongside GitHub issues, epics, and PR status. Built with
Next.js 15 App Router + SQLite overlay (`better-sqlite3`) + Octokit.

### Angle and voice

- **Angle:** "Why I built a PM for my agents." Problem-first — orchestrating a
  fleet of parallel Claude Code agents on the budgeting app got hard to *see*
  and *steer*, so I built a command center. Then: how it started, how it
  evolved, lessons, what I gained.
- **Length:** ~1500-2000 words. Matches the existing post
  (`building-portfolio-with-ai.md`) in scale and rhythm — skimmable sections,
  first-person, punchy, light hedging.
- **Voice:** breezy first-person, consistent with the existing blog post (not a
  dry technical whitepaper).
- **Honesty about AI:** budget-pm was itself built with Claude Code (its
  `docs/superpowers/specs` and `plans` dirs are evidence). The post is candid
  about that — it fits the "managing agents" theme rather than implying solo
  hand-coding.

### Section outline (draft, may flex during writing)

1. Hook — the chaos of N agents working in parallel with no shared view.
2. What I actually wanted — one screen: who's working, on what, who's stuck.
3. How it started — the GitHub issue-manager (the real origin in git history).
4. The pivot to a command center — four views: Command Center / Board / Epics /
   Agents.
5. Making agents legible — heartbeats, Claude Code hooks, "Needs you" blocked
   rows, transcript-as-truth state derivation.
6. Steering from the UI — assign work, launch iTerm sessions, resolve-and-unblock.
7. Lessons learned — legibility over control; let the transcript be the source
   of truth; idle/stale liveness; the cost of a too-clever ranking queue (later
   retired); etc.
8. What I gained.
9. Close + repo link (`github.com/jordan-schnur`).

Section list is a guide, not a contract — the human-verification pass (Part 3)
may reshape headings and cadence.

### Source material

- `~/dev/budget-pm/README.md` — views, agents, architecture, API endpoints.
- `~/dev/budget-pm` git history (121 commits, 2026-05-31 → 2026-06-07) — the
  evolution arc: issue manager → command center → agent liveness → assign/launch
  → state legibility → iTerm tab retitle.
- `~/dev/budget-pm/docs/superpowers/specs` and `plans` — dated design docs that
  mark each phase.

### Screenshots

Real captures from the **already-running** dev server on `http://localhost:7777`
(live data: ~54 agents, 30 activity rows in `overlay.db`).

- Capture the four views (Command Center, Board, Epics, Agents) plus the issue
  slide-over. Embed the ~4-5 cleanest.
- Tool: Chrome DevTools MCP against the running server (no setup needed).
- Storage: `public/blogs/budget-pm/*.png`.
- Reference: absolute site-root paths in markdown
  (e.g. `![Command Center](/blogs/budget-pm/command-center.png)`) so images
  render regardless of the SPA route.
- Each image gets descriptive alt text and a caption.

### Wiring

- New file: `public/blogs/building-a-pm-for-ai-agents.md` with frontmatter:
  `title`, `date: "2026-06-08"`, `excerpt`, `author: "Jordan Schnur"`,
  `tags` (e.g. AI, Agents, Claude Code, Developer Experience, Next.js),
  `featured: true`.
- Register slug `building-a-pm-for-ai-agents` in `src/blog/posts.js`.
- Sitemap regenerates on `pnpm build` via `generate-sitemap.js` — no manual edit.

## Part 3 — Human-verification subagent (explicit requirement)

After the draft and screenshots are in place, dispatch a subagent to read the
post cold and flag anything that reads as AI-generated:

- Em-dash overuse and uniform sentence cadence.
- Hedge words ("perhaps", "arguably", excessive "I think").
- Listicle bloat / every section being a bulleted list.
- Tell-phrases: "in conclusion", "delve", "robust", "seamless", "in today's
  world", "it's worth noting".
- Fake-balanced tics: "not just X, but Y"; "X isn't just Y — it's Z".
- Overly tidy parallelism and section symmetry.

Then revise the prose to address each flagged item, and report what changed.
Facts and screenshots stay; only the writing gets de-tells'd. Re-run only if the
revision introduces new tells.

## Out of scope

- No redesign of the blog system or rendering pipeline.
- No new screenshots of the Reckon app itself (the article is about budget-pm).
- No changes to budget-pm's code (read-only source for the article).

## Acceptance criteria

- GitHub URL is correct in all three locations.
- New post renders at `/blog/building-a-pm-for-ai-agents` with working images.
- Post is ~1500-2000 words, first-person, matches existing voice.
- Screenshots are real captures from the live instance, stored under
  `public/blogs/budget-pm/`, referenced by absolute path, with alt + captions.
- Human-verification subagent has run and its flagged tells have been addressed.
