---
title: "I Built My Portfolio with AI. Here’s What Actually Happened."
date: "2024-11-08"
excerpt: "I let GitHub Copilot ride shotgun and shipped a modern, fast portfolio in one evening—here’s what worked, what didn’t, and what surprised me."
author: "Jordan Schnur"
tags: ["AI", "Web Development", "GitHub Copilot", "Developer Experience"]
featured: true
---

# I Built My Portfolio with AI. Here’s What Actually Happened.

I’ve pushed hard on AI at Wolfe LLC, but I wanted a clean test at home: could I ship my entire portfolio with AI as my pair? Not a toy page—something I’d actually be proud to share.

Short version: I shipped a modern, SEO-friendly, accessible site in hours, not weeks. Longer version: below.

## What I Wanted (a.k.a. “Not another static resume”)

I’m picky. I wanted:

- A **modern look** (dark mode, tasteful motion, nothing gaudy)
- A **markdown blog** with front matter
- **Client-side routing** (SPA feel, fast nav)
- **Real SEO** for “Jordan Schnur Pittsburgh”
- **Good a11y** (WCAG AA baseline)
- **Production-ready** deploys

## How I Started

I kicked off with **Vite + Bootstrap 5**. It’s quick, light, and gets out of the way. Copilot helped scaffold:

- Responsive nav
- Hero with my photo + type effect
- About / Projects / Experience / Education
- Simple contact links

This took ~30 minutes. The nice part wasn’t speed alone—it was the defaults. Copilot consistently suggested sensible patterns without me spelling everything out.

## Turning the Design Up a Notch

I asked, “Make it feel modern—polished, not flashy.” Copilot obliged:

- Subtle hover lifts on cards
- Scroll-triggered fades/slides
- A lightweight particle background with connecting nodes
- Clean underline animations for section headers
- **Dark mode** with system detection, a manual toggle, and smooth transitions

Nothing felt gimmicky. It had that “someone sweat the details” vibe—without me manually tweaking keyframes for hours.

## The Blog: Where I Pushed It

Requirements:

- Markdown posts with front matter
- SPA-style routes (`/blog/:slug`)
- Syntax highlighting
- Reading time
- Tags + featured posts
- Auto-generated sitemap

We built:

- A tiny router with pattern matching
- A Markdown pipeline with highlighting
- Front matter parsing (with **`front-matter`**, not `gray-matter`—the latter threw Buffer errors in the browser)
- Reading-time calc and tag filters
- A sitemap that regenerates on build using the post registry

Hiccup → fix → move on. No drama.

## SEO That’s Actually Useful

I care about being discoverable locally, so we added:

- Tight meta tags with local keywords
- **JSON-LD Person schema**
- Open Graph + Twitter cards
- Canonical URLs
- Geographic meta
- Semantic HTML + consistent alt text
- Auto-updated sitemap including all posts

The sitemap update step is zero-maintenance—drop a new post in, it’s there.

## The Mobile Navbar Saga (Because of course)

The hamburger was half off-screen, washed out in dark mode, and the open state felt clumsy. We tried:

1. Pure CSS tweaks (nope)
2. Flexbox adjustments (close)
3. Overflow controls (helped, not enough)
4. **Winner:** add a _“Close Menu”_ button at the bottom and tighten hit targets/colors

This is where AI pairing shines—no ego, no fatigue, just fast iteration until it feels right.

## What Surprised Me

### AI is a relentless senior dev (with no coffee breaks)

- Suggests best practices by default
- Rapidly explores options
- Catches gotchas early
- Offers modern approaches I might skip when I’m tired

### But you still have to drive

My job was: set the direction, pick the tradeoffs, review the output, and decide what “good” looks like. AI gave me speed; I supplied taste.

### Iteration is the unlock

The loop was minute-scale, not hour-scale:

1. Try
2. Test
3. Nudge
4. Repeat

That pace stacks up fast.

## The Numbers

**Time spent:**

- Structure: ~30 min
- Design + motion polish: ~1 hr
- Blog + routing: ~2 hrs
- SEO pass: ~30 min
- Mobile fixes: ~1 hr
- **Total:** ~5 hours

**Traditional estimate:** 2–3 weeks of evenings/weekends  
**Gain:** ~20–30× faster

**Bundle (gzipped):**

- HTML: **7 KB**
- CSS: **34 KB**
- JS: **54 KB**
- **Total:** ~**66 KB** (lean and snappy)

## What Shipped

- ✅ Modern responsive UI
- ✅ Dark/light with system detection + toggle
- ✅ Purposeful animations (no carnival rides)
- ✅ Particle background
- ✅ Markdown blog with front matter
- ✅ Client-side routing
- ✅ Auto-generated sitemap
- ✅ Solid SEO (meta + JSON-LD + OG/Twitter)
- ✅ A11y pass to AA targets
- ✅ GitHub Actions deploy
- ✅ Two starter posts
- ✅ Mobile nav that doesn’t fight you

## Why Teams Should Care

At Wolfe, our Copilot rollout cut PR cycle time ~30% across 50+ devs. This project reminded me why:

- **Speed:** ship in days, not sprints
- **Quality:** best practices show up by default
- **Learning:** constant exposure to new patterns
- **Iteration:** more experiments, less burnout
- **Focus:** humans decide; AI assembles

## So… Is This the Future?

Pretty much. Not AI _replacing_ devs—AI **amplifying** devs. I spent less time typing and more time designing the system I wanted. Architect first, typist second. That’s a good trade.

## Poke Around

Code's here: <a href="https://github.com/jordan-schnur/jordan-schnur.github.io" target="_blank" rel="noopener noreferrer">github.com/jordantschnur/jordan-schnur.github.io</a>

- Check the blog pipeline
- Peek at the router
- Look at the sitemap step
- Borrow the SEO setup if it helps

## Final Thought

Did AI write most of this site? Yeah. Did it make me lazier? No—it made me more deliberate. I still chose the direction, the tradeoffs, and the feel. AI just removed the friction between idea and result.

If you want to talk AI pairing, scalable systems, or modern web stacks, I'm around on <a href="https://linkedin.com/in/jordan-schnur" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
