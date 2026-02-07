import { API_URL } from "@/utils/api-url";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: API_URL.AUTH_URL,
  fetchOptions: {
    credentials: "include",
  },
});
