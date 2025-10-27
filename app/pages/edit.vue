<script setup lang="ts">
/**
 * Edit Workshop Page
 * This page is pretty clunky as it was quickly ported from the old options api
 * page.
 * @todo: utilize Nuxt Data Fetching techniques to clean up the initialization of editor
 * @todo: related to above, use the useEditor composable to clean up the initialization of editor and avoid usage of the mounted hook
 * @todo: make sure validation works correctly for all fields, and the validation messages are displayed correctly and consistently for both the form and the editor
 */
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";

definePageMeta({
  layout: "padded",
});

interface WorkshopForm {
  title: string;
  description: string;
}

const route = useRoute();
const workshopId = computed(() => route.query.id as string | undefined);
const isEditMode = computed(() => !!workshopId.value);

const form = ref<WorkshopForm>({
  title: "",
  description: "",
});

// TODO: implement validation with form schema

const isSubmitting = ref(false);
const isPublishing = ref(false);
const isLoading = ref(false);
const existingWorkshop = ref<Workshop | null>(null);
const lastSaved = ref<Date | null>(null);

// TipTap editor setup
const editor = ref<Editor | null>(null);
const isEditorEmpty = ref(false);

const { createWorkshop, getWorkshop, updateWorkshop } = useWorkshops();

// Format last saved timestamp
const { formatRelative } = useDateFormat();
const lastSavedText = computed(() => {
  if (!lastSaved.value) return null;
  return `Last saved ${formatRelative(lastSaved.value.toISOString())}`;
});

// Load existing workshop if ID is provided
const loadWorkshop = async () => {
  if (!workshopId.value) return;

  isLoading.value = true;
  try {
    const workshop = await getWorkshop(workshopId.value);
    existingWorkshop.value = workshop;

    // Populate form fields
    form.value.title = workshop.title;
    form.value.description = workshop.description;

    // Load content into editor
    if (workshop.draftJson && editor.value) {
      const content =
        typeof workshop.draftJson === "string"
          ? JSON.parse(workshop.draftJson)
          : workshop.draftJson;
      editor.value.commands.setContent(content);
    }

    // Set last saved time to workshop's updatedAt
    lastSaved.value = new Date(workshop.updatedAt);
  } catch (error) {
    console.error("Error loading workshop:", error);
    const toast = useToast();
    toast.add({
      title: "Error loading workshop",
      description: "Could not load workshop data",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  editor.value = new Editor({
    extensions: [StarterKit, TextStyle],
    editable: true,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      isEditorEmpty.value = json.content.length === 0;
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none p-4 focus:outline-none min-h-[400px]",
      },
    },
  });

  // Load workshop data if editing
  await loadWorkshop();
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

// Validate if editor content is empty
const isContentEmpty = () => {
  if (!editor.value) return true;
  const json = editor.value.getJSON();
  const content = json.content;

  if (!content || content.length === 0) return true;

  return content.every((node: Record<string, unknown>) => {
    if (node.type === "paragraph") {
      const nodeContent = node.content as Record<string, unknown>[] | undefined;
      return (
        !nodeContent ||
        nodeContent.every((child: Record<string, unknown>) => {
          return child.type === "text" && !(child.text as string)?.trim();
        })
      );
    }
    return false;
  });
};

const onSubmit = async () => {
  // Validate content
  if (isContentEmpty()) {
    isEditorEmpty.value = true;
    const toast = useToast();
    toast.add({
      title: "Content is required",
      description: "Please enter workshop content",
      color: "error",
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const content = editor.value?.getJSON();

    if (!content) {
      throw new Error("Failed to get editor content");
    }

    if (existingWorkshop.value) {
      // Update existing workshop
      const updated = await updateWorkshop({
        ...existingWorkshop.value,
        title: form.value.title,
        description: form.value.description,
        draftJson: content,
      });
      existingWorkshop.value = updated;
    } else {
      // Create new workshop
      const created = await createWorkshop(
        form.value.title,
        form.value.description,
        content
      );
      existingWorkshop.value = created;
      // Update URL to reflect we're now editing this workshop
      await navigateTo(`/edit?id=${created.id}`, { replace: true });
    }

    // Update last saved timestamp
    lastSaved.value = new Date();

    // Show success message
    const toast = useToast();
    toast.add({
      title: existingWorkshop.value
        ? "Workshop updated successfully!"
        : "Workshop saved successfully!",
      color: "success",
    });
  } catch (error) {
    console.error("Error saving workshop:", error);
    const toast = useToast();
    toast.add({
      title: "Error saving workshop",
      description: "Please try again",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const publishWorkshop = async () => {
  // Validate content
  if (isContentEmpty()) {
    isEditorEmpty.value = true;
    const toast = useToast();
    toast.add({
      title: "Content is required",
      description: "Please enter workshop content before publishing",
      color: "error",
    });
    return;
  }

  isPublishing.value = true;

  try {
    const content = editor.value?.getJSON();

    if (!content) {
      throw new Error("Failed to get editor content");
    }

    if (existingWorkshop.value) {
      // Update and publish existing workshop
      await updateWorkshop({
        ...existingWorkshop.value,
        title: form.value.title,
        description: form.value.description,
        draftJson: content,
        publishedJson: content,
        isPublished: true,
      });
    } else {
      // Create and publish new workshop
      await createWorkshop(
        form.value.title,
        form.value.description,
        content,
        "document",
        true // published = true
      );
    }

    // Show success message
    const toast = useToast();
    toast.add({
      title: "Workshop published successfully!",
      color: "success",
    });

    // Navigate to home page only on publish
    await navigateTo("/");
  } catch (error) {
    console.error("Error publishing workshop:", error);
    const toast = useToast();
    toast.add({
      title: "Error publishing workshop",
      description: "Please try again",
      color: "error",
    });
  } finally {
    isPublishing.value = false;
  }
};
</script>

<template>
  <UContainer>
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="page-heading">
            {{ isEditMode ? "Edit Workshop" : "Create Workshop" }}
          </h1>
        </div>
      </div>

      <div class="flex flex-row justify-between items-center">
        <UButton
          color="secondary"
          variant="outline"
          class="align-left"
          size="lg"
          to="/"
        >
          <Icon name="mdi:arrow-left" />
          <Icon name="mdi:home" />
        </UButton>
        <!-- Mode indicator -->
        <div class="mb-2">
          <UBadge v-if="!isEditMode" color="primary" variant="soft">
            <Icon name="mdi:plus-circle" class="mr-1" />
            New Workshop
          </UBadge>
          <UBadge
            v-else-if="existingWorkshop?.isPublished"
            color="success"
            variant="soft"
          >
            <Icon name="mdi:check-circle" class="mr-1" />
            Published
          </UBadge>
          <UBadge v-else color="warning" variant="soft">
            <Icon name="mdi:pencil" class="mr-1" />
            Draft
          </UBadge>
        </div>
      </div>
      <!-- Last saved indicator -->
      <div
        v-if="lastSavedText"
        class="text-sm text-gray-500 italic text-end mb-3"
      >
        {{ lastSavedText }}
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="text-center">
          <Icon name="mdi:loading" class="animate-spin text-4xl mb-2" />
          <p class="text-gray-600">Loading workshop...</p>
        </div>
      </div>

      <UCard v-else class="p-6">
        <UForm :state="form" class="space-y-6" @submit="onSubmit">
          <!-- Title Input -->
          <UFormField label="Title" required>
            <UInput
              v-model="form.title"
              class="w-full"
              placeholder="Enter workshop title"
              size="lg"
            />
          </UFormField>

          <!-- Description Input -->
          <UFormField label="Description" required>
            <UTextarea
              v-model="form.description"
              class="w-full"
              placeholder="Enter workshop description"
              size="lg"
              :rows="4"
            />
          </UFormField>
        </UForm>

        <!-- Workshop Document Editor -->
        <div class="space-y-2 mt-3">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium">
              Workshop Document
              <span class="text-red-500">*</span>
            </label>
          </div>
          <div
            class="border border-(--ui-border-muted) rounded-md"
            :class="{ 'border-red-500': isEditorEmpty }"
          >
            <!-- Toolbar -->
            <div
              class="border-b border-(--ui-border-muted) bg-(--ui-bg-elevated) p-2 flex gap-1 rounded-t-md"
            >
              <UButton
                v-if="editor"
                :class="{
                  'bg-(--ui-bg-inverted) text-(--ui-text-inverted)':
                    editor.isActive('bold'),
                }"
                aria-label="Bold"
                size="sm"
                color="neutral"
                variant="ghost"
                icon="i-heroicons-bold"
                @click="editor.chain().focus().toggleBold().run()"
              />
              <UButton
                v-if="editor"
                :class="{
                  'bg-(--ui-bg-inverted) text-(--ui-text-inverted)':
                    editor.isActive('italic'),
                }"
                aria-label="Italic"
                size="sm"
                color="neutral"
                variant="ghost"
                icon="i-heroicons-italic"
                @click="editor.chain().focus().toggleItalic().run()"
              />
              <UButton
                v-if="editor"
                :class="{
                  'bg-(--ui-bg-inverted) text-(--ui-text-inverted)':
                    editor.isActive('strike'),
                }"
                aria-label="Strikethrough"
                size="sm"
                color="neutral"
                variant="ghost"
                icon="i-heroicons-strikethrough"
                @click="editor.chain().focus().toggleStrike().run()"
              />
            </div>

            <!-- Editor Content -->
            <div v-if="editor">
              <EditorContent :editor="(editor as any)" />
            </div>
          </div>
          <p v-if="isEditorEmpty" class="text-red-500 text-sm">
            Please enter workshop content
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-row justify-between gap-4 pt-6">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
            class=""
            loading-auto
            @click="onSubmit"
          >
            {{ existingWorkshop ? "Save Changes" : "Save Draft" }}
          </UButton>

          <UButton
            v-if="!existingWorkshop?.isPublished"
            color="error"
            variant="solid"
            size="lg"
            class=""
            loading-auto
            @click="publishWorkshop"
          >
            Publish
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped></style>
