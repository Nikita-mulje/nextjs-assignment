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
      department: employee.department,
      designation: employee.designation,
      status: employee.status === "active",
    },
  })

  function onSubmit(data: FormData) {
    const updatedEmployee = {
      ...employee,
      ...data,
      status: data.status ? "active" : "inactive",
    }
    console.log("Update employee:", updatedEmployee)
    onOpenChange(false) // Close the dialog
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
            <Input {...form.register("email")} />
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
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation</Label>
            <Input {...form.register("designation")} />
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
