'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const data = [
  { name: 'Week 1', users: 240 },
  { name: 'Week 2', users: 280 },
  { name: 'Week 3', users: 320 },
  { name: 'Week 4', users: 300 },
]

export default function LineChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
