"use server";
import { categoryService } from "@/service/category-service";
import { cookies } from "next/headers";

// !get category for admin with search,page , limit
export const getCategoryForAdmin = async (
  search: string,
  page: number,
  limit: number,
) => {
  const cookieStore = await cookies();
  const res = await categoryService.getCategoryForAdmin(
    search,
    page,
    limit,
    cookieStore,
  );
  return res?.data;
};

// !create category
export const createCategory = async (payload: {
  name: string;
  slug: string;
  isActive: boolean;
  categoryImage?: string;
}) => {
  const cookieStore = await cookies();
  const res = await categoryService.createCategory(payload, cookieStore);
  return res;
};

// !update category
export const updateCategory = async (payload: {
  id: string;
  name?: string;
  categoryImage?: string;
}) => {
  const cookieStore = await cookies();
  const res = await categoryService.updateCategory(
    payload.id,
    payload.name || "",
    payload.categoryImage || "",
    cookieStore,
  );
  return res;
};

// !delete category
export const deleteCategory = async (id: string) => {
  const cookieStore = await cookies();
  const res = await categoryService.deleteCategory(id, cookieStore);
  return res;
};
