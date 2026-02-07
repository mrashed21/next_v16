import { LucideIcon } from "lucide-react";

export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface RouteConfig {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: RouteItem[];
}

export type Route = RouteConfig[];
