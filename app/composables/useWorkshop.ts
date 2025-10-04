import type { Workshop, WorkshopKind } from "~/types";
import { MOCK_WORKSHOPS } from "./mockData";

const useWorkshops = () => {
  // TODO: implement actual api calls and database storage
  const workshops = ref<Workshop[]>(MOCK_WORKSHOPS);

  const createWorkshop = (
    title: string,
    description: string,
    content: object,
    // begin optional / default params
    workshopKind: WorkshopKind = "document",
    published?: boolean
  ) => {
    const id = workshops.value.length + 1;
    const draftJson = JSON.stringify(content);
    const publishedJson = published ? draftJson : null;
    const workshop: Workshop = {
      id: id.toString(),
      title,
      description,
      kind: workshopKind,
      slug: null,
      ownerId: "johndoe",
      draftJson,
      publishedJson,
      isPublished: published ?? false,
      publishedAt: published ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
      deletedAt: null,
    };
    workshops.value.push(workshop);
    // Should I return the workshop referenced from inside the workshops array so it is a reactive Proxy Object?
    return workshops.value[workshops.value.length - 1];
  };

  const getWorkshop = (id: string) => {
    return workshops.value.find((workshop) => workshop.id === id);
  };

  const updateWorkshop = (workshop: Workshop) => {
    const index = workshops.value.findIndex((w) => w.id === workshop.id);
    if (index !== -1) {
      workshops.value[index] = workshop;
    } else {
      throw new Error("Workshop not found");
    }
    return workshops.value[index];
  };

  const deleteWorkshop = (id: string) => {
    const index = workshops.value.findIndex((w) => w.id === id);
    if (index !== -1) {
      workshops.value[index]!.isDeleted = true;
      workshops.value[index]!.deletedAt = new Date().toISOString();
    } else {
      throw new Error("Workshop not found");
    }
  };

  return {
    workshops,
    createWorkshop,
    getWorkshop,
    updateWorkshop,
    deleteWorkshop,
  };
};

export { useWorkshops };
