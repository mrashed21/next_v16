"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { roleRoutes } from "@/routes/route";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

type Props = {
  role: "user" | "admin" | "provider";
};

const AppSidebar = ({ role }: Props) => {
  const routes = roleRoutes[role];
  const pathname = usePathname();
  const router = useRouter();

  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => {
                const Icon = item.icon;

                const hasSub = !!item.items?.length;
                const isSubActive = item.items?.some(
                  (sub) => pathname === sub.url,
                );

                const isOpen = openMenu === item.title || isSubActive;

                /* //! WITH SUB MENU  */
                if (hasSub) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            isActive={isSubActive}
                            onClick={() => {
                              if (isCollapsed) {
                                setOpen(true);
                              }
                              setOpenMenu(isOpen ? null : item.title);
                            }}
                          >
                            {Icon && <Icon />}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>

                      <SidebarMenuSub>
                        {isOpen &&
                          item.items!.map((sub) => {
                            const SubIcon = sub.icon;
                            const active = pathname === sub.url;

                            return (
                              <SidebarMenuSubItem key={sub.title}>
                                <SidebarMenuSubButton
                                  isActive={active}
                                  onClick={() => {
                                    if (isCollapsed) {
                                      setOpen(true);
                                    }
                                    router.push(sub.url);
                                  }}
                                >
                                  {SubIcon && <SubIcon />}
                                  <span>{sub.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  );
                }

                /* //! SINGLE ITEM  */
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => {
                            if (isCollapsed) {
                              setOpen(true);
                            }
                            router.push(item.url!);
                          }}
                        >
                          {Icon && <Icon />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
