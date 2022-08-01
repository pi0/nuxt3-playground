import { cp } from 'fs/promises';
import { defineNuxtConfig } from 'nuxt';
import { fileURLToPath } from 'url';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  hooks: {
    'nitro:init': (nitro) => {
      nitro.hooks.hook('compiled', async () => {
        const internalURL = fileURLToPath(
          new URL('./.netlify', import.meta.url),
        );
        const destination = fileURLToPath(new URL('dist', import.meta.url));
        await cp(internalURL, destination, { recursive: true });
      });
    },
  },
});
