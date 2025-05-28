"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "@/lib/data/employees"
import { Badge } from "@/components/ui/badge"
import { EditEmployeeDialog } from "./EditEmployeeDialog"

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }:any) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
  id: "actions",
  cell: ({ row }) => {
    const employee = row.original
    return (
      <EditEmployeeDialog employee={employee} />
    )
  },
}
]
