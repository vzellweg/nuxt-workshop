import { fetchAllWorkshops } from "../../repository/workshopRepository";

/**
 * GET /api/workshops
 * Returns all workshops (excluding deleted ones by default)
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const includeDeleted = query.includeDeleted === "true";

  return await fetchAllWorkshops(includeDeleted);
});
