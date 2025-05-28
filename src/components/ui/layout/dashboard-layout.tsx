'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Employees", href: "/employees" },
  { label: "Settings", href: "/settings" }
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-800 border-r p-6 space-y-6">
        {/* <h2 className="text-2xl font-bold">Employee Manager</h2> */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700",
                pathname === item.href && "bg-zinc-200 dark:bg-zinc-700 font-semibold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Right content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-800">
          <h1 className="text-2xl font-bold">Employee Manager</h1>
          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
