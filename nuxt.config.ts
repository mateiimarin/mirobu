// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/ui'],
    runtimeConfig: {
        openAiApiKey: process.env.NUXT_OPEN_AI_API_KEY,
    },
    css: [
        'assets/css/flat-icon.css',
        'assets/css/styles.css'
    ],
    colorMode: {
        preference: 'light'
    },
})
