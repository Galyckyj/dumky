import RegisterForm from "@/components/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthProviders } from "@/components/auth/auth-providers";

export default function RegisterPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background md:p-10">
      <section className="w-full max-w-sm flex flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold">Реєстрація</h1>
          <p className="text-sm text-muted-foreground text-center">
            Введіть свою інформацію щоб створити обліковий запис
          </p>
        </div>
        <RegisterForm />

        <p className="text-sm text-muted-foreground text-center">
          Вже маєш акаунт?{" "}
          <Link href="/login" className="underline">
            Увійти
          </Link>
        </p>

        <div className="flex flex-col gap-3">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Або
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthProviders />
          </div>
        </div>
      </section>
    </main>
  );
}
