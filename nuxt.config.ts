// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // "nuxt-monaco-editor",
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth"
  ],
  app: {
    head: {
      charset: 'utf-8',
      title: 'Drodmin',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
      ]
    },
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs'
    }
  },
  monacoEditor: {
    // These are default values:
    locale: 'es',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  }
})