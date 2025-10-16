// We need to explicity import types here since auto-importing doesn't apply within the shared directory
import type { Workshop } from "../types";
import mockDataTipTap from "./mockDataTipTap.json";

const MOCK_WORKSHOPS: Workshop[] = [
  {
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
  },
  {
    id: "2",
    ownerId: "janedoe",
    slug: null,
    title: "Workshop 2",
    description: "Description 2",
    kind: "document",
    draftJson: JSON.stringify(mockDataTipTap),
    publishedJson: JSON.stringify(mockDataTipTap),
    isPublished: false,
    publishedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false,
    deletedAt: null,
  },
  {
    id: "3",
    ownerId: "johndoe2",
    slug: null,
    title: "Workshop 3",
    description: "Description 3",
    kind: "document",
    draftJson: JSON.stringify(mockDataTipTap),
    publishedJson: JSON.stringify(mockDataTipTap),
    isPublished: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: true,
    deletedAt: null,
  },
];

export { MOCK_WORKSHOPS };
