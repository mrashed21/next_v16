import { Route } from "@/types/route.type";
import { adminRoute } from "./admin.route";
import { providerRoute } from "./provider.route";
import { userRoute } from "./user.routes";

export const roleRoutes: Record<string, Route> = {
  user: userRoute,
  admin: adminRoute,
  provider: providerRoute,
};
