"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const UserAccountnav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      Вийти
    </Button>
  );
};
export default UserAccountnav;
