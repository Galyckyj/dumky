"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const EditProfileButton = () => {
  const { data: session } = useSession(); // Отримання даних сесії
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSaveChanges = async () => {
    if (!session?.user?.id) {
      toast({ description: "Ви не авторизовані." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id, newName }),
      });

      if (response.ok) {
        router.refresh();
        setOpen(false);
        toast({ description: "Профіль оновлено." });
      } else {
        const { error } = await response.json();
        toast({ description: error || "Не вдалося оновити профіль." });
      }
    } catch (error) {
      toast({ description: "Помилка при оновленні профілю." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Редагувати профіль</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Редагування профілю</DialogTitle>
        {/* <DialogHeader>
          <h2>Редагувати профіль</h2>
        </DialogHeader> */}

        <div className="space-y-4">
          <div className="flex flex-col gap-4 mt-5">
            <Label htmlFor="name">Нове ім'я</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Введіть нове ім'я"
            />
          </div>
        </div>

        <DialogFooter className="flex">
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Зберігаємо..." : "Зберегти"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
