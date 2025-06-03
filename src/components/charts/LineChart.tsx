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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Weekly Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250} minWidth={200}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={40} />
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#10b981"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
