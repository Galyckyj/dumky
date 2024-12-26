// components/ui/editprofile-button.tsx

"use client"; // Вказуємо, що компонент клієнтський

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"; // Для показу повідомлень
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function EditProfileButton({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  const userId = (await params).name;

  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = async () => {
    if (!session) {
      toast({ description: "Ви не авторизовані." });
      return;
    }

    setLoading(true);

    // Оновлення профілю в базі даних
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id, newName }),
      });

      if (response.ok) {
        toast({ description: "Профіль оновлено." });
      } else {
        toast({ description: "Не вдалося оновити профіль." });
      }
    } catch (error) {
      toast({ description: "Помилка при оновленні профілю." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h2>Редагувати профіль</h2>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Нове ім'я</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Введіть нове ім'я"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Зберігаємо..." : "Зберегти"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
