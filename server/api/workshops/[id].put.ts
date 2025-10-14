import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

/**
 * PUT /api/workshops/:id
 * Updates an existing workshop
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

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
      statusMessage: "Cannot update a deleted workshop",
    });
  }

  // TODO: Validate the request body
  // TODO: Actually persist to database

  const updatedWorkshop: Workshop = {
    ...MOCK_WORKSHOPS[index],
    ...body,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  };

  MOCK_WORKSHOPS[index] = updatedWorkshop;

  console.log("Workshop updated:", updatedWorkshop);

  return updatedWorkshop;
});
