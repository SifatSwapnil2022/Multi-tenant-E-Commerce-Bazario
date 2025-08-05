// src/types/index.ts
import type { Config } from "@/payload-types";

// Extend the default Category type to add subcategories
export type Category = Config["collections"]["categories"] & {
  subcategories?: Category[]; // Optional recursive subcategory array
};

export type CategoryDoc = Config["collections"]["categories"] & {
  subcategories?: CategoryDoc[]; // Optional recursive subcategory array
};
