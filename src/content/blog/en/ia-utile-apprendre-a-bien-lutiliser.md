---
title: "Using AI for real: what a Rubik's Cube taught me"
description: "A Rubik's Cube solver built with an AI, and above all what I learned along the way: staying critical, citing sources, cross-checking them, and saying what you delegated."
pubDate: 2026-09-29
tags: ["AI", "Learning", "Method"]
ai: drafting
sources:
  - label: "The project: Rubik's Graph Solver (demo)"
    href: "https://justinsillou.github.io/rubiks-graph-solver/"
  - label: "The full walkthrough, version by version (PROMPTING.md, in French)"
    href: "https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/PROMPTING.md"
  - label: "The project's sources (SOURCES.md)"
    href: "https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/SOURCES.md"
  - label: "Anthropic — AI Fluency: Framework & Foundations (the “4D” framework)"
    href: "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
  - label: "Anthropic Academy"
    href: "https://www.anthropic.com/learn"
  - label: "Anthropic — Prompt engineering overview"
    href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview"
  - label: "Anthropic — Claude Code best practices"
    href: "https://www.anthropic.com/engineering/claude-code-best-practices"
  - label: "Solving a Rubik's Cube Using Its Local Graph Structure (arXiv, 2024)"
    href: "https://arxiv.org/html/2408.07945v1"
  - label: "Wikipedia — Optimal solutions for the Rubik's Cube"
    href: "https://en.wikipedia.org/wiki/Optimal_solutions_for_the_Rubik%27s_Cube"
  - label: "Rokicki et al. — The Diameter of the Rubik's Cube Group Is Twenty"
    href: "https://doi.org/10.1137/120867366"
  - label: "Kociemba — The two-phase algorithm"
    href: "http://kociemba.org/cube.htm"
---

I'm not here to say AI is amazing, or that it's dangerous. I just want to tell
you how I used it on a real project, what worked, what didn't, and what I'm
keeping from it.

The project: a **Rubik's Cube solver** that shows the solution as a path through
a graph. It's a pretext. What I cared about was learning to **use AI well**, not
adding one more solved cube to the Internet (there are plenty already).

The result is [online](https://justinsillou.github.io/rubiks-graph-solver/).
But the most useful part, I think, is elsewhere: in the way of working. (The
demo and the project's guide are in French.)

## What does “useful” mean?

For me, AI is useful when it helps me **understand** or **do better**, not when
it does for me what I haven't understood.

If I ask for a solver and copy the result, I've learned nothing. If I ask for a
solver, then “why this algorithm?”, “what happens if I change a move?”, “what
did you not check?”, then I learn. Same code in the end, but a very different
day.

## What I did, in order

The details are in the [repository's guide](https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/PROMPTING.md).
Here is the short version:

1. **I start from sources, not a blank page.** Before the first message, I put
   three links in a file: a scientific paper, a Reddit thread, a Wikipedia page.
   The AI started from my material instead of making up its own.
2. **I ask for a POC.** A small version that works, then we improve it. I moved
   forward in versions, from 0.1 to 0.7.
3. **I describe the audience.** “One explanation for a child and one for a PhD
   student, side by side.” That was one of the instructions that worked best.
4. **I ask deeper questions**, not only “add this button”. For example: “the
   scramble takes a finite number of moves, does that change the result?” The
   answer is in the page.
5. **I say what's wrong, not how to fix it.** “We don't understand the
   relationship between the cube and the graph” gave a better idea (drawing the
   vertices as real cubes) than if I had dictated the solution.
6. **I keep control of what commits me**: the style, the audience, and when to
   publish. The AI even asked for confirmation first.

## Staying critical

This is the most important point, and the easiest to forget, because the AI
answers with confidence, even when it is wrong.

Here is what really happened in this project:

- **A wrong mathematical statement** in a generated text. I caught it while
  proofreading. A well-written text is not a correct text.
- **Reference numbering that shifted** after an addition.
- **A first design that looked “too AI”**, with the same rounded cards
  everywhere. An AI's default style isn't neutral: I had to challenge it.
- **Screenshots that kept failing.** The AI said so plainly instead of pretending
  it had seen everything, and verified another way.

My simple reflexes:

- I ask **“what did you check, and how?”** An honest AI also tells you what it
  could *not* check.
- I prefer **automated tests** to a quick look. Here, a test solves 20 scrambled
  cubes and checks that every 3D rotation matches the mathematical model. It
  reruns after every change.
- I **reread everything that will be published**. Always.

## Citing sources

Two reasons.

First, it's honest toward the people who will read: they can check and go
further. Second, it protects me. An AI can **invent a reference** that looks
real: credible author, plausible title, and nothing behind it.

So for every source added to the project, the link and the DOI were tested
before citing it. The full list is in
[SOURCES.md](https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/SOURCES.md).

I also cite **the AI itself**. The project's README says the code and texts were
produced in dialogue with Claude Code, then reviewed and tested. This article
too: it was written with an AI's help from my notes and my project, and that is
stated at the bottom of the page. I'd rather say it than hide it.

## Cross-checking sources

A single source, even a good one, isn't enough. What helped me was mixing types
of sources that don't say the same thing in the same way:

- **A scientific paper** ([arXiv, 2024](https://arxiv.org/html/2408.07945v1))
  for the starting idea: the cube seen as a graph.
- **A Reddit thread**, to see how people talk about it and what intrigues them.
  It's less reliable, but it gives the tone and the real questions.
- **Wikipedia**, to place the subject: which optimal solutions are known, and
  by whom.
- **The original publications** behind it: the two-phase algorithm by
  [Kociemba](http://kociemba.org/cube.htm), and the proof that 20 moves always
  suffice ([Rokicki et al., 2013](https://doi.org/10.1137/120867366)).

When two sources contradict each other, or when a claim from the AI can't be
found anywhere, that's the signal to dig. Not to pick the one that suits me.

## What I take from it

Anthropic's free [AI Fluency](https://anthropic.skilljar.com/ai-fluency-framework-foundations)
course offers four words to find your way. I found them useful because they are
concrete:

| Word | The question to ask |
|---|---|
| **Delegation** | What do I hand to the AI, what do I keep? |
| **Description** | Do I explain clearly what I want? |
| **Discernment** | Do I check what it produces? |
| **Diligence** | Do I use it responsibly and transparently? |

I didn't turn this project into a work of art. It has limits, and I know them.
But it taught me more than a tutorial, because I had to understand what I was
asking for, and check what I received.

If you want to try, the [PROMPTING.md](https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/PROMPTING.md)
file (in French) has a first-message template to copy, with tips sorted by these
four words. Start small, keep your sources, reread everything.

*Personal project, not affiliated with Anthropic.*
