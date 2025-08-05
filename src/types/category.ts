export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  subcategories?: Subcategory[];
  updatedAt: string;
  createdAt: string;
}
