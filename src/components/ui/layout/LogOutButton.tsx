'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('auth')
    router.push('/login')
  }

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="icon"
      className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
    >
      <LogOutIcon className="h-5 w-5" />
      <span className="sr-only">Logout</span>
    </Button>
  )
}
