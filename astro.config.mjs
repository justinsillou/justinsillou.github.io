import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://justinsillou.github.io',

  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
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
    }),
  ],
});