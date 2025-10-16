import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

/**
 * GET /api/workshops/:id
 * Returns a single workshop by ID
 */
export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const workshop = MOCK_WORKSHOPS.find((w) => w.id === id);

  if (!workshop) {
    throw createError({
      statusCode: 404,
      statusMessage: "Workshop not found",
    });
  }

  if (workshop.isDeleted) {
    throw createError({
      statusCode: 410,
      statusMessage: "Workshop has been deleted",
    });
  }

  return workshop;
});
