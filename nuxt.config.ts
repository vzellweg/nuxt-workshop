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
    // define all private variables from the environment at the root level of this property
    /** @example
     * Below will be overridden by the .env file variable NUXT_OPENAI_API_KEY
     * openaiApiKey: '',
     * So anything that is public (stored int the repository) can be defined in this `runtimeConfig`, but private variables should be defined in the .env file.
     */
    public: {
      // insert any public variables exposed to the client here
    },
  },
});
