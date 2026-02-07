import { Route } from "@/types/route.type";
import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export const adminRoute: Route = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    icon: Users,
    items: [
      { title: "Customers", url: "/admin/customers", icon: Users },
      { title: "Providers", url: "/admin/providers", icon: Users },
      { title: "Admins", url: "/admin/admins", icon: Users },
    ],
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tags,
  },
  {
    title: "All Menus",
    url: "/admin/all-meals",
    icon: UtensilsCrossed,
  },
];
