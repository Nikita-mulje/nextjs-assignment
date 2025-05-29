'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    if (isAuth !== 'true') {
      router.push('/login')
    }
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
    </div>
  )
}
