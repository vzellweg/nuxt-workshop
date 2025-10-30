import { createWorkshop } from "../../repository/workshopRepository";

/**
 * POST /api/workshops
 * Creates a new workshop
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // TODO: Validate the request body

  const newWorkshop = await createWorkshop({
    ownerId: body.ownerId || null,
    title: body.title,
    description: body.description,
    slug: body.slug,
    kind: body.kind,
    draftJson: body.draftJson,
    publishedJson: body.publishedJson,
    isPublished: body.isPublished,
  });

  console.log("Workshop created:", newWorkshop);

  return newWorkshop;
});
