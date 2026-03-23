import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 transition-all">
          <div className="flex items-center gap-4">
            {/* The hamburger menu for mobile */}
            <SidebarTrigger className="-ml-2" />
            <h1 className="text-sm font-medium text-muted-foreground">
              LogPulse / Frontend-App
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Avatar className="h-9 w-9 cursor-pointer border">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>VG</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content Area */}
        <div className="flex-1 overflow-y-auto bg-zinc-50/50 p-6 dark:bg-zinc-950">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
