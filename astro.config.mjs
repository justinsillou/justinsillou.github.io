import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

/**
 * Langues du site, déclarées une seule fois.
 *
 * `src/i18n/ui.ts` en est le miroir côté application : les deux listes doivent
 * rester alignées.
 */
const DEFAULT_LOCALE = "fr";

const LOCALES = {
  fr: "fr-FR",
  en: "en-GB",
};

export default defineConfig({
  site: 'https://justinsillou.github.io',

  // Le routage est fait à la main, par la route `src/pages/[...locale]/` : un
  // seul gabarit produit `/now` et `/en/now`. Ce bloc reste la déclaration de
  // référence des locales (il alimente `Astro.currentLocale` et les
  // intégrations qui le lisent), il ne génère pas les routes lui-même.
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: Object.keys(LOCALES),
    routing: {
      prefixDefaultLocale: false, // /  = fr, /en/ = anglais
    },
  },

  markdown: {
    // Deux thèmes de coloration : Shiki émet des variables CSS pour chacun,
    // le choix se fait dans global.css selon le thème du site.
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),

    sitemap({
      // La 404 n'a rien à faire dans un plan de site.
      filter: (page) => !page.includes("/404"),

      // Déclare les alternances de langue dans le plan du site, en accord avec
      // les `<link rel="alternate" hreflang>` du `<head>`.
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: LOCALES,
      },
    }),
  ],
});
