"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function DialogCloseButton({ userId }: { userId: string }) {
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(`${window.location.origin}/profile/${userId}`);
  }, [userId]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Поділитися</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Посилання для поширення</DialogTitle>
            <DialogDescription>
              Кожен, хто має це посилання, зможе переглянути це.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input id="link" value={link} readOnly />
            <Button
              type="button"
              size="sm"
              className="px-3"
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
            >
              <span className="sr-only">Копіювати</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Закрити
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
