"use server";
import { categoryService } from "@/service/category-service";
import { cookies } from "next/headers";

// !get all category
export const categoryActions = async () => {
  const res = await categoryService.getcategory();
  return res;
};

// !get category for admin with search,page , limit
export const getcategoryForAdmin = async (
  search: string,
  page: number,
  limit: number,
) => {
  const cookieStore = await cookies();
  const res = await categoryService.getcategoryForAdmin(
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
// export const createCategoryAction = async (payload: {
//   name: string;
//   slug: string;
//   isActive: boolean;
//   categoryImage?: string;
// }) => {
//   const cookieStore = cookies();

//   return categoryService.createCategory(payload, cookieStore);
// };

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
