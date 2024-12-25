import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { IconType } from "react-icons";

interface OAuthButtonProps extends HTMLAttributes<HTMLButtonElement> {
  providerName: string; // Назва провайдера
  icon?: IconType; // Іконка з бібліотеки react-icons
  iconUrl?: string; // URL зображення іконки
  onSignIn: () => Promise<void>; // Функція для входу
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
      await onSignIn();
    } catch (error) {
      console.error(`Помилка входу через ${providerName}:`, error);
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

// Компонент індикатора завантаження
function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
