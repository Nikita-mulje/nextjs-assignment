'use client'

import { Home, Users, Settings, Menu, LogOutIcon } from "lucide-react"
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import LogOutButton from "./LogOutButton"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Employees", href: "/employees", icon: Users },
  { title: "Settings", href: "/settings", icon: Settings },
]

export default function DashboardLayoutClient({
  children,
  defaultOpen,
}: {
  children: React.ReactNode
  defaultOpen: boolean
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarProvider defaultOpen={defaultOpen}>
        {/* <div className="hidden lg:block w-64 bg-white dark:bg-zinc-800 border-r"> */}
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700",
                              pathname === item.href && "bg-zinc-200 dark:bg-zinc-700 font-semibold"
                            )}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        {/* </div> */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-white dark:bg-zinc-800">
            {/* Left side */}
            <div className="flex items-center space-x-2">
              <SidebarTrigger />
              <h1 className="text-lg sm:text-2xl font-bold truncate">Employee Manager</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <LogOutButton />
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}
