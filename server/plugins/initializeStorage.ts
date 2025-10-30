import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

/**
 * Initialize storage with mock data on server startup
 * This ensures that the in-memory storage has some initial data
 */
export default defineNitroPlugin(async () => {
  const storage = useStorage("workshops");

  // Check if storage is empty
  const keys = await storage.getKeys();

  if (keys.length === 0) {
    console.log("Initializing storage with mock data...");

    // Populate storage with mock workshops
    for (const workshop of MOCK_WORKSHOPS) {
      await storage.setItem(`workshop:${workshop.id}`, workshop);
    }

    console.log(`Initialized storage with ${MOCK_WORKSHOPS.length} workshops`);
  }
});
