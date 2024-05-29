'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Email is invalid' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(7, { message: 'Password must have at least 7 characters' })
    .max(12, { message: 'Password must be less than 12 characters' }),
})
export function LoginAccountForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const supabase = createClientComponentClient()
      const { email, password } = values
      const {
        error,
        data: { session },
      } = await supabase.auth.signInWithPassword({ email, password })
      form.reset()
      router.refresh()
    } catch (error) {
      console.log('LoginAccountForm', error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <span className="text-lg">Its good to see you here again.</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>This is Your E-mail</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormDescription>This is Your Password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  )
}
