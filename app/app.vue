<!-- Everything added here is global to the entire application -->
<!-- If application is simple and only needs a single page, we can just put it all in this file -->
<template>
  <!-- Allows Nuxt UI to inject its styles, modals, etc. into our entire app -->
  <UApp>
    <!-- Will tell screen readers what route is currently active and when it has changed-->
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>
