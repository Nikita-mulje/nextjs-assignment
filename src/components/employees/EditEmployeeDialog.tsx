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
    defaultValues: {
      name: employee.name,
      email: employee.email,
      department: employee.department,
      designation: employee.designation,
      status: employee.status === "active",
      start_date: employee.start_date,
    },
  })

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
            <Label>Name</Label>
            <Input {...form.register("name")} />
          </div>

          <div>
            <Label>Email</Label>
            <Input {...form.register("email")} type="email" />
          </div>

          <div>
            <Label>Department</Label>
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
            <Label>Designation</Label>
            <Input {...form.register("designation")} />
          </div>

          <div>
            <Label>Start Date</Label>
            <Input {...form.register("start_date")} type="date" />
          </div>

          <div className="flex items-center gap-2">
            <Label>Status</Label>
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
