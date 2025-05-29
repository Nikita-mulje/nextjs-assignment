'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    if (isAuth === 'true') {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [])

  return null
}
