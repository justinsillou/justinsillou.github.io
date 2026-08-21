/**
 * Page /now — ce que je fais en ce moment.
 *
 * Une seule chose à mettre à jour ici : ce fichier.
 * Pense à changer `nowUpdatedAt` à chaque édition, l'indicateur de
 * fraîcheur de la page est calculé à partir de cette date.
 *
 */

export type NowSection = {
  title: string;
  /** Court texte d'intro, optionnel. */
  intro?: string;
  items: NowItem[];
};

export type NowItem = {
  label: string;
  detail?: string;
  href?: string;
};

/** Format ISO (AAAA-MM-JJ). */
export const nowUpdatedAt = "2026-08-22";

export const nowLocation = "Lille, Hauts-de-France";

export const nowIntro =
  "Une page /now, c'est ce que je ferais si on se croisait aujourd'hui et que tu me demandais « tu deviens quoi ? ». Rien de plus, rien de moins.";

export const nowSections: NowSection[] = [
  {
    title: "Travail",
    items: [
      {
        label: "Développeur back-end chez Promatec",
        detail:
          "Outils internes, API et développement de la solution MailSecure.",
      },
    ],
  },

  {
    title: "Side project",
    items: [
      {
        label: "Refonte de ce site",
        detail:
          "Reparti de zéro : statique, léger, sans tracker. Les évolutions sont listées dans le changelog.",
        href: "/changelog",
      },
      {
        label: "Une veille sur les fuites de données",
        detail:
          "Suivre ce qui fuite en France, et en tirer des billets sur le blog.",
        href: "/blog",
      },
    ],
  },

  {
    title: "Lectures",
    intro: "En cours ou sur la pile.",
    items: [
      { label: "The Hobbit", detail: "(re) lecture cette fois ci en version originale" },
      { label: "Sur la piste du bonheur", detail: "Second livre de Ludovic Fleche, amis runners ce livre est fait pour vous" },
    ],
  },

  {
    title: "Écoutes",
    items: [
      { label: "David Bowie", detail: "Histoire de compléter un peu sa discographie" },
      { label: "System of a Down", detail: "Pour se défouler un peu" }
    ],
  },

  {
    title: "À côté",
    items: [
      { label: "Course à pied, randonnée, escalade" },
      { label: "Échecs et jeux de société" },
    ],
  },
];
