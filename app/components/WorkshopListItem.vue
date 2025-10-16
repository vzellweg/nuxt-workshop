<script setup lang="ts">
import type { Workshop } from "~/types";

const { workshop } = defineProps<{
  isFirst: boolean;
  isLast: boolean;
  workshop: Workshop;
}>();
</script>

<template>
  <div
    class="p-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200"
    :class="{
      'rounded-t-lg': isFirst,
      'rounded-b-lg': isLast,
    }"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-medium text-gray-900 truncate">
          <span class="align-middle me-3">{{ workshop.title }}</span>
          <UButton
            v-if="!workshop.isPublished"
            variant="ghost"
            size="sm"
            icon="mdi:file-edit"
            class="align-middle text-gray-500 hover:text-gray-700 cursor-pointer"
            @click="() => console.log('Edit workshop:', workshop.id)"
          />
        </h3>
        <div class="mt-1">
          <span class="text-sm text-gray-500">
            {{ workshop.ownerId || "Unknown author" }}
          </span>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <div>
          <span
            v-if="workshop.isDeleted"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error text-error-100"
          >
            Deleted
          </span>
          <span
            v-else-if="workshop.isPublished"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-success-800"
          >
            Published
          </span>
          <span
            v-else
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning text-warning-800"
          >
            Unpublished
          </span>
        </div>
        <div class="text-xs mt-3 text-gray-400">
          Updated {{ new Date(workshop.updatedAt).toLocaleDateString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
