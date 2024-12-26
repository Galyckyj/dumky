"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // Повернення на попередню сторінку
    } else {
      router.push("/"); // Перехід на головну сторінку, якщо історії немає
      console.log("Немає історії");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
      <ChevronLeft className="h-4 w-4" />
      Назад
    </Button>
  );
}
