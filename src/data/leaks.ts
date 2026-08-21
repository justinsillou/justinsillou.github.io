import snapshot from "./leaks-snapshot.json";

/**
 * Dernières fuites de données françaises.
 *
 * Source : « C'est qui qui a fuité aujourd'hui ? » (bonjourlafuite.eu.org),
 * projet libre sous licence MIT — https://framagit.org/aeris/bonjour-la-fuite/
 *
 * Le site n'expose pas d'API, mais publie un flux RSS d'environ 6 Ko.
 * On le lit **au moment du build**, pas dans le navigateur :
 *
 *   - aucun JavaScript envoyé au visiteur, aucune requête tierce à l'affichage ;
 *   - pas de problème de CORS ni de quota ;
 *   - la page reste entièrement statique.
 *
 * En contrepartie, les données datent du dernier build : c'est le workflow
 * GitHub Actions qui les rafraîchit.
 */

const FEED_URL = "https://bonjourlafuite.eu.org/feed.xml";
export const LEAKS_SOURCE_URL = "https://bonjourlafuite.eu.org/";
export const LEAKS_SOURCE_NAME = "C'est qui qui a fuité aujourd'hui ?";

export type Leak = {
  organization: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** `confirmed` = reconnu publiquement, `claimed` = seulement revendiqué. */
  status: "confirmed" | "claimed";
  /** Volume annoncé, quand il l'est. */
  volume?: string;
  /** Données exposées, telles que décrites par la source. */
  data: string[];
  /** Données sensibles au sens de l'article 9 du RGPD. */
  sensitive: boolean;
};

const decode = (value: string) =>
  value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#3[49];/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();

const first = (source: string, pattern: RegExp) =>
  source.match(pattern)?.[1]?.trim() ?? "";

const all = (source: string, pattern: RegExp) =>
  [...source.matchAll(pattern)].map((match) => decode(match[1]));

function parseFeed(xml: string): Leak[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
    (match) => match[1],
  );

  return items.flatMap((item) => {
    const rawTitle = first(item, /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
    const rawDate = first(item, /<pubDate>([\s\S]*?)<\/pubDate>/);

    if (!rawTitle || !rawDate) return [];

    const description = first(
      item,
      /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/,
    );

    // Le flux préfixe le titre par 🟢 (confirmé) ou 🟠 (revendiqué).
    const status = rawTitle.startsWith("🟠") ? "claimed" : "confirmed";
    // Le drapeau `u` est indispensable : sans lui, une classe de caractères
    // découpe ces emoji en paires de substitution et n'en retire qu'une moitié.
    const organization = decode(rawTitle.replace(/^[🟢🟠]\s*/u, ""));

    // Le volume, quand il existe, précède la liste des données exposées.
    const volume = decode(description.split("<ul>")[0].replace(/<[^>]+>/g, ""));

    const timestamp = new Date(rawDate);

    return [
      {
        organization,
        date: Number.isNaN(timestamp.getTime())
          ? rawDate
          : timestamp.toISOString().slice(0, 10),
        status,
        volume: volume || undefined,
        data: all(description, /<li>([\s\S]*?)<\/li>/g).map((entry) =>
          entry.replace(/<[^>]+>/g, ""),
        ),
        sensitive: /<category>\s*sensitive\s*<\/category>/.test(item),
      } satisfies Leak,
    ];
  });
}

let cache: Promise<Leak[]> | null = null;

async function loadLeaks(): Promise<Leak[]> {
  try {
    const response = await fetch(FEED_URL, {
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "justinsillou.github.io (build)" },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const leaks = parseFeed(await response.text());

    if (leaks.length === 0) throw new Error("flux vide ou format inattendu");

    return leaks;
  } catch (error) {
    // Une source tierce indisponible ne doit pas casser le build : on retombe
    // sur l'instantané versionné, en le signalant dans les logs.
    console.warn(
      `[leaks] flux injoignable (${
        error instanceof Error ? error.message : error
      }), utilisation de l'instantané local.`,
    );

    return snapshot as Leak[];
  }
}

/** Les `limit` fuites les plus récentes, de la plus récente à la plus ancienne. */
export async function getLatestLeaks(limit = 8): Promise<Leak[]> {
  cache ??= loadLeaks();

  const leaks = await cache;

  return [...leaks]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
