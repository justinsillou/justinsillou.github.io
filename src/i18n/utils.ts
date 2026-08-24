import {
  defaultLang,
  languages,
  localeTags,
  TERMINAL_KEYS,
  ui,
  type Lang,
  type TerminalKey,
  type UIKey,
} from "./ui";

export {
  ui,
  defaultLang,
  languages,
  localeTags,
  ogLocales,
  STORIES_QUOTE,
  TERMINAL_KEYS,
  type Lang,
  type TerminalKey,
  type UIKey,
} from "./ui";

export const localeList = Object.keys(languages) as Lang[];

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (localeList as string[]).includes(value);
}

/**
 * Préfixe de déploiement, sans slash final : `""` à la racine d'un domaine,
 * `"/depot"` si le site est servi depuis un sous-chemin.
 *
 * Le workflow GitHub Actions passe `--base`, donc la valeur n'est pas garantie
 * à `/` : tout lien interne passe par `withBase`, et toute lecture de
 * `Astro.url.pathname` par `stripBase`.
 */
const BASE_PATH = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "");

/** Ajoute le préfixe de déploiement à un chemin absolu. */
export function withBase(path: string): string {
  return BASE_PATH ? `${BASE_PATH}${path}` : path;
}

/** Retire le préfixe de déploiement d'un chemin issu de l'URL courante. */
export function stripBase(pathname: string): string {
  if (!BASE_PATH) return pathname;

  if (pathname === BASE_PATH) return "/";

  return pathname.startsWith(`${BASE_PATH}/`)
    ? pathname.slice(BASE_PATH.length)
    : pathname;
}

/**
 * Langue déduite de l'URL.
 *
 * La langue par défaut n'est pas préfixée (`/now`), les autres le sont
 * (`/en/now`) — c'est la configuration `prefixDefaultLocale: false`
 * d'`astro.config.mjs`.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split("/");

  return isLang(first) ? first : defaultLang;
}

/**
 * Chemin canonique d'une page : ni préfixe de déploiement, ni préfixe de
 * langue. `/depot/en/now` comme `/now` donnent `/now`.
 */
export function stripLang(pathname: string): string {
  const bare = stripBase(pathname);

  const [, first, ...rest] = bare.split("/");

  if (!isLang(first)) return bare;

  const remainder = rest.join("/");

  return remainder ? `/${remainder}` : "/";
}

/**
 * Chemin canonique (celui du français) transposé dans une langue, prêt à être
 * posé dans un `href`.
 *
 *   localizePath("en", "/projets")  ->  "/en/projets"
 *   localizePath("fr", "/projets")  ->  "/projets"
 */
export function localizePath(lang: Lang, path: string): string {
  const clean = stripLang(path.startsWith("/") ? path : `/${path}`);

  if (lang === defaultLang) return withBase(clean);

  return withBase(clean === "/" ? `/${lang}/` : `/${lang}${clean}`);
}

/** Raccourci pratique dans les composants : `const l = localizer(lang)`. */
export function localizer(lang: Lang) {
  return (path: string) => localizePath(lang, path);
}

/**
 * Traducteur pour une langue.
 *
 * Les marqueurs `{nom}` de la chaîne sont remplacés par `params.nom`.
 * Une clé absente de la langue demandée retombe sur le français.
 */
export function useTranslations(lang: Lang) {
  return function t(
    key: UIKey,
    params?: Record<string, string | number>,
  ): string {
    const value = ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;

    if (!params) return value;

    return value.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in params ? String(params[name]) : match,
    );
  };
}

/**
 * Chemins à générer pour une page traduite.
 *
 * À utiliser dans les routes `src/pages/[...locale]/…` :
 *
 *   export const getStaticPaths = () => localePaths();
 *
 * `locale` vaut `undefined` pour le français (pas de préfixe) et `"en"` pour
 * l'anglais, ce qui produit `/now` et `/en/now` à partir d'un seul gabarit.
 */
export function localePaths() {
  return localeList.map((lang) => ({
    params: { locale: lang === defaultLang ? undefined : lang },
    props: { lang },
  }));
}

/** Date formatée selon la langue. */
export function formatDate(
  date: Date | string,
  lang: Lang,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
): string {
  const value = typeof date === "string" ? new Date(date) : date;

  return value.toLocaleDateString(localeTags[lang], options);
}

/** Les autres langues disponibles pour la page courante. */
export function alternateLinks(url: URL, site?: URL) {
  const path = stripLang(url.pathname);

  return localeList.map((lang) => ({
    lang,
    hreflang: localeTags[lang],
    href: new URL(localizePath(lang, path), site ?? url).href,
  }));
}

/** Le sous-ensemble de chaînes dont la palette de commandes a besoin. */
export function terminalStrings(lang: Lang): Record<TerminalKey, string> {
  const t = useTranslations(lang);

  return Object.fromEntries(TERMINAL_KEYS.map((key) => [key, t(key)])) as Record<
    TerminalKey,
    string
  >;
}
