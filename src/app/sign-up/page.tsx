'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['admin', 'employee']),
})

type SignUpFormValues = z.infer<typeof formSchema>

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'employee',
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    console.log('SignUp Data:', data)
    try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //firstName: data.firstName,
           // lastName: data.lastName,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
            role: data.role,
          }),
        })
    
        if (!response.ok) {
          const errorData = await response.json()
          console.error('Error:', errorData)
          // You can display an error toast or set form error here
          return
        }
    
        const result = await response.json()
        console.log('Signup successful:', result)
        // Optionally redirect user or show success message
      } catch (error) {
        console.error('Network error:', error)
        // Optionally show a toast or error message
      }// Combine name if needed:
    // const fullName = `${data.firstName} ${data.lastName}`
    // API call logic goes here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div className='flex flex-col gap-4'>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register('firstName')} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className='flex flex-col gap-4'>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register('lastName')} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-4'>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className='flex flex-col gap-4'>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div className='flex flex-col gap-4'>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setValue('role', value as 'admin' | 'employee')}>
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

          <Button type="submit" className="w-full mt-4">Sign Up</Button>
        </form>

        {/* Redirect to Login */}
        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </p>
      </CardContent>
    </Card>
    </div>
  )
}
