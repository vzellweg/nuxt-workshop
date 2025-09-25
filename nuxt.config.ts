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
  // supabase: {
  //   redirectOptions: {
  //     login: "/login",
  //     // TODO: update this when we figure out what the user flow should be
  //     callback: "/confirm",
  //     // Exclude the root route from redirecting to login
  //     exclude: ["/"],
  //   },
  // },
});
