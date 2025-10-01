// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils",
    "@nuxt/ui",
    // "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    // map all private variables from the environment here

    public: {
      // insert any public variables exposed to the client here
    },
  },
});
