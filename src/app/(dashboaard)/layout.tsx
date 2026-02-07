"use client";

import AppSidebar from "@/components/custom/app-sidebar";
import DashboardHeader from "@/components/custom/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({
  user,
  admin,
  provider,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}) => {
  const userInfo = {
    role: "admin",
  };

  return (
    <SidebarProvider>
      <main className="flex min-h-screen w-full">
        <AppSidebar role={userInfo.role as any} />

        <main className="flex-1 space-y-4 ">
          <DashboardHeader />

          {userInfo.role === "user" && user}
          {userInfo.role === "admin" && admin}
          {userInfo.role === "provider" && provider}
        </main>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
