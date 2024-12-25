"use client";

import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { OAuthButton } from "@/components/ui/oauth-button";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background md:p-10">
      <section className="w-full max-w-sm flex flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold">Вітаю в Dumky.</h1>
          <p className="text-sm text-muted-foreground text-center">
            Пройди авторизацію
          </p>
        </div>
        <LoginForm />

        <p className="text-sm text-muted-foreground text-center">
          Не маєш акаунту?{" "}
          <Link href="/register" className="underline">
            Зареєструватися
          </Link>
        </p>

        <div className="flex flex-col gap-3">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Або
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button disabled variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Продовжити з Apple
            </Button>
            <OAuthButton
              providerName="Google"
              icon={FaGoogle}
              onSignIn="google"
            />
          </div>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground mt-5">
          <p>
            Натискаючи &ldquo;Продовжити&rdquo; ви погоджуєтеся з нашими
            <a href="#">Умовами надання послуг</a> та
            <a href="#">Політикою конфіденційності</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
