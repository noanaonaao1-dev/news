import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://news-8ea.pages.dev',
  integrations: [tailwind()],
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file'
  }
});
