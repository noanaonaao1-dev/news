import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://news-8ea.pages.dev',
  integrations: [tailwind()],
  output: 'static',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: 'compile',
  }),
  trailingSlash: 'never',
  build: {
    format: 'file'
  }
});
