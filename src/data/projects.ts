import type { Lang } from "../i18n/utils";

/**
 * Projets personnels et universitaires.
 *
 * Les projets professionnels vivent dans `src/data/cv.ts`
 * (ils sont rattachés à une expérience).
 *
 * Les champs de texte sont bilingues : `{ fr: "…", en: "…" }`. Le reste
 * (slug, année, technos, liens) ne dépend pas de la langue.
 * `getProjects(lang)` aplatit le tout pour la page.
 */

/** Un texte dans les deux langues du site. */
export type Localized = Record<Lang, string>;

export type ProjectLink = {
  label: Localized;
  href: string;
};

export type ProjectCategory = "Web" | "Mobile" | "Algorithmie";

export type ProjectSource = {
  slug: string;
  title: Localized;
  /** Une phrase, affichée dans la carte. */
  summary: Localized;
  /** Détail affiché quand la carte est dépliée. */
  details?: Localized;
  /** Année ou période affichée. Sert aussi au tri (via `sortKey`). */
  period: Localized;
  /** Année de fin, pour trier du plus récent au plus ancien. */
  sortKey: number;
  context: Localized;
  /** Sert de filtre sur la page : on garde volontairement peu de familles. */
  category: ProjectCategory;
  tags: string[];
  status: "termine" | "en-cours";
  links?: ProjectLink[];
};

/** Un projet, une fois la langue choisie. */
export type Project = {
  slug: string;
  title: string;
  summary: string;
  details?: string;
  period: string;
  sortKey: number;
  context: string;
  category: ProjectCategory;
  tags: string[];
  status: "termine" | "en-cours";
  links?: { label: string; href: string }[];
};

const SOURCE_CODE: Localized = { fr: "Code source", en: "Source code" };
const DEMO: Localized = { fr: "Démonstration en ligne", en: "Online demo" };

export const projects: ProjectSource[] = [
  {
    slug: "rbs",
    title: { fr: "Vulgarisation de Rubik's Cube", en: "Rubik's Cube Vulgarization" },
    summary: {
      fr: "Solveur de Rubik's Cube en ligne, vulgarisation de la théorie des graphes et algorithmes de résolution.",
      en: "Online Rubik's Cube solver, vulgarizing graph theory and solving algorithms.",
    },
    details: {
      fr: "Mini projet : interface web pour calcul de la solution et affichage du chemin de résolution.",
      en: "Mini project: web interface to compute the solution and display the solving path.",
    },
    period: { fr: "Août / Septembre 2026", en: "August / September 2026" },
    sortKey: 2026,
    context: { fr: "Mini projet", en: "Mini project" },
    category: "Web",
    tags: ["JavaScript", "Graphes", "Algorithmes"],
    status: "termine",
    links: [
      {
        label: DEMO,
        href: "https://justinsillou.github.io/rubiks-graph-solver/",
      },
    ],
  },

  {
    slug: "site-perso",
    title: { fr: "Site personnel", en: "Personal website" },
    summary: {
      fr: "Ce site : statique, sobre, sans tracker et sans framework côté client (ou presque).",
      en: "This site: static, plain, no tracker and no client-side framework (or nearly none).",
    },
    details: {
      fr: "Astro + Tailwind, déployé sur GitHub Pages via GitHub Actions. Objectif : des pages légères, lisibles en clair comme en sombre, et un changelog public pour garder une trace des évolutions.",
      en: "Astro + Tailwind, deployed to GitHub Pages through GitHub Actions. The goal: light pages, readable in both light and dark themes, and a public changelog to keep track of what changes.",
    },
    period: { fr: "2026 — en cours", en: "2026 — ongoing" },
    sortKey: 2026,
    context: { fr: "Projet personnel", en: "Personal project" },
    category: "Web",
    tags: ["Astro", "Tailwind", "TypeScript"],
    status: "en-cours",
    links: [
      {
        label: SOURCE_CODE,
        href: "https://github.com/justinsillou/justinsillou.github.io",
      },
    ],
  },

  {
    slug: "villa-henrande",
    title: { fr: "Villa Henrande", en: "Villa Henrande" },
    summary: {
      fr: "Site vitrine d'une location saisonnière dans le Gard, de la mise en page à la mise en ligne.",
      en: "Showcase site for a holiday rental in the Gard, from layout to going live.",
    },
    details: {
      fr: "Présentation du logement, tarifs, galerie photo et formulaire de contact, avec traduction multilingue. Construit sous WordPress et Elementor.",
      en: "Property presentation, rates, photo gallery and contact form, with multilingual translation. Built with WordPress and Elementor.",
    },
    period: { fr: "2026", en: "2026" },
    sortKey: 2026,
    context: { fr: "Projet indépendant", en: "Freelance project" },
    category: "Web",
    tags: ["WordPress", "Elementor", "PHP"],
    status: "termine",
    links: [
      {
        label: { fr: "villahenrande.fr", en: "villahenrande.fr" },
        href: "https://villahenrande.fr",
      },
    ],
  },

  {
    slug: "local-et-toi",
    title: { fr: "Local & Toi", en: "Local & Toi" },
    summary: {
      fr: "Application mobile de mise en relation avec les commerces locaux.",
      en: "Mobile app connecting people with local shops.",
    },
    details: {
      fr: "Projet mené entre le Master MCC de l'IAE Lille et le Master E-Services de l'Université de Lille : maquettes Figma côté conception, application Flutter côté réalisation. Travail en équipe pluridisciplinaire, du cadrage du besoin jusqu'à la démonstration.",
      en: "A joint project between the MCC master's at IAE Lille and the E-Services master's at the University of Lille: Figma mockups on the design side, a Flutter app on the build side. Cross-disciplinary teamwork, from scoping the need to the final demo.",
    },
    period: {
      fr: "sept. 2023 — janv. 2024",
      en: "Sept. 2023 — Jan. 2024",
    },
    sortKey: 2024,
    context: {
      fr: "IAE Lille × Université de Lille",
      en: "IAE Lille × University of Lille",
    },
    category: "Mobile",
    tags: ["Flutter", "Figma", "Mobile"],
    status: "termine",
    links: [
      {
        label: SOURCE_CODE,
        href: "https://github.com/Local-Toi/LocalEtToi",
      },
      {
        label: {
          fr: "Présentation du projet",
          en: "Project presentation",
        },
        href: "https://youtu.be/clvelmQigjA",
      },
    ],
  },

  {
    slug: "projet-tac",
    title: {
      fr: "Application mobile (Projet TAC)",
      en: "Mobile app (TAC project)",
    },
    summary: {
      fr: "Application Android développée dans le cadre du Master.",
      en: "Android app built as part of the master's degree.",
    },
    details: {
      fr: "Développement natif sous Android : navigation entre les écrans, persistance locale des données et intégration d'une API.",
      en: "Native Android development: navigation between screens, local data persistence and integration with an API.",
    },
    period: {
      fr: "sept. 2021 — déc. 2021",
      en: "Sept. 2021 — Dec. 2021",
    },
    sortKey: 2021,
    context: { fr: "Université de Lille", en: "University of Lille" },
    category: "Mobile",
    tags: ["Android", "Java", "Mobile"],
    status: "termine",
  },

  {
    slug: "l-systeme-tortue",
    title: { fr: "L-système et Tortue", en: "L-system and Turtle" },
    summary: {
      fr: "Générateur de fractales par L-systèmes, dessinées en graphisme tortue.",
      en: "Fractal generator based on L-systems, drawn with turtle graphics.",
    },
    details: {
      fr: "Deuxième réalisation en Haskell : réécriture de règles de production, puis interprétation de la chaîne obtenue par une tortue graphique. L'occasion de pratiquer la programmation fonctionnelle pure et la récursivité.",
      en: "A second project in Haskell: rewriting production rules, then interpreting the resulting string with a graphics turtle. A good excuse to practise pure functional programming and recursion.",
    },
    period: { fr: "2021", en: "2021" },
    sortKey: 2021,
    context: { fr: "Université de Lille", en: "University of Lille" },
    category: "Algorithmie",
    tags: ["Haskell", "Fonctionnel"],
    status: "termine",
  },

  {
    slug: "vlive",
    title: { fr: "Vlive", en: "Vlive" },
    summary: {
      fr: "Carte des stations V'Lille alimentée en temps réel par une API ouverte.",
      en: "Map of V'Lille bike stations, fed in real time by an open API.",
    },
    details: {
      fr: "Récupération des données de disponibilité des stations depuis une API publique, puis affichage sur une carte Leaflet avec le détail par station.",
      en: "Fetching station availability from a public API, then displaying it on a Leaflet map with per-station details.",
    },
    period: { fr: "2020", en: "2020" },
    sortKey: 2020,
    context: { fr: "Université de Lille", en: "University of Lille" },
    category: "Web",
    tags: ["JavaScript", "Leaflet", "API"],
    status: "termine",
  },

  {
    slug: "rezozio",
    title: { fr: "Rezozio", en: "Rezozio" },
    summary: {
      fr: "Réseau social minimaliste inspiré de Twitter, en PHP et SQL.",
      en: "Minimal Twitter-like social network, in PHP and SQL.",
    },
    details: {
      fr: "Projet de L2 Informatique : comptes utilisateurs, publication de messages, abonnements et fil d'actualité, avec une base de données relationnelle derrière.",
      en: "Second-year computer science project: user accounts, posting messages, following other users and a news feed, backed by a relational database.",
    },
    period: { fr: "2019", en: "2019" },
    sortKey: 2019,
    context: { fr: "Université de Lille", en: "University of Lille" },
    category: "Web",
    tags: ["PHP", "SQL", "Web"],
    status: "termine",
    links: [
      {
        label: SOURCE_CODE,
        href: "https://github.com/justinsillou/Rezozio",
      },
    ],
  },
];

/** Familles présentes, dans un ordre stable, pour construire les filtres. */
export const projectCategories: ProjectCategory[] = (
  ["Web", "Mobile", "Algorithmie"] as ProjectCategory[]
).filter((category) =>
  projects.some((project) => project.category === category),
);

/** Étiquette de filtre pour chaque famille, par langue. */
export const categoryKeys: Record<ProjectCategory, string> = {
  Web: "projects.category.web",
  Mobile: "projects.category.mobile",
  Algorithmie: "projects.category.algorithms",
};

/** Projets du plus récent au plus ancien, dans la langue demandée. */
export function getProjects(lang: Lang): Project[] {
  return [...projects]
    .sort((a, b) => b.sortKey - a.sortKey)
    .map((project) => ({
      slug: project.slug,
      title: project.title[lang],
      summary: project.summary[lang],
      details: project.details?.[lang],
      period: project.period[lang],
      sortKey: project.sortKey,
      context: project.context[lang],
      category: project.category,
      tags: project.tags,
      status: project.status,
      links: project.links?.map((link) => ({
        label: link.label[lang],
        href: link.href,
      })),
    }));
}
