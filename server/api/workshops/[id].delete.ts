import {
  deleteWorkshop,
  fetchWorkshopById,
} from "../../repository/workshopRepository";

/**
 * DELETE /api/workshops/:id
 * Soft deletes a workshop (marks as deleted)
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Workshop ID is required",
    });
  }

  // First check if workshop exists and if it's already deleted
  const existing = await fetchWorkshopById(id);

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "Workshop not found",
    });
  }

  if (existing.isDeleted) {
    throw createError({
      statusCode: 410,
      statusMessage: "Workshop already deleted",
    });
  }

  const workshop = await deleteWorkshop(id);

  console.log("Workshop deleted:", workshop);

  return {
    success: true,
    message: "Workshop deleted successfully",
  };
});
