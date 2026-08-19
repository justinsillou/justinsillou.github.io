import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

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
});