import { defineNuxtConfig } from 'nuxt'
import { execaCommand } from 'execa'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    hooks: {
      async compiled() {
        await execaCommand('tar -cvzf dist/app.tgz --exclude node_modules .')
      }
    }
  }
})
