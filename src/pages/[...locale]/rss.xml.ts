import type { APIRoute, GetStaticPaths } from "astro";

import { escapeXml } from "../../lib/xml";
import { getPosts } from "../../lib/blog";
import {
  localePaths,
  localeTags,
  localizePath,
  ui,
  type Lang,
} from "../../i18n/utils";

/**
 * Flux RSS du blog, un par langue.
 *
 * Écrit à la main plutôt qu'avec @astrojs/rss : le format est stable depuis
 * vingt ans et tient en trente lignes, autant éviter une dépendance de plus.
 *
 * `/rss.xml` sert le flux français, `/en/rss.xml` le flux anglais. Les deux
 * pointent vers les URL de leur propre langue.
 */

export const getStaticPaths: GetStaticPaths = () => localePaths();

export const GET: APIRoute = async ({ site, props }) => {
  const lang = (props as { lang: Lang }).lang;
  const strings = ui[lang];

  const base = site ?? new URL("https://justinsillou.github.io");

  const posts = await getPosts(lang);

  const items = posts
    .map(({ entry, slug }) => {
      const url = new URL(localizePath(lang, `/blog/${slug}`), base).href;

      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${entry.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(entry.data.description)}</description>
${entry.data.tags
  .map((tag) => `      <category>${escapeXml(tag)}</category>`)
  .join("\n")}
    </item>`;
    })
    .join("\n");

  const feedUrl = new URL(localizePath(lang, "/rss.xml"), base).href;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(strings["site.rssTitle"])}</title>
    <link>${escapeXml(new URL(localizePath(lang, "/blog"), base).href)}</link>
    <description>${escapeXml(strings["site.description"])}</description>
    <language>${localeTags[lang]}</language>
    <lastBuildDate>${(posts[0]?.entry.data.pubDate ?? new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
