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
 *
 * C'est une source tierce : elle est traitée comme telle. La réponse est
 * plafonnée en taille, le nombre d'entrées et la longueur des champs le sont
 * aussi. Le rendu passe par Astro, qui échappe le HTML — mais rien n'oblige
 * une source externe à rester raisonnable, et le build ne doit pas pouvoir
 * être mis à genoux par une réponse aberrante.
 */

const FEED_URL = "https://bonjourlafuite.eu.org/feed.xml";
export const LEAKS_SOURCE_URL = "https://bonjourlafuite.eu.org/";
export const LEAKS_SOURCE_NAME = "C'est qui qui a fuité aujourd'hui ?";

/** Le flux fait ~6 Ko : un mégaoctet laisse une marge très large. */
const MAX_FEED_BYTES = 1_048_576;

/** Au-delà, c'est que le flux a changé de nature — on n'en garde pas plus. */
const MAX_ITEMS = 200;

const MAX_ORGANIZATION_LENGTH = 120;
const MAX_VOLUME_LENGTH = 80;

export type Leak = {
  organization: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** `confirmed` = reconnu publiquement, `claimed` = seulement revendiqué. */
  status: "confirmed" | "claimed";
  /** Volume annoncé, quand il l'est. */
  volume?: string;
  /** Données sensibles au sens de l'article 9 du RGPD. */
  sensitive: boolean;
};

/** Résultat de la lecture du flux, avec l'origine réelle des données. */
export type LeaksResult = {
  leaks: Leak[];
  /** `true` quand le flux est injoignable et qu'on sert l'instantané local. */
  stale: boolean;
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

const clamp = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;

const first = (source: string, pattern: RegExp) =>
  source.match(pattern)?.[1]?.trim() ?? "";

function parseFeed(xml: string): Leak[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .slice(0, MAX_ITEMS)
    .map((match) => match[1]);

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
        organization: clamp(organization, MAX_ORGANIZATION_LENGTH),
        date: Number.isNaN(timestamp.getTime())
          ? rawDate
          : timestamp.toISOString().slice(0, 10),
        status,
        volume: volume ? clamp(volume, MAX_VOLUME_LENGTH) : undefined,
        sensitive: /<category>\s*sensitive\s*<\/category>/.test(item),
      } satisfies Leak,
    ];
  });
}

/**
 * Lit la réponse en s'arrêtant net au-delà de `MAX_FEED_BYTES`.
 *
 * `response.text()` chargerait tout en mémoire avant de pouvoir vérifier
 * quoi que ce soit : on compte les octets au fil de l'eau.
 */
async function readCapped(response: Response): Promise<string> {
  const reader = response.body?.getReader();

  if (!reader) return (await response.text()).slice(0, MAX_FEED_BYTES);

  const decoder = new TextDecoder();

  let text = "";
  let bytes = 0;

  for (;;) {
    const { done, value } = await reader.read();

    if (done) break;

    bytes += value.byteLength;

    if (bytes > MAX_FEED_BYTES) {
      await reader.cancel();
      throw new Error(`flux au-delà de ${MAX_FEED_BYTES} octets`);
    }

    text += decoder.decode(value, { stream: true });
  }

  return text + decoder.decode();
}

let cache: Promise<LeaksResult> | null = null;

async function loadLeaks(): Promise<LeaksResult> {
  try {
    const response = await fetch(FEED_URL, {
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "justinsillou.github.io (build)" },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const leaks = parseFeed(await readCapped(response));

    if (leaks.length === 0) throw new Error("flux vide ou format inattendu");

    return { leaks, stale: false };
  } catch (error) {
    // Une source tierce indisponible ne doit pas casser le build : on retombe
    // sur l'instantané versionné, en le signalant dans les logs *et* dans la
    // page — afficher la date du build sur des données figées serait mentir.
    console.warn(
      `[leaks] flux injoignable (${
        error instanceof Error ? error.message : error
      }), utilisation de l'instantané local.`,
    );

    return { leaks: snapshot as Leak[], stale: true };
  }
}

/** Les `limit` fuites les plus récentes, de la plus récente à la plus ancienne. */
export async function getLatestLeaks(limit = 8): Promise<LeaksResult> {
  cache ??= loadLeaks();

  const { leaks, stale } = await cache;

  return {
    leaks: [...leaks].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit),
    stale,
  };
}
