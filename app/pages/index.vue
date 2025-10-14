<script setup lang="ts">
definePageMeta({
  layout: "padded",
});
// TODO: make this a toggle button and query parameter
const showDeleted = ref(true);

const { workshops, fetchAllSSR, fetchAll } = useWorkshops();

const updateWorkshops = async () => {
  const { data } = await fetchAllSSR(showDeleted.value);
  workshops.value = data.value || [];
};
await updateWorkshops();

watch(showDeleted, async () => {
  fetchAll();
});

const editWorkshop = (id: string) => {
  console.log("Edit workshop:", id);
};

const gotoWorkshop = (id: string) => {
  console.log("Goto workshop:", id);
};

const deleteWorkshop = (id: string) => {
  console.log("Delete workshop:", id);
};
</script>

<template>
  <UContainer>
    <h1 class="page-heading">Default Workshopping Section</h1>
    <div class="flex flex-row align-center gap-16">
      <div class="w-2/3">
        <h2 class="text-2xl font-bold mb-3">Document Workshops</h2>
        <div class="flex flex-row align-center gap-2 mb-3">
          <span>Show Deleted</span>
          <USwitch v-model="showDeleted" />
        </div>
        <WorkshopList
          :workshops="workshops"
          @edit="editWorkshop"
          @goto="gotoWorkshop"
          @delete="deleteWorkshop"
        />
        <UButton class="mt-4" to="/create">Create Workshop</UButton>
      </div>
      <div class="w-1/3">
        <h2 class="text-2xl font-bold">Recent Activity</h2>
        <p>No activity available</p>
      </div>
    </div>
  </UContainer>
</template>
