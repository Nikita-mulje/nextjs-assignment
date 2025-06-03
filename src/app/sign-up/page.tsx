'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['admin', 'employee']),
})

type SignUpFormValues = z.infer<typeof formSchema>

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'employee',
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch('https://employee-management-portal-git-master-sourabhkhot-ns-projects.vercel.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.message || 'Registration failed. Please try again.')
        return
      }

      setSuccessMessage('Registration successful! Please check your email for verification link.')
      reset() // Reset form after successful submission
    } catch (error) {
      setError('Network error. Please try again.')
      console.error('Network error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert className="mb-4 bg-red-50 text-red-700 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex flex-col gap-4'>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} disabled={isLoading} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            <div className='flex flex-col gap-4'>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} disabled={isLoading} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div className='flex flex-col gap-4'>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} disabled={isLoading} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className='flex flex-col gap-4'>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} disabled={isLoading} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className='flex flex-col gap-4'>
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setValue('role', value as 'admin' | 'employee')} disabled={isLoading}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading} loading={isLoading}>
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
