/**
 * « À la une » — ce que je veux mettre en avant sur la page d'accueil.
 *
 * Rien d'automatique ici : c'est une sélection manuelle, à réordonner ou
 * vider selon l'envie. Un tableau vide masque simplement le raccourci.
 */

export type Highlight = {
  label: string;
  /** Une ligne de contexte, optionnelle. */
  detail?: string;
  href: string;
  /** Ouvre dans un nouvel onglet et affiche la flèche. */
  external?: boolean;
};

export const highlights: Highlight[] = [
  {
    label: "Fuites de données en France",
    detail: "Article suivi, mis à jour chaque matin",
    href: "/blog/fuites-de-donnees-france",
  },
  {
    label: "Refonte de ce site",
    detail: "Astro, statique, sans tracker — le journal des versions",
    href: "/changelog",
  },
  {
    label: "Le code du site",
    detail: "Tout est ouvert, y compris les ratés",
    href: "https://github.com/justinsillou/justinsillou.github.io",
    external: true,
  },
];
