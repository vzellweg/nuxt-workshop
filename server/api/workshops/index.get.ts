import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

/**
 * GET /api/workshops
 * Returns all workshops (excluding deleted ones by default)
 */
export default defineEventHandler((event) => {
  const query = getQuery(event);
  const includeDeleted = query.includeDeleted === "true";

  console.log("`/api/workshops GET` includeDeleted=", includeDeleted);
  if (includeDeleted) {
    return MOCK_WORKSHOPS;
  }

  return MOCK_WORKSHOPS.filter((workshop) => !workshop.isDeleted);
});
