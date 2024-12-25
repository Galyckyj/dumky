"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Control, FieldPath, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Введіть коректний email"),
  password: z.string().min(6, "Пароль має бути не менше 6 символів"),
});

interface SignupFormFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>>;
}

const SignupFormField = ({
  name,
  label,
  placeholder,
  inputType,
  formControl,
}: SignupFormFieldProps) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log("Error signing in", signInData.error);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Введіть пароль"
          inputType="password"
          formControl={form.control}
        />
        <Button type="submit" className="w-full">
          Увійти
        </Button>
      </form>
    </Form>
  );
}
