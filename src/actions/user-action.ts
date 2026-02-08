"use server";
import { userService } from "@/service/user-service";
import { cookies } from "next/headers";

//! get all user based on role
export const getAllAdmins = async (
  page: number,
  limit: number,
  search: string,
  role: string,
) => {
  const cookieStore = await cookies();
  return await userService.getAllUser(page, limit, search, role, cookieStore);
};

// ! update user status
export const updateUserStatus = async (payload: {
  id: string;
  status: string;
}) => {
  const cookieStore = await cookies();
  return await userService.updateUserStatus(payload, cookieStore);
};
