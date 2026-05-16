import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
    prerender: {
      entries: ['*'],
      handleHttpError: 'warn'
    },
    alias: {
      $components: 'src/lib/components',
      $styles: 'src/lib/styles'
    }
  }
};

export default config;
