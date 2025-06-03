"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
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
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  employee_id: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  department: z.string(),
  designation: z.string(),
  start_date: z.string(),
  status: z.literal("active").or(z.literal("inactive")),
})

type FormData = z.infer<typeof formSchema>

type Props = {
  onEmployeeCreated?: () => void
}

export function CreateEmployeeDialog({ onEmployeeCreated }: Props) {
  const [open, setOpen] = React.useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: "",
      name: "",
      email: "",
      department: "",
      designation: "",
      start_date: "",
      status: "active" as const,
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create employee')
      }

      onEmployeeCreated?.()
      form.reset()
      setOpen(false) // Close the dialog after successful creation
    } catch (error) {
      console.error('Error creating employee:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Employee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-4">Employee ID</Label>
            <Input {...form.register("employee_id")} />
          </div>

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
              onValueChange={(value) => form.setValue("department", value)}
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

          <div>
            <Label className="mb-4">Status</Label>
            <Select
              onValueChange={(value) => form.setValue("status", value as "active" | "inactive")}
              defaultValue="active"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Create Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 