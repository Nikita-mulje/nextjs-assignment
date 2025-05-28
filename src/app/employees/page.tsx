import { employees } from "@/lib/data/employees"
import { EmployeeTable } from "@/components/employees/employee-table"

export default function EmployeesPage() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Employee List</h2>
      <EmployeeTable data={employees} />
    </div>
  )
}
