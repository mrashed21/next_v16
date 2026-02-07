export interface CategoryInterface {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  categoryImage?: string;
  user: {
    id: string;
    name: string;
  };
}

export interface GetPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}
