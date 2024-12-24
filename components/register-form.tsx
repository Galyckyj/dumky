'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

const RegisterSchema = z.object({
  fullName: z.string().min(2, "Ім'я має бути не менше 2 символів"),
  email: z.string().email("Невірний формат email"),
  password: z.string().min(6, "Пароль має бути не менше 6 символів"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Ви повинні прийняти умови та положення",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Паролі не співпадають",
  path: ["confirmPassword"],
});

export default function RegisterForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    if (!data.terms) {
      toast({
        variant: "destructive",
        title: "Помилка",
        description: "Ви повинні прийняти умови та положення",
      })
      return
    }
    console.log(data)
    // Add your registration logic here
  }

  return (
    <div className="p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col items-center gap-2 mb-5">
            <div className="font-semibold text-3xl text-center">Реєстрація</div>
            <div className="text-sm text-muted-foreground text-center">Введіть свою інформацію щоб створити обліковий запис</div>
        </div>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім&apos;я</FormLabel>
              <FormControl>
                <Input placeholder="Ваш псевдонім" {...field} />
              </FormControl>
              {form.formState.errors.fullName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="sample@gmail.com" {...field} />
              </FormControl>
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="Придумайте надійний пароль" {...field} />
              </FormControl>
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторіть пароль</FormLabel>
              <FormControl>
                <Input placeholder="Повторіть ваш пароль" {...field} />
              </FormControl>
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </FormItem>
          )}
        />
          
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                    
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Прийняти умови та положення
                  </FormLabel>
                  {form.formState.errors.terms && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.terms.message}
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            Реєстрація
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-3 mt-5">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Або
            </span>

          </div>
          <div className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            />
          </svg>
          Продовжити з Apple
        </Button>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Продовжити з Google
        </Button>
      </div>
      <div className="text-sm text-center mt-5">
              Вже зареєстрований?
              <Link className="underline underline-offset-4" href="/auth/login">Авторизація</Link>
        </div>

      </div>
    </div>
  )
}