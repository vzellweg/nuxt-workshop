import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

/**
 * DELETE /api/workshops/:id
 * Soft deletes a workshop (marks as deleted)
 */
export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const index = MOCK_WORKSHOPS.findIndex((w) => w.id === id);

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Workshop not found",
    });
  }

  if (MOCK_WORKSHOPS[index].isDeleted) {
    throw createError({
      statusCode: 410,
      statusMessage: "Workshop already deleted",
    });
  }

  // TODO: Actually persist to database
  MOCK_WORKSHOPS[index].isDeleted = true;
  MOCK_WORKSHOPS[index].deletedAt = new Date().toISOString();

  console.log("Workshop deleted:", MOCK_WORKSHOPS[index]);

  return {
    success: true,
    message: "Workshop deleted successfully",
  };
});
