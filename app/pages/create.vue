<script setup lang="ts">
definePageMeta({
  layout: "padded",
});

interface WorkshopForm {
  title: string;
  description: string;
  document: string;
}

const form = ref<WorkshopForm>({
  title: "",
  description: "",
  document: "",
});

// TODO: implement validation with form schema

const isSubmitting = ref(false);
const isPublishing = ref(false);

const onSubmit = async () => {
  isSubmitting.value = true;

  try {
    // TODO: Implement API call to save workshop
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle form submission
    console.log("Saving workshop:", form.value);

    // Show success message
    const toast = useToast();
    toast.add({
      title: "Workshop saved successfully!",
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
  isPublishing.value = true;

  try {
    // TODO: Implement API call to publish workshop
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Handle publishing
    console.log("Publishing workshop:", form.value);

    // Show success message
    const toast = useToast();
    toast.add({
      title: "Workshop published successfully!",
      color: "success",
    });
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
      <h1 class="page-heading">Create a New Workshop</h1>
      <UButton
        color="secondary"
        variant="outline"
        class="align-left mb-3"
        size="lg"
        to="/"
      >
        <Icon name="mdi:arrow-left" />
        <Icon name="mdi:home" />
      </UButton>

      <UCard class="p-6">
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

          <!-- Workshop Document Input -->
          <UFormField label="Workshop Document" required>
            <UTextarea
              v-model="form.document"
              class="w-full"
              placeholder="Enter workshop document content"
              :rows="24"
            />
          </UFormField>

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
              Save
            </UButton>

            <UButton
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
        </UForm>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped></style>
