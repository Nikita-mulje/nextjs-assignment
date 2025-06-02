import { Employee} from "@/lib/data/employees"
import { EmployeeTable } from "@/components/employees/employee-table"

export default async function EmployeesPage() {
  const res = await fetch(`https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/employees`, {
    cache: "no-store", // optional: disable caching if needed
  })

  const employees1: Employee[] = await res.json()

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Employee List</h2>
      <EmployeeTable data={employees1} />
    </div>
  )
}
