import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = cookies();

      const url =
        "/get-session";

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
