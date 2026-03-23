"use client";

import { Activity, Bell, Bug, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link"; // 🚨 Import Next.js Link
import { usePathname } from "next/navigation"; // 🚨 Import usePathname

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: Activity },
  { title: "Issues", url: "/issues", icon: Bug },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  // 🚨 Read the actual URL instead of using useState
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
            <Activity className="h-5 w-5" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">LogPulse</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Check if the current URL matches the item's URL
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive} // 🚨 Shadcn's built-in active state!
                      className={isActive ? "text-violet-600" : ""} // Keeps your custom violet text
                    >
                      {/* 🚨 Use <Link> to navigate without reloading! */}
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
