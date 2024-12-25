"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Control, FieldPath, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().email("Введіть коректний email"),
    username: z
      .string()
      .min(3, "Ім'я користувача має бути не менше 3 символів"),
    password: z.string().min(6, "Пароль має бути не менше 6 символів"),
    confirm: z.string(),
    terms: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
        message: "Ви повинні прийняти умови та положення",
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Паролі не співпадають",
    path: ["confirm"], // шлях до поля з помилкою
  });

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/auth/login");
    } else {
      const data = await response.json();
      console.error(data, "Registration failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SignupFormField
          name="username"
          label="Ім'я"
          placeholder="Введіть псевдонім"
          description="Не менше 3 символів"
          formControl={form.control}
        />
        <SignupFormField
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          inputType="email"
          formControl={form.control}
        />
        <SignupFormField
          name="password"
          label="Пароль"
          placeholder="Придумайте пароль"
          inputType="password"
          formControl={form.control}
        />
        <SignupFormField
          name="confirm"
          label="Підтвердження паролю"
          placeholder="Підтвердіть пароль"
          inputType="password"
          formControl={form.control}
        />
        <SignupFormField name="terms" label="" formControl={form.control} />
        <Button type="submit" className="w-full">
          Зареєструватися
        </Button>
      </form>
    </Form>
  );
};

interface SignupFormFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>>;
}

const SignupFormField: React.FC<SignupFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {name === "terms" ? (
              <div className="flex items-center gap-2 py-2">
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Прийняти <Link href="#">Умови </Link>та
                  <Link href="#"> Положення</Link>
                </p>
              </div>
            ) : (
              <Input
                placeholder={placeholder}
                type={inputType || "text"}
                {...field}
                value={typeof field.value === "boolean" ? "" : field.value}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RegisterForm;
