'use client'

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Employee } from '@/lib/data/employees'

const COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f97316', // Orange
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#14b8a6', // Teal
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#84cc16', // Lime
]

export default function PieChartCard() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/employees', {
          cache: 'no-store',
        })
        const employees: Employee[] = await res.json()

        // Calculate department-wise counts
        const departmentCounts = employees.reduce((acc, employee) => {
          acc[employee.department] = (acc[employee.department] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        // Convert to array format for PieChart
        const chartData = Object.entries(departmentCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value) // Sort by count in descending order

        setData(chartData)
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchEmployees()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Employees by Department</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300} minWidth={200}>
          <PieChart>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={80}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
