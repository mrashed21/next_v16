import { Route } from "@/types/route.type";
import { ShoppingBag, StarIcon, User } from "lucide-react";

export const userRoute: Route = [
  {
    title: "Orders",
    url: "/user/orders",
    icon: ShoppingBag,
  },
  {
    title: "Reviews",
    url: "/user/reviews",
    icon: StarIcon,
  },
  {
    title: "Profile",
    url: "/user-profile",
    icon: User,
  },
];
