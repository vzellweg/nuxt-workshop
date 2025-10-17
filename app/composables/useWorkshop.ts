const useWorkshops = () => {
  // TODO: implement actual api calls and database storage
  // TODO: should we make a generic `useResource('/resource')` composable?
  const workshops = ref<Workshop[]>([]);
  const workshop = ref<Workshop | null>(null);
  const loading = ref(false);

  const fetchAll = async () => {
    loading.value = true;
    try {
      const data = await $fetch<Workshop[]>("/api/workshops", {
        method: "GET",
      });
      workshops.value = data;
    } finally {
      loading.value = false;
    }
  };

  const fetchAllSSR = (showDeleted: boolean) => {
    return useAsyncData("workshops", () =>
      $fetch<Workshop[]>("/api/workshops", {
        method: "GET",
        query: {
          showDeleted: showDeleted.toString(),
        },
      })
    );
  };

  const createWorkshop = async (
    title: string,
    description: string,
    content: object,
    // begin optional / default params
    workshopKind: WorkshopKind = "document",
    published?: boolean
  ) => {
    loading.value = true;
    const draftJson = JSON.stringify(content);
    const publishedJson = published ? draftJson : null;

    try {
      const data = await $fetch<Workshop>("/api/workshops", {
        method: "POST",
        body: {
          title,
          description,
          kind: workshopKind,
          slug: null,
          ownerId: "johndoe",
          draftJson,
          publishedJson,
          isPublished: published ?? false,
        },
      });
      await fetchAll();
      return data;
    } finally {
      loading.value = false;
    }
  };

  const getWorkshop = async (id: string) => {
    loading.value = true;
    try {
      const data = await $fetch<Workshop>(`/api/workshops/${id}`, {
        method: "GET",
      });
      workshop.value = data;
      return data;
    } finally {
      loading.value = false;
    }
  };

  const updateWorkshop = async (workshopData: Workshop) => {
    loading.value = true;
    try {
      const data = await $fetch<Workshop>(`/api/workshops/${workshopData.id}`, {
        method: "PUT",
        body: workshopData,
      });
      await fetchAll();
      return data;
    } finally {
      loading.value = false;
    }
  };

  const deleteWorkshop = async (id: string) => {
    loading.value = true;
    try {
      await $fetch(`/api/workshops/${id}`, {
        method: "DELETE",
      });
      await fetchAll();
    } finally {
      loading.value = false;
    }
  };
  //

  return {
    workshops,
    workshop,
    loading,
    fetchAll,
    fetchAllSSR,
    createWorkshop,
    getWorkshop,
    updateWorkshop,
    deleteWorkshop,
  };
};

export { useWorkshops };
