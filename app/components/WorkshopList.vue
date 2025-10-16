<script setup lang="ts">
const { workshops } = useWorkshops();
</script>
<template>
  <WorkshopListItem
    v-for="(workshop, index) in workshops"
    :key="workshop.id"
    :is-first="index === 0"
    :is-last="index === workshops.length - 1"
    :workshop="workshop"
  />
  <div v-if="workshops.length === 0">No workshops available</div>
</template>

<style scoped></style>
