// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        'assets/fonts/fonts.css',
    ],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
      },
    runtimeConfig: {
        openaiKey: process.env.NUXT_OPENAI_KEY,
    }
})