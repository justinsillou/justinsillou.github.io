// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap';

import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://justinsillou.github.io',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact(), sitemap()],
  middleware: ['./src/middleware.ts']
})