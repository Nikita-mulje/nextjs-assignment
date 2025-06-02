'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault()

  //   // Fake credentials
  //   const validUsername = 'admin'
  //   const validPassword = 'password123'

  //   if (username === validUsername && password === validPassword) {
  //     localStorage.setItem('auth', 'true')
  //     router.push('/dashboard')
  //   } else {
  //     setError('Invalid credentials')
  //   }
  // }

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // clear any previous errors
  
    try {
      const response = await fetch('https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      })
      const data = await response.json()
  
      if (response.ok) {
        // Save auth token or set auth flag as needed
        localStorage.setItem('auth', 'true')
        localStorage.setItem('token', data.token) // optional if your API sends a token
        router.push('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
      console.error('Login error:', error)
    }
  }
  

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    if (isAuth === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="m-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="space-y-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>

          {/* Link to Sign Up */}
          <p className="text-sm text-center text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
