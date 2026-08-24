---
title: "First post, just to see if it holds up"
description: "A test post, kept online on purpose: it doubles as a template and checks that formatting, the table of contents and the filters all work."
pubDate: 2026-06-14
tags: ["Misc"]
sources:
  - label: "The site's source code"
    href: "https://github.com/justinsillou/justinsillou.github.io"
---

This one has nothing to say. It exists to check that the whole chain holds up:
write a Markdown file, watch it show up in the list, find it again by its topic,
and get a properly formatted page without touching anything else.

I am keeping it online rather than deleting it: when I write the next one in six
months, it will serve as a template.

## What it checks

A level-two heading like this one feeds the table of contents, provided there are
at least two of them. Below it, **bold passages**, *italics*, `inline code` and
[links](https://github.com/justinsillou) all have to stay readable in the light
theme as well as the dark one.

A list, while we are at it:

- first item;
- second item, a little longer so we can see how it behaves when the line runs
  past the width of the text column;
- third item.

And an ordered list, which is not numbered the same way:

1. step one;
2. step two;
3. step three.

## A code block

```ts
export const readingTime = (body: string) =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
```

> A quote, to finish the guided tour.

That is all. The next post will have a subject.
