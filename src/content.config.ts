import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

/**
 * Blog.
 *
 * Un article = un fichier Markdown dans `src/content/blog/`.
 * Le nom du fichier devient l'URL : `fuites-de-donnees-france.md`
 * → `/blog/fuites-de-donnees-france`.
 *
 * Ce format est volontairement simple : un script peut ajouter ou
 * mettre à jour un fichier (alimentation semi-automatique) sans rien
 * connaître du reste du site.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Article « vivant », mis à jour au fil de l'actualité. */
    evergreen: z.boolean().default(false),
    /** Bloc de données affiché sous l'article. */
    widget: z.enum(["leaks"]).optional(),
    /**
     * Transparence sur l'usage d'outils d'IA pour cet article.
     * Non renseigné = rien n'est affiché. C'est une déclaration, pas une
     * mesure : aucun détecteur ne sait faire ce calcul de façon fiable.
     */
    ai: z
      .enum(["none", "research", "editing", "drafting"])
      .optional(),
    sources: z
      .array(
        z.object({
          label: z.string(),
          href: z.url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { blog };
