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
        <UButton
          variant="ghost"
          to="/"
          class="text-xl font-semibold p-0 h-auto text-gray-900 dark:text-gray-100"
        >
          Workshopping Platform
        </UButton>
      </template>

      <template #right>
        <UButton
          variant="ghost"
          size="sm"
          to="/login"
          class="h-8 w-8 rounded-full p-0"
        >
          <USkeleton class="h-8 w-8 rounded-full" />
        </UButton>
      </template>
    </UHeader>

    <UMain class="flex-1 flex flex-col">
      <div class="flex-1">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
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
