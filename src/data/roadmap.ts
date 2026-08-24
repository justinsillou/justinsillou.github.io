import type { Lang } from "../i18n/utils";

/**
 * « À venir » — la colonne affichée en regard du changelog.
 *
 * Le changelog dit ce qui est fait, cette liste dit ce qui vient. Les deux se
 * tiennent : **quand une idée est livrée, on la retire d'ici et on l'écrit
 * dans `changelog.ts`**. Pas de case à cocher, pas d'historique en double —
 * une ligne qui disparaît d'un côté réapparaît de l'autre.
 *
 * `soon` distingue le prochain lot du reste : ce qui n'est pas marqué s'affiche
 * en retrait, sans disparaître. Une idée qui traîne se démarque plutôt que de
 * polluer la liste.
 */

/** Un texte dans les deux langues du site. */
export type Localized = Record<Lang, string>;

export type RoadmapItem = {
  label: Localized;
  /** Prévu dans un avenir proche. Le reste s'affiche en retrait. */
  soon?: boolean;
};

export const roadmap: RoadmapItem[] = [
  {
    label: { fr: "Nouvel article de blog", en: "New blog post" },
    soon: true,
  },
  {
    label: {
      fr: "Mode nuit : clair / nuit / sombre",
      en: "Night mode: light / night / dark",
    },
    soon: true,
  },
  {
    label: {
      fr: "Mode lecture sur le blog",
      en: "Reading mode on the blog",
    },
    soon: true,
  },
  {
    label: {
      fr: "Accessibilité : audit et corrections",
      en: "Accessibility: audit and fixes",
    },
    soon: true,
  },
];

/** La feuille de route dans une seule langue, le prochain lot en tête. */
export function getRoadmap(lang: Lang) {
  return [...roadmap]
    .sort((a, b) => Number(b.soon ?? false) - Number(a.soon ?? false))
    .map((item) => ({
      label: item.label[lang] ?? item.label.fr,
      soon: item.soon ?? false,
    }));
}
