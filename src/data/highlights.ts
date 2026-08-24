/**
 * « À la une » — ce que je veux mettre en avant sur la page d'accueil.
 *
 * Rien d'automatique ici : c'est une sélection manuelle, à réordonner ou
 * vider selon l'envie. Un tableau vide masque simplement le raccourci.
 *
 * Les `href` internes s'écrivent en chemin canonique (celui du français) :
 * le composant les préfixe pour la langue courante.
 */

import type { Lang } from "../i18n/utils";

export type Highlight = {
  label: string;
  /** Une ligne de contexte, optionnelle. */
  detail?: string;
  href: string;
  /** Ouvre dans un nouvel onglet et affiche la flèche. */
  external?: boolean;
};

export const highlightsByLang: Record<Lang, Highlight[]> = {
  fr: [
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
  ],

  en: [
    {
      label: "Data breaches in France",
      detail: "A tracked post, refreshed every morning",
      href: "/blog/fuites-de-donnees-france",
    },
    {
      label: "Rebuilding this site",
      detail: "Astro, static, no tracker — the release log",
      href: "/changelog",
    },
    {
      label: "The site's source code",
      detail: "Everything is open, including the mistakes",
      href: "https://github.com/justinsillou/justinsillou.github.io",
      external: true,
    },
  ],
};

export function getHighlights(lang: Lang): Highlight[] {
  return highlightsByLang[lang] ?? highlightsByLang.fr;
}
