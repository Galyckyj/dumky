"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IconType } from "react-icons";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface OAuthButtonProps {
  providerName: string;
  icon?: IconType;
  iconUrl?: string;
  onSignIn: string; // Changed to string for provider name
  className?: string;
}

export function OAuthButton({
  providerName,
  icon: Icon,
  iconUrl,
  onSignIn,
  className,
  ...props
}: OAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await signIn(onSignIn, { callbackUrl: "/" });
    } catch (error) {
      console.error(`Error signing in with ${providerName}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={cn("w-full flex items-center gap-2", className)}
      disabled={isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {Icon && <Icon className="h-5 w-5" />}
          {iconUrl && (
            <Image
              src={iconUrl}
              alt={`${providerName} лого`}
              width={20}
              height={20}
            />
          )}
          <span>Продовжити з {providerName}</span>
        </>
      )}
    </Button>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}
