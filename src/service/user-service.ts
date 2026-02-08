import { API_URL } from "@/utils/api-url";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = cookies();

      const url = `${API_URL.AUTH_URL}/get-session`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error("Session fetch error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // !get all user '/user?page=1&limit=10&search=${search}&role=${role}
  getAllUser: async function (
    page: number,
    limit: number,
    search: string,
    role: string,
    cookie: any,
  ) {
    try {
      const url = `${API_URL.BACKEND_URL}/user?page=${page}&limit=${limit}&search=${search}&role=${role}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookie.toString(),
          credentials: "include",
        },
        cache: "no-store",
      });

      const users = await res.json();

      if (users === null) {
        return { data: null, error: { message: "Users are missing." } };
      }

      return { data: users, error: null };
    } catch (err) {
      console.error("Users fetch error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // !update user status api refarene

  updateUserStatus: async function (
    payload: {
      id: string;
      status: string;
    },
    cookie: any,
  ) {
    try {
      const url = `${API_URL.BACKEND_URL}/user`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
          credentials: "include",
        },

        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const users = await res.json();

      if (users === null) {
        return { data: null, error: { message: "Users are missing." } };
      }

      return { data: users, error: null };
    } catch (err) {
      console.error("Users fetch error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
