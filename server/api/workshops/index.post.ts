import { MOCK_WORKSHOPS } from "~/../shared/utils/mockData";

/**
 * POST /api/workshops
 * Creates a new workshop
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // TODO: Validate the request body
  // TODO: Actually persist to database instead of just mock array

  const newWorkshop: Workshop = {
    id: (MOCK_WORKSHOPS.length + 1).toString(),
    ownerId: body.ownerId || "unknown",
    slug: body.slug || null,
    title: body.title,
    description: body.description,
    kind: body.kind || "document",
    draftJson: body.draftJson || null,
    publishedJson: body.publishedJson || null,
    isPublished: body.isPublished || false,
    publishedAt: body.isPublished ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false,
    deletedAt: null,
  };

  // TODO: Replace with actual database insert
  MOCK_WORKSHOPS.push(newWorkshop);

  console.log("Workshop created:", newWorkshop);

  return newWorkshop;
});
