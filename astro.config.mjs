import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

export default defineConfig({
  site: 'https://justinsillou.github.io',

  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false, // /  = fr, /en/ = anglais
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});