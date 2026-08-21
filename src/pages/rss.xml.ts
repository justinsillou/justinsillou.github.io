import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { escapeXml } from "../lib/xml";

/**
 * Flux RSS du blog.
 *
 * Écrit à la main plutôt qu'avec @astrojs/rss : le format est stable depuis
 * vingt ans et tient en trente lignes, autant éviter une dépendance de plus.
 */

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL("https://justinsillou.github.io");

  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.id}`, base).href;

      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description)}</description>
${post.data.tags
  .map((tag) => `      <category>${escapeXml(tag)}</category>`)
  .join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Justin Sillou — Blog</title>
    <link>${escapeXml(new URL("/blog", base).href)}</link>
    <description>Notes et veille — sécurité, développement, et ce qui traîne autour.</description>
    <language>fr-FR</language>
    <lastBuildDate>${(posts[0]?.data.pubDate ?? new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(new URL("/rss.xml", base).href)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
