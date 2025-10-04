<script setup lang="ts">
import type { Workshop } from "~/types";
defineProps<{
  workshops: Workshop[];
}>();

const emits = defineEmits(["edit", "goto", "delete"]);
</script>
<template>
  <WorkshopListItem
    v-for="(workshop, index) in workshops"
    :key="workshop.id"
    :is-first="index === 0"
    :is-last="index === workshops.length - 1"
    :workshop="workshop"
    @edit="emits('edit', workshop.id)"
    @goto="emits('goto', workshop.id)"
    @delete="emits('delete', workshop.id)"
  />
  <div v-if="workshops.length === 0">No workshops available</div>
</template>

<style scoped></style>
