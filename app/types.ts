export type WorkshopKind = "document"; // add 'image' or other types later

export interface Workshop {
  id: string;
  ownerId: string | null;
  title: string;
  description: string;
  slug: string | null; // for human-readable urls, will implement these later, just use id's for now
  kind: WorkshopKind;
  draftJson: unknown | null; // tiptap JSON while editing
  publishedJson: unknown | null; // snapshot used on the public page
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}
