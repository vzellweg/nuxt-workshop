<template>
  <UContainer>
    <h1 class="text-4xl text-center mb-12">Default Workshopping Section</h1>
    <div class="flex flex-row align-center">
      <div class="w-3/4">
        <h2 class="text-2xl font-bold">Document Workshops</h2>
        <p>No workshops available</p>
        <UButton class="mt-4" to="/create">Create Workshop</UButton>
      </div>
      <div class="w-1/4">
        <h2 class="text-2xl font-bold">Recent Activity</h2>
        <p>No activity available</p>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts"></script>
