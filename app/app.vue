<!-- Everything added here is global to the entire application -->
<!-- If application is simple and only needs a single page, we can just put it all in this file -->
<template>
  <!-- Allows Nuxt UI to inject its styles, modals, etc. into our entire app -->
  <UApp>
    <!-- Will tell screen readers what route is currently active and when it has changed-->
    <NuxtRouteAnnouncer />

    <!-- Navbar -->
    <UHeader>
      <template #left>
        <h1 class="text-xl font-semibold">Workshopping Platform</h1>
      </template>

      <template #right>
        <USkeleton class="h-8 w-8 rounded-full" />
      </template>
    </UHeader>

    <UMain class="flex-1 flex flex-col">
      <div class="flex-1 flex flex-col md:px-24 md:py-16 sm:py-8">
        <NuxtPage />
      </div>

      <!-- Show footer at the bottom of the page when no overflowing content is present -->
      <UFooter>
        <template #left>
          <p class="text-muted text-sm">
            Victor Zellweger © {{ new Date().getFullYear() }}
          </p>
        </template>
      </UFooter>
    </UMain>
  </UApp>
</template>
