"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <div>
      <Button className="w-full" onClick={() => signOut({ callbackUrl: "/" })}>
        Вийти
      </Button>
    </div>
  );
}
