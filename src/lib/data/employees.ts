export type Employee = {
  id: number
  name: string
  designation: string
  department: string
  status: "active" | "inactive"
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "Frontend Developer",
    department: "Engineering",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    designation: "HR Manager",
    department: "HR",
    status: "inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    designation: "Backend Developer",
    department: "Engineering",
    status: "active",
  },
  {
    id: 4,
    name: "Diana Prince",
    designation: "Marketing Lead",
    department: "Marketing",
    status: "active",
  },
]
