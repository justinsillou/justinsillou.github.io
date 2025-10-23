// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://justinsillou.github.io',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact()],
})