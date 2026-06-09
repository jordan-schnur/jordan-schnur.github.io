---
title: "I Gave My AI Agents a Manager. Here's What I Learned."
date: "2026-06-08"
excerpt: "Running six Claude Code agents in parallel got out of hand fast. So I built budget-pm, a dark, live command center that shows the whole fleet, who's stuck, and lets me steer them without leaving the browser."
author: "Jordan Schnur"
tags: ["AI", "Agents", "Claude Code", "Developer Experience", "Next.js"]
featured: true
---

# I Gave My AI Agents a Manager. Here's What I Learned.

A few weeks ago I started building a YNAB-style budgeting app called Reckon, and I decided to do something a little reckless: instead of writing it myself, I'd point a fleet of Claude Code agents at the backlog and play air traffic control.

It worked better than I expected. It also got away from me fast. By the second day I had six terminal tabs open, each one a different agent on a different issue, and no clear idea which was working, which had finished without telling me, and which was parked on a permission prompt waiting for me to say "yes, go ahead." I was alt-tabbing through iTerm like a maniac trying to remember who was doing what.

So I stopped and built the thing I actually needed: a manager for the agents. It's called **budget-pm**. This post is how it started, how it changed, and what I got out of running it.

## The problem: agents are invisible

A single coding agent is easy to babysit. You watch the one terminal, you answer its questions, you review its PR. Fine.

Six agents is a different animal. The bottleneck stops being *can the agents do the work* and becomes *can I keep up with them*. They finish things while I'm looking elsewhere. They get blocked and sit there. Two of them grab adjacent issues and I don't notice until there's a merge conflict. The work was getting done; I just couldn't *see* any of it.

What I wanted was boring and specific: one screen that answers three questions at a glance.

- Who's working, and on what?
- Who's stuck and needs me?
- What's left to hand out?

That's it. Not a dashboard with forty charts on it, just a control room.

You might be thinking none of this needs a web app, and for two or three agents you'd be right. A tmux session and a couple of `gh` aliases get you most of the way. It fell apart for me at six, because a wall of terminal panes can't answer the one question I actually cared about: which agent needs me right now. Sorting the blocked ones to the front of a grid is a different tool than six tabs tiled on a screen.

## How it started: a glorified issue list

The first version wasn't a command center at all. It was a local GitHub issue manager, a Next.js app that read my repo's issues and epics through the GitHub API and let me rank them into a work queue. I was leaning on a label scheme (`status/ready`, `status/blocked`, `epic/N`, priorities) to drive the agent workflow, and I wanted a nicer way to see and order that backlog than GitHub's own UI.

It had a ranked drag-and-drop queue, an epics view with progress bars, a quick-add modal. It was useful. But it was about the *work*, not the *workers*. It told me what needed doing and said nothing about the agents actually doing it.

That gap is where the whole project turned.

## The pivot: from backlog to fleet

The real version started when I asked a different question. Not "what should get worked on next," but "what is each agent doing *right now*." Once I framed it that way, the ranked queue felt beside the point. I retired it and rebuilt the app around a live command center.

![The budget-pm Command Center: a grid of agent cards showing who's working, who's waiting, and a "Needs You" column, with epics in flight below.](/blogs/budget-pm/command-center.png)

This is the home screen. Every card is an agent. A green dot means working, amber means it needs me, grey means idle and free to pick up the next thing. Each card shows its current issue, the epic it belongs to, the last line it said, and a link to its open PR with CI status. The "Needs You" column on the right is the part I check first. It lists every agent that's blocked on a permission prompt, waiting on an answer, or stuck behind a `status/blocked` label, each with a button to deal with it.

There are four views, switchable with the number keys:

- **Command Center**: the fleet-at-a-glance above.
- **Board**: the backlog as a Kanban board, because sometimes you do just want columns.
- **Epics**: progress grouped by epic, so I can see a whole feature's shape.
- **Agents**: one lane per agent with its full work history.

![The Board view: issues laid out in backlog, ready, in-progress, review, and done columns.](/blogs/budget-pm/board.png)

![The Epics view: each epic with a progress bar and its child issues, color-coded by status.](/blogs/budget-pm/epics.png)

Under the hood it's plain: Next.js 15 on the App Router, an Octokit client that's the *only* thing allowed to talk to GitHub, and a small SQLite file (`overlay.db`) that stores the one thing GitHub can't give me, which is what the agents are doing. Everything else is fetched live and the UI polls for it, so new issues and status changes show up on their own without a refresh. No issue data gets cached and goes stale; the database only holds agent heartbeats and activity.

## Making agents legible

Here's the hard part. GitHub knows about issues and PRs. It has no idea that `quiet-mongoose` is two hours into the Hazel chat endpoint and just re-ran its test suite. How does a card know that?

The first answer was the obvious one: have the agents report in. I wrote a little `pm` CLI and wired a Claude Code hook into the budgeting repo so every agent posts a heartbeat on each tool call, names its session at startup, and flips itself to "waiting on you" when it hits a permission prompt. The hook is just a few lines in the agent's settings:

```jsonc
// .claude/settings.json in the budgeting repo
"hooks": {
  "PostToolUse": [{ "hooks": [{ "type": "command", "command": "pm beat" }] }],
  "Notification": [{ "hooks": [{ "type": "command", "command": "pm waiting" }] }]
}
```

That heartbeat bridge is what makes the dots turn green and amber.

It mostly worked. But it had a blind spot that taught me the most useful lesson of the whole project.

The agents that picked up their own work, the ones that ran `/find-work` and grabbed a ready issue on their own, never called `pm start <issue>`. So as far as the dashboard was concerned they were *idle*, even while they were hammering away at a feature. I had agents shown as doing nothing while their terminals scrolled with activity. The self-reporting model assumed the agent would politely announce itself, and the busiest agents were too busy to bother.

So I stopped asking the agents to describe themselves and read the source of truth instead: the Claude Code transcript. Every session writes one. If I read it, I can see what the agent is doing without it stopping to tell me anything: the last real action it took, whether it's mid-task, whether it's waiting on an answer.

```ts
// Read the transcript the agent already wrote, instead of asking it.
const activity = readTranscript(session.transcriptPath)
const status = deriveStatus(activity)   // working · waiting · idle
```

The status started reflecting what each agent had actually done rather than what it remembered to report.

![The Agents view: one lane per agent, each showing its current task highlighted and the trail of issues it has worked.](/blogs/budget-pm/agents.png)

That's the lane view. Each agent's whole arc, with the "▶ now" marker on whatever it's currently on. The status you see here isn't a label an agent set; it's read off the transcript on every poll.

## Steering without leaving the browser

Seeing the fleet was step one. The next itch showed up the moment the view got good: I could see an idle agent sitting next to a ready ticket, and I still had to go find a terminal to connect the two.

So budget-pm grew hands. On macOS with iTerm, I can assign a ready issue to a specific agent and the app focuses that agent's terminal and types the find-work command into it, or spins up a fresh agent in a new worktree if I'd rather. A blocked issue gets a "Resolve & unblock" button that flips the labels for me. And I can open any agent's chat right in the browser: a distilled view of the conversation plus a box to send it a message, no terminal required.

![The agent chat slide-over: a condensed transcript of one agent's session with a box to message it directly.](/blogs/budget-pm/chat-slideover.png)

This is where it stopped being a dashboard and started being a command center. I can see a stuck agent, read what it's stuck on, and unstick it from one screen: assign it, message it, unblock the ticket, or launch a new agent.

## What I learned

I wanted to build the steering features first, because they're the fun part. That was backwards. You can't safely steer what you can't see, and once the seeing got good, half the steering I'd planned turned out to be unnecessary. A lot of what I'd have called "intervention" was really just me not knowing a task was already done. The window mattered more than the levers.

The bigger surprise was how wrong my first instinct about status had been. Asking the agents to announce what they were doing felt clean, but the agents I most needed to track were the ones least likely to stop and report. When I gave up on self-reporting and just read the transcript they were already writing, the status got more reliable and there was less of my code to maintain. I've started reaching for that move elsewhere: if a process already leaves a record, read the record.

If I had to point at one design decision I'd defend, it's how much of the screen the **"Needs You"** column takes up. The bottleneck is my attention, not the agents' time. Six of them generate blocked states faster than I can clear them, so the whole layout bends toward making the next thing that needs a human impossible to miss.

I also killed a feature I liked. The ranked drag-queue from the first version was well-built and well-tested, and it still didn't survive the pivot, because manually ordering a backlog barely matters once agents pull from it on their own. Keeping it would only have cluttered the command center.

And the whole thing is a little ridiculous in hindsight: budget-pm was built by the same kind of Claude Code agents it manages. Its repo has a folder full of specs and implementation plans because every feature went through the same brainstorm-spec-plan-build loop I was running next door. I built the manager with the workers it was going to manage, and that held up.

## What I gained

Concretely: I went from juggling six terminals and a bad mental model to one screen that tells me the truth. The fleet runs while I look at the command center, and when it needs me, it tells me exactly where. My job shrank to the part only I can do, making the calls and clearing the blocks, while the agents kept the rest moving.

Less concretely, I got a clearer feel for what "managing AI agents" actually is. It's less about prompting or reviewing than I'd assumed, and mostly about attention routing: keeping a fleet legible enough that you can spend your judgment on the two or three things that are genuinely stuck instead of the handful that are fine. The tool that does that is worth building, even if you build it with the same agents it's going to manage.

## Before you build one

Reckon and budget-pm are both private repos for now, so I can't hand you the source to clone. The idea travels fine without it, though. If you're running more than one coding agent at a time and the terminal-juggling feels familiar, build yourself a window into the fleet before you build anything else. A lot of the control I thought I needed turned out to be the price of not being able to see the work. If you build one, I'd like to see what lands in your "Needs You" column.

You can find me at <a href="https://github.com/jordan-schnur" target="_blank" rel="noopener noreferrer">github.com/jordan-schnur</a> or on <a href="https://linkedin.com/in/jordan-schnur" target="_blank" rel="noopener noreferrer">LinkedIn</a>. I'm always up to talk agent orchestration, local-first tooling, or where this kind of workflow goes next.
