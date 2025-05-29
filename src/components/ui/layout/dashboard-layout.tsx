// src/components/ui/layout/dashboard-layout.tsx
import { cookies } from "next/headers"
import DashboardLayoutClient from "./dashboard-layout-client"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const defaultOpen = (await cookieStore).get("sidebar_state")?.value === "true"

  return <DashboardLayoutClient defaultOpen={defaultOpen}>{children}</DashboardLayoutClient>
}
