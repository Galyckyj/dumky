"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "../../app/api/update-profile/route";

export function EditProfileButton() {
  const { toast } = useToast();
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSaveChanges = async () => {
    console.log("Saving changes..." + newName);
    if (!newName) {
      console.log("Please enter a valid name");
      toast({
        description: "Введи будь ласка коретне ім'я",
      });
      return;
    }

    setLoading(true);

    try {
      // Викликаємо API для оновлення імені в базі даних
      await updateProfile({ name: newName });
      console.log("Profile updated successfully");

      toast({
        description: "І'мя успішно оновлено",
      });
      router.refresh(); // Перезавантажуємо сторінку, щоб відобразити нові дані
    } catch (error) {
      console.log("Failed to update profile");
      toast({
        description: "Помилка в оновлені профілю",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Редагувати</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редагувати профіль</DialogTitle>
          <DialogDescription>
            Внеси зміни до свого профілю тут. Натисни зберегти, коли закінчиш.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Ім'я
            </Label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Відхилити
            </Button>
          </DialogClose>
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Збереження..." : "Зберегти"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
