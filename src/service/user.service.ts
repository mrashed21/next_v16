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
};
