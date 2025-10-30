import { updateWorkshop } from "../../repository/workshopRepository";

/**
 * PUT /api/workshops/:id
 * Updates an existing workshop
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Workshop ID is required",
    });
  }

  // TODO: Validate the request body

  const updatedWorkshop = await updateWorkshop(id, body);

  if (!updatedWorkshop) {
    throw createError({
      statusCode: 404,
      statusMessage: "Workshop not found",
    });
  }

  if (updatedWorkshop.isDeleted) {
    throw createError({
      statusCode: 410,
      statusMessage: "Cannot update a deleted workshop",
    });
  }

  console.log("Workshop updated:", updatedWorkshop);

  return updatedWorkshop;
});
