<!-- TODO: add delete button -->
<!-- TODO: edit and delete buttons should only be shown if the user is the owner of the workshop -->
<script setup lang="ts">
const { workshop } = defineProps<{
  isFirst: boolean;
  isLast: boolean;
  workshop: Workshop;
}>();

const emits = defineEmits(["goto", "edit", "delete"]);

const { formatDate } = useDateFormat();
</script>

<template>
  <div
    class="p-4 border border-(--ui-border-muted) bg-(--ui-bg-muted) hover:bg-(--ui-bg-subtle) transition-colors duration-200 cursor-pointer"
    :class="{
      'rounded-t-lg': isFirst,
      'rounded-b-lg': isLast,
    }"
    @click="emits('goto', workshop.id)"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-medium truncate">
          <span class="align-middle me-3">{{ workshop.title }}</span>
          <UButton
            v-if="!workshop.isPublished"
            variant="ghost"
            size="sm"
            icon="mdi:file-edit"
            class="align-middle text-gray-500 hover:text-gray-700 cursor-pointer"
            @click="() => emits('edit', workshop.id)"
          />
        </h3>
        <div class="mt-1">
          <span class="text-sm text-(--ui-text-muted)">
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
        <div class="text-xs mt-3 text-(--ui-text-muted)">
          Updated {{ formatDate(workshop.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
