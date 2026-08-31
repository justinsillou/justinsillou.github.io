/**
 * Page /now — ce que je fais en ce moment.
 *
 * Une seule chose à mettre à jour ici : ce fichier.
 * Pense à changer `nowUpdatedAt` à chaque édition, l'indicateur de
 * fraîcheur de la page est calculé à partir de cette date.
 *
 * Le contenu existe dans les deux langues du site : ajouter une entrée
 * demande de la traduire dans `nowByLang.en` aussi.
 */

import type { Lang } from "../i18n/utils";

export type NowSection = {
  title: string;
  /** Court texte d'intro, optionnel. */
  intro?: string;
  items: NowItem[];
};

export type NowItem = {
  label: string;
  detail?: string;
  /** Chemin canonique (celui du français), préfixé à l'affichage. */
  author?: string;
  href?: string;
};

export type NowContent = {
  intro: string;
  location: string;
  sections: NowSection[];
};

/** Format ISO (AAAA-MM-JJ). Commun aux deux langues. */
export const nowUpdatedAt = "2026-08-28";

export const nowByLang: Record<Lang, NowContent> = {
  fr: {
    intro:
      "Une page /now, c'est ce que je ferais si on se croisait aujourd'hui et que tu me demandais « tu deviens quoi ? ». Rien de plus, rien de moins.",

    location: "Lille, Hauts-de-France",

    sections: [
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
          {
            label: "The Hobbit",
            detail: "(re) lecture cette fois ci en version originale",
          },
          {
            label: "Sur la piste du bonheur",
            author: "Ludovic Fleche",
            detail:
              "Amis runners ce livre est fait pour vous",
          },
          {
            label: "Docker Deep Dive",
            author: "Nigel Plouton",
            detail: "Lecture de la version 2025 restée de coté quelques temps",
          },
        ],
      },

      {
        title: "Écoutes",
        items: [
          {
            label: "David Bowie",
            detail: "Histoire de compléter un peu sa discographie",
          },
          { label: "System of a Down", detail: "Pour se défouler un peu" },
        ],
      },

      {
        title: "À côté",
        items: [
          { label: "Course à pied, randonnée, escalade" },
          { label: "Échecs et jeux de société" },
        ],
      },
    ],
  },

  en: {
    intro:
      "A /now page is what I would tell you if we ran into each other today and you asked me « so, what are you up to? ». Nothing more, nothing less.",

    location: "Lille, Hauts-de-France, France",

    sections: [
      {
        title: "Work",
        items: [
          {
            label: "Back-end developer at Promatec",
            detail:
              "Internal tools, APIs and development of the MailSecure product.",
          },
        ],
      },

      {
        title: "Side project",
        items: [
          {
            label: "Rebuilding this site",
            detail:
              "Started over from scratch: static, light, no tracker. Every change is listed in the changelog.",
            href: "/changelog",
          },
          {
            label: "Keeping an eye on data breaches",
            detail:
              "Tracking what leaks in France, and turning it into posts on the blog.",
            href: "/blog",
          },
        ],
      },

      {
        title: "Reading",
        intro: "In progress or on the pile.",
        items: [
          {
            label: "The Hobbit",
            detail: "A re-read, this time in the original English",
          },
          {
            label: "Sur la piste du bonheur",
            author: "Ludovic Fleche",
            detail:
              "Fellow runners, this one is for you",
          },
          {
            label: "Docker Deep Dive",
            author: "Nigel Plouton",
            detail: "Reading the 2025 edition, which had been sitting on the shelf for a while",
          },
        ],
      },

      {
        title: "Listening",
        items: [
          {
            label: "David Bowie",
            detail: "Filling in the gaps in his discography",
          },
          { label: "System of a Down", detail: "To let off some steam" },
        ],
      },

      {
        title: "On the side",
        items: [
          { label: "Running, hiking, climbing" },
          { label: "Chess and board games" },
        ],
      },
    ],
  },
};

export function getNow(lang: Lang): NowContent {
  return nowByLang[lang] ?? nowByLang.fr;
}
