import { getCollection, type CollectionEntry } from "astro:content";

import { defaultLang, isLang, type Lang } from "../i18n/utils";

/**
 * Lecture du blog, langue par langue.
 *
 * Un article = un dossier de langue + un nom de fichier :
 *
 *   src/content/blog/fr/premier-article.md  ->  /blog/premier-article
 *   src/content/blog/en/premier-article.md  ->  /en/blog/premier-article
 *
 * Le nom de fichier est l'identifiant commun aux traductions : il donne l'URL
 * dans les deux langues, ce qui garde les liens stables et permet au sélecteur
 * de langue de rester sur le même article.
 *
 * Si une traduction manque, on retombe sur la version française plutôt que de
 * faire disparaître l'article : `fallback` permet de le signaler au lecteur.
 */

export type Post = {
  entry: CollectionEntry<"blog">;
  /** Identifiant d'URL, commun à toutes les traductions. */
  slug: string;
  /** Langue du fichier réellement affiché. */
  lang: Lang;
  /** `true` quand la traduction manque et qu'on affiche l'original. */
  fallback: boolean;
};

type Parsed = { entry: CollectionEntry<"blog">; slug: string; lang: Lang };

function parse(entry: CollectionEntry<"blog">): Parsed {
  const [first, ...rest] = entry.id.split("/");

  // Un fichier posé à la racine reste lisible : il est traité comme français.
  return isLang(first)
    ? { entry, lang: first, slug: rest.join("/") }
    : { entry, lang: defaultLang, slug: entry.id };
}

const byDate = (a: Post, b: Post) =>
  b.entry.data.pubDate.getTime() - a.entry.data.pubDate.getTime();

/** Les articles publiés dans une langue, du plus récent au plus ancien. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const parsed = (await getCollection("blog", ({ data }) => !data.draft)).map(
    parse,
  );

  const translated = new Map(
    parsed.filter((post) => post.lang === lang).map((post) => [post.slug, post]),
  );

  const originals = new Map(
    parsed
      .filter((post) => post.lang === defaultLang)
      .map((post) => [post.slug, post]),
  );

  // Le français fixe la liste des articles ; une traduction sans original
  // reste néanmoins publiée.
  const slugs = new Set([...originals.keys(), ...translated.keys()]);

  return [...slugs]
    .map((slug) => {
      const hit = translated.get(slug);

      if (hit) return { ...hit, fallback: false };

      return { ...originals.get(slug)!, fallback: true };
    })
    .sort(byDate);
}

/** Un article et ses voisins dans le temps, pour la navigation en bas de page. */
export function withNeighbours(posts: Post[]) {
  return posts.map((post, index) => ({
    post,
    // Les articles sont triés du plus récent au plus ancien : le suivant dans
    // le tableau est donc le précédent dans le temps.
    older: posts[index + 1],
    newer: posts[index - 1],
  }));
}
