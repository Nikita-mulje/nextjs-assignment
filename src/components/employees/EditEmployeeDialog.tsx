"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Employee } from "@/lib/data/employees"
import React from "react"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  department: z.string(),
  designation: z.string(),
  status: z.boolean(),
  start_date: z.string(),
})

type FormData = z.infer<typeof formSchema>

type Props = {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditEmployeeDialog({ employee, open, onOpenChange }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/employees/${employee.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch employee')
        }
        const employeeData = await response.json()
        
        // Format the date to YYYY-MM-DD
        const formattedDate = employeeData.start_date 
          ? new Date(employeeData.start_date).toISOString().split('T')[0]
          : ''
        
        // Set form values with fetched data
        form.reset({
          name: employeeData.name,
          email: employeeData.email,
          department: employeeData.department,
          designation: employeeData.designation,
          status: employeeData.status === "active",
          start_date: formattedDate,
        })
      } catch (error) {
        console.error("Error fetching employee:", error)
      }
    }

    if (open) {
      fetchEmployee()
    }
  }, [open, employee.id, form])

  async function onSubmit(data: FormData) {
    try {
      const response = await fetch(`https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/employees/${employee.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employee.employee_id,
          name: data.name,
          email: data.email,
          department: data.department,
          designation: data.designation,
          start_date: data.start_date,
          status: data.status ? "active" : "inactive",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      const result = await response.json();
      console.log("Employee updated successfully:", result);
      onOpenChange(false); // Close the dialog
    } catch (error) {
      console.error("Error updating employee:", error);
      // Here you might want to show an error message to the user
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-4">Name</Label>
            <Input {...form.register("name")} />
          </div>

          <div>
            <Label className="mb-4">Email</Label>
            <Input {...form.register("email")} type="email" />
          </div>

          <div>
            <Label className="mb-4">Department</Label>
            <Select
              onValueChange={(value) =>
                form.setValue("department", value)
              }
              defaultValue={employee.department}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-4">Designation</Label>
            <Input {...form.register("designation")} />
          </div>

          <div>
            <Label className="mb-4">Start Date</Label>
            <Input {...form.register("start_date")} type="date" />
          </div>

          <div className="flex items-center gap-2">
            <Label className="mb-4">Status</Label>
            <Switch
              checked={form.watch("status")}
              onCheckedChange={(checked) => form.setValue("status", checked)}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
