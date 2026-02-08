"use server";

// ! get all order for admin
import { orderService } from "@/service/order-service";
import { cookies } from "next/headers";

export const getAllOrderForAdmin = async (
  page: number,
  limit: number,
  search: string,
  status: string,
  provider: string,
) => {
  const cookieStore = await cookies();
  const res = await orderService.getAllOrderForAdmin(
    page,
    limit,
    search,
    status,
    provider,
    cookieStore,
  );
  return res;
};
