import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "../logout-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex justify-between">
      <h1 className="text-lg font-bold">Привіт👋</h1>
      {session?.user ? (
        <>
          <div className="flex items-center gap-3">
            <div>{session.user.username || session.user.name}</div>
            <LogoutButton />
          </div>
        </>
      ) : (
        <Button asChild>
          <Link href="/login">Увійти</Link>
        </Button>
      )}
    </header>
  );
}
