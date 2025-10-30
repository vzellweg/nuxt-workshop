import { v4 as uuidv4 } from "uuid";
import type { Workshop, WorkshopKind } from "~/../shared/types";

// Initialize storage with memory driver
const storage = useStorage("workshops");

/**
 * Fetch all workshops, sorted by creation date (newest first)
 * Omits the draftJson and publishedJson fields to reduce payload size
 */
export async function fetchAllWorkshops(
  includeDeleted = false,
): Promise<Omit<Workshop, "draftJson" | "publishedJson">[]> {
  const keys = await storage.getKeys();
  const workshops: Workshop[] = [];

  for (const key of keys) {
    const workshop = await storage.getItem<Workshop>(key);
    if (workshop) {
      if (includeDeleted || !workshop.isDeleted) {
        workshops.push(workshop);
      }
    }
  }

  // Sort by createdAt (newest first)
  workshops.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Omit content fields
  return workshops.map(({ draftJson, publishedJson, ...rest }) => rest);
}

/**
 * Fetch a single workshop by ID
 */
export async function fetchWorkshopById(
  id: string,
): Promise<Workshop | null> {
  return await storage.getItem<Workshop>(`workshop:${id}`);
}

/**
 * Create a new workshop
 */
export async function createWorkshop(data: {
  ownerId: string | null;
  title: string;
  description: string;
  slug?: string | null;
  kind?: WorkshopKind;
  draftJson?: unknown | null;
  publishedJson?: unknown | null;
  isPublished?: boolean;
}): Promise<Workshop> {
  const id = uuidv4();
  const now = new Date().toISOString();

  const workshop: Workshop = {
    id,
    ownerId: data.ownerId || null,
    slug: data.slug || null,
    title: data.title,
    description: data.description,
    kind: data.kind || "document",
    draftJson: data.draftJson || null,
    publishedJson: data.publishedJson || null,
    isPublished: data.isPublished || false,
    publishedAt: data.isPublished ? now : null,
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    deletedAt: null,
  };

  await storage.setItem(`workshop:${id}`, workshop);
  return workshop;
}

/**
 * Update an existing workshop
 */
export async function updateWorkshop(
  id: string,
  data: Partial<Omit<Workshop, "id" | "createdAt">>,
): Promise<Workshop | null> {
  const existing = await fetchWorkshopById(id);

  if (!existing) {
    return null;
  }

  const updated: Workshop = {
    ...existing,
    ...data,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  };

  await storage.setItem(`workshop:${id}`, updated);
  return updated;
}

/**
 * Soft delete a workshop
 */
export async function deleteWorkshop(
  id: string,
): Promise<Workshop | null> {
  const existing = await fetchWorkshopById(id);

  if (!existing) {
    return null;
  }

  const deleted: Workshop = {
    ...existing,
    isDeleted: true,
    deletedAt: new Date().toISOString(),
  };

  await storage.setItem(`workshop:${id}`, deleted);
  return deleted;
}
