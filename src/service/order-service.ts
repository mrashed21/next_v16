import { API_URL } from "@/utils/api-url";

export const orderService = {
  // !get all order for admin
  getAllOrderForAdmin: async function (
    page: number,
    limit: number,
    search: string,
    status: string,
    provider: string,
    cookie: any,
  ) {
    try {
      const params = new URLSearchParams({
        search: search ?? "",
        page: String(page),
        limit: String(limit),
      });

      if (status) params.append("status", status);
      if (provider) params.append("provider", provider);

      const res = await fetch(
        `${API_URL.BACKEND_URL}/order/admin?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie.toString(),
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch order data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to fetch order data",
        status: false,
      };
    }
  },

  //   ! get order for provider with search,page , limit
  getOrderForProvider: async function (
    search: string,
    page: number,
    limit: number,
    cookie: any,
  ) {
    try {
      const res = await fetch(
        `${API_URL.BACKEND_URL}/order/provider?search=${search}&page=${page}&limit=${limit}`,
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
          message: "Failed to fetch order data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: "Failed to fetch order data",
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
