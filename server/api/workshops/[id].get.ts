import { fetchWorkshopById } from "../../repository/workshopRepository";

/**
 * GET /api/workshops/:id
 * Returns a single workshop by ID
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Workshop ID is required",
    });
  }

  const workshop = await fetchWorkshopById(id);

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
