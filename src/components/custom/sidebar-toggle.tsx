"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

const SidebarToggle = () => {
  return (
    <SidebarTrigger className="h-9 w-9">
      <PanelLeft className="h-5 w-5" />
    </SidebarTrigger>
  );
};

export default SidebarToggle;
