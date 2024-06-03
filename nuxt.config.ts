// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  app: {
    head: {
      charset: 'utf-8',
      title: 'Drodmin',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs'
    }
  }
})