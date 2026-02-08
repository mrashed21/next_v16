import { API_URL } from "@/utils/api-url";

export const categoryService = {
  // !get all category
  getcategory: async function () {
    try {
      const res = await fetch(`${API_URL.BACKEND_URL}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch category data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to fetch category data",
        status: false,
      };
    }
  },

  //   ! get category for admin with search,page , limit
  getCategoryForAdmin: async function (
    search: string,
    page: number,
    limit: number,
    cookie: any,
  ) {
    try {
      const res = await fetch(
        `${API_URL.BACKEND_URL}/category/admin?search=${search}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie.toString(),
            credentials: "include",
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch category data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to fetch category data",
        status: false,
      };
    }
  },

  // !create category
  createCategory: async function (
    payload: {
      name: string;
      slug: string;
      isActive: boolean;
      categoryImage?: string;
    },
    cookie: any,
  ) {
    try {
      const res = await fetch(`${API_URL.BACKEND_URL}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
          credentials: "include",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to create category",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Category created successfully",
        status: true,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to create category",
        status: false,
      };
    }
  },

  // !update category
  updateCategory: async function (
    id: string,
    name: string,
    categoryImage: string,
    cookie: any,
  ) {
    try {
      const res = await fetch(`${API_URL.BACKEND_URL}/category`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
          credentials: "include",
        },
        body: JSON.stringify({ name, categoryImage, id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to update category",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Category updated successfully",
        status: true,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to update category",
        status: false,
      };
    }
  },

  // !delete category
  deleteCategory: async function (id: string, cookie: any) {
    try {
      const res = await fetch(`${API_URL.BACKEND_URL}/category`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
          credentials: "include",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to delete category",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Category deleted successfully",
        status: true,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to delete category",
        status: false,
      };
    }
  },
};
