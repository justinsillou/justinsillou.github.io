export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCategory = "Web" | "Mobile" | "Algorithmie";

export type Project = {
  slug: string;
  title: string;
  /** Une phrase, affichée dans la carte. */
  summary: string;
  /** Détail affiché quand la carte est dépliée. */
  details?: string;
  /** Année ou période affichée. Sert aussi au tri (via `sortKey`). */
  period: string;
  /** Année de fin, pour trier du plus récent au plus ancien. */
  sortKey: number;
  context: string;
  /** Sert de filtre sur la page : on garde volontairement peu de familles. */
  category: ProjectCategory;
  tags: string[];
  status: "termine" | "en-cours";
  links?: ProjectLink[];
};

/**
 * Projets personnels et universitaires.
 *
 * Les projets professionnels vivent dans `src/data/cv.ts`
 * (ils sont rattachés à une expérience).
 */
export const projects: Project[] = [
  {
    slug: "site-perso",
    title: "Site personnel",
    summary:
      "Ce site : statique, sobre, sans tracker et sans framework côté client (ou presque).",
    details:
      "Astro + Tailwind, déployé sur GitHub Pages via GitHub Actions. Objectif : des pages légères, lisibles en clair comme en sombre, et un changelog public pour garder une trace des évolutions.",
    period: "2026 — en cours",
    sortKey: 2026,
    context: "Projet personnel",
    category: "Web",
    tags: ["Astro", "Tailwind", "TypeScript"],
    status: "en-cours",
    links: [
      {
        label: "Code source",
        href: "https://github.com/justinsillou/justinsillou.github.io",
      },
    ],
  },

  {
    slug: "villa-henrande",
    title: "Villa Henrande",
    summary:
      "Site vitrine d'une location saisonnière dans le Gard, de la mise en page à la mise en ligne.",
    details:
      "Présentation du logement, tarifs, galerie photo et formulaire de contact, avec traduction multilingue. Construit sous WordPress et Elementor.",
    period: "2026",
    sortKey: 2026,
    context: "Projet indépendant",
    category: "Web",
    tags: ["WordPress", "Elementor", "PHP"],
    status: "termine",
    links: [
      {
        label: "villahenrande.fr",
        href: "https://villahenrande.fr",
      },
    ],
  },

  {
    slug: "local-et-toi",
    title: "Local & Toi",
    summary:
      "Application mobile de mise en relation avec les commerces locaux.",
    details:
      "Projet mené entre le Master MCC de l'IAE Lille et le Master E-Services de l'Université de Lille : maquettes Figma côté conception, application Flutter côté réalisation. Travail en équipe pluridisciplinaire, du cadrage du besoin jusqu'à la démonstration.",
    period: "sept. 2023 — janv. 2024",
    sortKey: 2024,
    context: "IAE Lille × Université de Lille",
    category: "Mobile",
    tags: ["Flutter", "Figma", "Mobile"],
    status: "termine",
  },

  {
    slug: "projet-tac",
    title: "Application mobile (Projet TAC)",
    summary: "Application Android développée dans le cadre du Master.",
    details:
      "Développement natif sous Android : navigation entre les écrans, persistance locale des données et intégration d'une API.",
    period: "sept. 2021 — déc. 2021",
    sortKey: 2021,
    context: "Université de Lille",
    category: "Mobile",
    tags: ["Android", "Java", "Mobile"],
    status: "termine",
  },

  {
    slug: "l-systeme-tortue",
    title: "L-système et Tortue",
    summary:
      "Générateur de fractales par L-systèmes, dessinées en graphisme tortue.",
    details:
      "Deuxième réalisation en Haskell : réécriture de règles de production, puis interprétation de la chaîne obtenue par une tortue graphique. L'occasion de pratiquer la programmation fonctionnelle pure et la récursivité.",
    period: "2021",
    sortKey: 2021,
    context: "Université de Lille",
    category: "Algorithmie",
    tags: ["Haskell", "Fonctionnel"],
    status: "termine",
  },

  {
    slug: "vlive",
    title: "Vlive",
    summary:
      "Carte des stations V'Lille alimentée en temps réel par une API ouverte.",
    details:
      "Récupération des données de disponibilité des stations depuis une API publique, puis affichage sur une carte Leaflet avec le détail par station.",
    period: "2020",
    sortKey: 2020,
    context: "Université de Lille",
    category: "Web",
    tags: ["JavaScript", "Leaflet", "API"],
    status: "termine",
  },

  {
    slug: "rezozio",
    title: "Rezozio",
    summary:
      "Réseau social minimaliste inspiré de Twitter, en PHP et SQL.",
    details:
      "Projet de L2 Informatique : comptes utilisateurs, publication de messages, abonnements et fil d'actualité, avec une base de données relationnelle derrière.",
    period: "2019",
    sortKey: 2019,
    context: "Université de Lille",
    category: "Web",
    tags: ["PHP", "SQL", "Web"],
    status: "termine",
  },
];

/** Familles présentes, dans un ordre stable, pour construire les filtres. */
export const projectCategories: ProjectCategory[] = (
  ["Web", "Mobile", "Algorithmie"] as ProjectCategory[]
).filter((category) =>
  projects.some((project) => project.category === category),
);

/** Projets du plus récent au plus ancien. */
export const projectsByDate = [...projects].sort(
  (a, b) => b.sortKey - a.sortKey,
);
