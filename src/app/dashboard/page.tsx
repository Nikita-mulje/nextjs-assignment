'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LineChartCard from '@/components/charts/LineChart'
import PieChartCard from '@/components/charts/PieChart'
import BarChartCard from '@/components/charts/BarChart'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    if (isAuth !== 'true') {
      router.push('/login')
    }
  }, [])

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <BarChartCard />
        <LineChartCard />
        <PieChartCard />
      </div>
    </div>
  )
}
