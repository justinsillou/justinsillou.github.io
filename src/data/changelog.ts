import type { Lang } from "../i18n/utils";

/**
 * Journal des versions.
 *
 * `date` est au format ISO (AAAA-MM-JJ) : l'affichage est formaté selon la
 * langue de la page. Titres et lignes sont bilingues.
 *
 * Une ligne = un changement, énoncé une seule fois. Éviter de reprendre le
 * titre de la version dans les lignes, et de décrire la même fonctionnalité
 * sous deux angles : mieux vaut une ligne un peu plus longue que deux qui se
 * recoupent.
 */

/** Un texte dans les deux langues du site. */
export type Localized = Record<Lang, string>;

export type ChangelogEntry = {
  version: string;
  /** Format ISO (AAAA-MM-JJ). */
  date: string;
  title: Localized;
  changes: Localized[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: "1.1.1",
    date: "2026-08-28",
    title: {
      fr: "Ajout des auteurs dans la liste de lecture",
      en: "Added authors to the reading list",
    },
    changes: [
      {
        fr: "Ajout d'une section auteur dans les livres lus ou en cours",
        en: "Added author information to books currently being read or already read",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-08-24",
    title: {
      fr: "Le site en deux langues",
      en: "The site in two languages",
    },
    changes: [
      {
        fr: "Site bilingue français / anglais",
        en: "Bilingual French / English site",
      },
      {
        fr: "Un seul gabarit par page : les textes viennent de fichiers de traduction, plus de page recopiée par langue",
        en: "One template per page: text comes from translation files, no page duplicated per language",
      },
      {
        fr: "Adresses anglaises préfixées par /en, la version française reste à la racine",
        en: "English URLs prefixed with /en, the French version stays at the root",
      },
      {
        fr: "CV, projets, page Now et changelog traduits, pas seulement l'habillage",
        en: "Résumé, projects, Now page and changelog translated, not just the chrome",
      },
      {
        fr: "Articles du blog traduits, rangés par dossier de langue, avec repli sur le français si une traduction manque",
        en: "Blog posts translated, filed per language folder, falling back to French when a translation is missing",
      },
      {
        fr: "Un flux RSS par langue : /rss.xml en français, /en/rss.xml en anglais",
        en: "One RSS feed per language: /rss.xml in French, /en/rss.xml in English",
      },
      {
        fr: "Balises hreflang, canonical et Open Graph adaptées à la langue de la page",
        en: "hreflang, canonical and Open Graph tags matched to the page language",
      },
      {
        fr: "Palette de commandes (Ctrl + K) traduite, avec une commande pour changer de langue",
        en: "Command palette (Ctrl + K) translated, with a command to switch language",
      },
      {
        fr: "Sélecteur de langue dans l'en-tête, en drapeau dessiné au trait comme le reste des icônes",
        en: "Language switcher in the header, as a line-drawn flag in keeping with the other icons",
      },
      {
        fr: "Un clin d'œil discret sur la page d'accueil",
        en: "A quiet nod tucked into the homepage",
      },
      {
        fr: "Couleurs des compétences du CV : teinte stable, et contraste conforme au niveau AA dans les deux thèmes",
        en: "Résumé skill colours: stable hue, and AA-level contrast in both themes",
      },
      {
        fr: "Le raccourci « dernières fuites » annonce la date réelle des données quand le flux est injoignable, au lieu de celle du build",
        en: "The « latest leaks » widget states the real data date when the feed is unreachable, instead of the build date",
      },
      {
        fr: "Flux externe des fuites : réponse plafonnée, nombre d'entrées et longueur des champs limités",
        en: "External leaks feed: capped response, bounded number of entries and field lengths",
      },
      {
        fr: "Alternances de langue déclarées dans le plan du site, et retirées des pages non indexées",
        en: "Language alternates declared in the sitemap, and dropped from non-indexed pages",
      },
      {
        fr: "Liens internes construits à partir du chemin de déploiement, plus d'adresse absolue en dur",
        en: "Internal links built from the deployment base path, no more hard-coded absolute URLs",
      },
      {
        fr: "Lien EcoIndex nettoyé de la query string avant d'être transmis",
        en: "EcoIndex link stripped of its query string before being handed over",
      },
      {
        fr: "Colonne « À venir » en regard du journal : ce qui arrive bientôt, sans date ni case à cocher",
        en: "A « Coming up » column alongside the log: what lands next, with no dates and no checkboxes",
      },
    ],
  },

  {
    version: "1.0.0",
    date: "2026-08-22",
    title: { fr: "Du contenu, enfin", en: "Some content, at last" },
    changes: [
      {
        fr: "Page Projets : liste filtrable par technologie, fiches dépliables",
        en: "Projects page: list filtered by technology, expandable cards",
      },
      {
        fr: "Page Now : ce que je fais en ce moment, avec indicateur de fraîcheur",
        en: "Now page: what I am up to, with a freshness indicator",
      },
      {
        fr: "Blog : collection Markdown, filtres par thème, sommaire et sources",
        en: "Blog: Markdown collection, topic filters, table of contents and sources",
      },
      {
        fr: "Premier article : les fuites de données en France, écrit sur l'actualité de l'été 2026",
        en: "First post: data breaches in France, written around the news of summer 2026",
      },
      {
        fr: "Terminal simplifié : palette de commandes (Ctrl + K), fin de la fausse fenêtre macOS",
        en: "Simplified terminal: command palette (Ctrl + K), the fake macOS window is gone",
      },
      {
        fr: "Ctrl + K cherche aussi dans les articles du blog, accents ignorés",
        en: "Ctrl + K also searches blog posts, accents ignored",
      },
      {
        fr: "Recherche accessible depuis le header, et disponible sur mobile",
        en: "Search reachable from the header, and available on mobile",
      },
      {
        fr: "Accueil restructuré en deux colonnes, avec une colonne de raccourcis : « à la une » et aperçu des dernières fuites",
        en: "Homepage restructured into two columns, with a widget column: « featured » and a preview of the latest leaks",
      },
      {
        fr: "Raccourci « à la une » : mise en avant manuelle, éditable dans un fichier",
        en: "« Featured » widget: manual selection, edited in a single file",
      },
      {
        fr: "Raccourcis réutilisables : un cadre commun, posable sur n'importe quelle page",
        en: "Reusable widgets: one shared frame, droppable on any page",
      },
      {
        fr: "Bloc « dernières fuites recensées » alimenté au build par le flux libre de bonjourlafuite.eu.org",
        en: "The « latest recorded leaks » block is fed at build time by the open feed from bonjourlafuite.eu.org",
      },
      {
        fr: "Reconstruction quotidienne du site pour rafraîchir ces données",
        en: "Daily rebuild of the site to refresh that data",
      },
      {
        fr: "Filtres et sommaire regroupés dans une colonne latérale",
        en: "Filters and table of contents gathered in a side column",
      },
      {
        fr: "Sommaire actif pendant la lecture, barre de progression sans JavaScript",
        en: "Table of contents highlighted while reading, progress bar without JavaScript",
      },
      {
        fr: "Navigation entre articles et bouton de partage sans service tiers",
        en: "Navigation between posts and a share button with no third-party service",
      },
      {
        fr: "Flux RSS du blog",
        en: "RSS feed for the blog",
      },
      {
        fr: "Footer : mention d'écoconception, poids réel de la page, lien vers EcoIndex et précision sur ce que le score ne mesure pas",
        en: "Footer: eco-design note, real page weight, a link to EcoIndex and a note on what the score does not measure",
      },
      {
        fr: "Métadonnées : description, canonical, Open Graph, et fin du noindex global",
        en: "Metadata: description, canonical, Open Graph, and the site-wide noindex removed",
      },
      {
        fr: "Plan du site et robots.txt",
        en: "Sitemap and robots.txt",
      },
      {
        fr: "Mise en page élargie sur tout le site, alignée sur celle du CV",
        en: "Wider layout across the site, aligned with the résumé page",
      },
      {
        fr: "Coloration syntaxique adaptée au thème clair comme au thème sombre",
        en: "Syntax highlighting adapted to both light and dark themes",
      },
      {
        fr: "Typographie : suppression des espacements de lettres",
        en: "Typography: letter spacing removed",
      },
      {
        fr: "Polices DM Sans et JetBrains Mono réellement chargées",
        en: "DM Sans and JetBrains Mono fonts actually loaded",
      },
      {
        fr: "Page 404 remise à jour",
        en: "404 page refreshed",
      },
      {
        fr: "Bouton d'accueil : icône maison plutôt que flèche de retour",
        en: "Home button: a house icon rather than a back arrow",
      },
      { fr: "nitsuj", en: "nitsuj" },
      {
        fr: "Vérification du typage avant chaque déploiement",
        en: "Type checking before every deployment",
      },
    ],
  },

  {
    version: "0.9.4",
    date: "2026-08-19",
    title: { fr: "Ajout de la page de CV", en: "Résumé page added" },
    changes: [
      { fr: "Modification du menu", en: "Menu reworked" },
      { fr: "Édition du footer [WIP]", en: "Footer edited [WIP]" },
      { fr: "Modification de la page 404", en: "404 page reworked" },
      {
        fr: "Préparation de la page projet + Lien avec la page CV",
        en: "Groundwork for the projects page, linked to the résumé",
      },
      { fr: "Réflexion sur l'i18n", en: "Thinking about i18n" },
      {
        fr: "Ajout d'un terminal interactif, avec des commandes pour naviguer dans le site",
        en: "An interactive terminal added, with commands to navigate the site",
      },
    ],
  },

  {
    version: "0.9.3",
    date: "2026-08-18",
    title: {
      fr: "Ajout d'un menu burger [WIP]",
      en: "Burger menu added [WIP]",
    },
    changes: [
      {
        fr: "Création des idées de page CV, Blog, ...",
        en: "Sketching out the résumé page, the blog, and the rest",
      },
      { fr: "↑ ↑ ↓ ↓ ← → ← → B A", en: "↑ ↑ ↓ ↓ ← → ← → B A" },
    ],
  },

  {
    version: "0.9.2",
    date: "2026-07-14",
    title: { fr: "Ça se précise !", en: "Taking shape!" },
    changes: [
      {
        fr: "Nouveau design sobre avec mode clair/sombre",
        en: "New understated design with light and dark modes",
      },
      { fr: "Ajout d'une page de changelog", en: "A changelog page" },
      { fr: "Passage à Tailwind", en: "Moved to Tailwind" },
      { fr: "Page 404", en: "404 page" },
      {
        fr: "Pas encore de contenu, mais ça va venir !",
        en: "No content yet, but it is coming!",
      },
    ],
  },

  {
    version: "0.9.1",
    date: "2026-06-08",
    title: { fr: "En cours de développement", en: "Under construction" },
    changes: [
      {
        fr: "Les idées cogitent, mais le site est encore en construction. Il n'y a pas grand chose à voir pour le moment.",
        en: "Ideas are brewing, but the site is still under construction. Not much to see for now.",
      },
    ],
  },

  {
    version: "0.9.0",
    date: "2026-04-01",
    title: {
      fr: "Il est temps de se refaire une beauté",
      en: "Time for a fresh coat of paint",
    },
    changes: [
      {
        fr: "Non ce n'était pas une blague du 1er Avril, il a été convenu de repartir de 0. Dans le but de créer un site plus simple et plus rapide",
        en: "No, it was not an April Fools' joke: the decision was to start again from scratch, aiming for a simpler and faster site",
      },
    ],
  },
];

/** Le journal des versions dans une seule langue. */
export function getChangelog(lang: Lang) {
  return changelog.map((entry) => ({
    version: entry.version,
    date: entry.date,
    title: entry.title[lang] ?? entry.title.fr,
    changes: entry.changes.map((change) => change[lang] ?? change.fr),
  }));
}

/**
 * Dernière version publiée.
 *
 * Trié plutôt que `changelog[0]` : les dates sont au format ISO, donc l'ordre
 * lexicographique est l'ordre chronologique, et une entrée ajoutée au mauvais
 * endroit ne casse pas silencieusement le pied de page.
 */
export const latestRelease = [...changelog].sort((a, b) =>
  b.date.localeCompare(a.date),
)[0];
