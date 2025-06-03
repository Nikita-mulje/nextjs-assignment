"use client"

import * as React from "react"
import { Employee } from "@/lib/data/employees"
import { columns as defaultColumns } from "./columns"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

import { CreateEmployeeDialog } from "./CreateEmployeeDialog"

type Props = {
  data: Employee[]
  onEmployeeCreated?: (employee: Employee) => void
  initialSearch?: string
  initialDepartment?: string
}

export function EmployeeTable({ data: initialData, onEmployeeCreated, initialSearch = "", initialDepartment = "" }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = React.useState(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "name", value: initialSearch },
    { id: "department", value: initialDepartment },
  ])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const departments = Array.from(new Set(data.map((e) => e.department)))

  // Update URL when filters change
  const updateSearchParams = React.useCallback((name: string, department: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (name) {
      params.set("name", name)
    } else {
      params.delete("name")
    }

    if (department) {
      params.set("department", department)
    } else {
      params.delete("department")
    }

    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  // Handle filter changes
  const handleNameFilter = React.useCallback((value: string) => {
    const departmentFilter = table.getColumn("department")?.getFilterValue() as string
    updateSearchParams(value, departmentFilter || "")
    table.getColumn("name")?.setFilterValue(value)
  }, [updateSearchParams])

  const handleDepartmentFilter = React.useCallback((value: string) => {
    const nameFilter = table.getColumn("name")?.getFilterValue() as string
    updateSearchParams(nameFilter || "", value === "*" ? "" : value)
    table.getColumn("department")?.setFilterValue(value === "*" ? "" : value)
  }, [updateSearchParams])

  const handleEmployeeCreated = React.useCallback(async (newEmployee: Employee) => {
    setData(prevData => [...prevData, newEmployee])
    onEmployeeCreated?.(newEmployee)
  }, [onEmployeeCreated])

  const table = useReactTable({
    data,
    columns: defaultColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">
      {/* Filters and column toggle */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by employee name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) => handleNameFilter(e.target.value)}
            className="max-w-sm"
          />
          <CreateEmployeeDialog onEmployeeCreated={handleEmployeeCreated} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select
            value={(table.getColumn("department")?.getFilterValue() as string) || "*"}
            onValueChange={handleDepartmentFilter}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">All</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Column visibility dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span>| Go to page:</span>
          <Input
            type="number"
            min={1}
            max={table.getPageCount()}
            className="w-16"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
