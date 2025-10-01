import type { Workshop } from "~/types";
import mockDataTipTap from "./mockDataTipTap";

const MOCK_WORKSHOP: Workshop = {
  id: "1",
  ownerId: "johndoe",
  slug: null,
  title: "Workshop 1",
  description: "Description 1",
  kind: "document",
  draftJson: JSON.stringify(mockDataTipTap),
  publishedJson: JSON.stringify(mockDataTipTap),
  isPublished: true,
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isDeleted: false,
  deletedAt: null,
};

export { MOCK_WORKSHOP };
