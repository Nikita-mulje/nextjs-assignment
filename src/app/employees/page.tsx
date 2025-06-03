import { Employee } from "@/lib/data/employees"
import { EmployeeTable } from "@/components/employees/employee-table"
import { Suspense } from "react"

type SearchParams = {
  name?: string
  department?: string
  page?: string
  pageSize?: string
}

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Build query string from search params
  const queryParams = new URLSearchParams()
  if (searchParams.name) queryParams.append("name", searchParams.name)
  if (searchParams.department) queryParams.append("department", searchParams.department)
  if (searchParams.page) queryParams.append("page", searchParams.page)
  if (searchParams.pageSize) queryParams.append("pageSize", searchParams.pageSize)

  const queryString = queryParams.toString()
  const baseUrl = "https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/employees"
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl

  const res = await fetch(url, {
    cache: "no-store",
  })

  const employees: Employee[] = await res.json()

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Employee List</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeTable 
          data={employees}
          initialSearch={searchParams.name}
          initialDepartment={searchParams.department}
        />
      </Suspense>
    </div>
  )
}
