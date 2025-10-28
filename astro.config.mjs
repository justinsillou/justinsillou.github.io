// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap';
import Sonda from 'sonda/astro';

import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://justinsillou.github.io',

  darkMode: "class",

  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true
    }
  },

  integrations: [preact(), sitemap(), Sonda()]
})