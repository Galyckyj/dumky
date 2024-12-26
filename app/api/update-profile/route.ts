// app/api/update-profile/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Використайте свій Prisma клієнт
import * as z from "zod";

const updateProfileSchema = z.object({
  userId: z.string().min(1, "ID користувача обов'язковий"),
  newName: z
    .string()
    .min(2, "Ім'я має бути не менше 2 символів")
    .max(20, "Ім'я має бути не більше 20 символів")
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'`-]+$/,
      "Ім'я може містити лише літери, апостроф та дефіс"
    ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Валідація даних
    const validationResult = updateProfileSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Помилка валідації",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { userId, newName } = validationResult.data;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { name: newName },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Помилка при оновленні профілю:", error);
    return NextResponse.json(
      { error: "Не вдалося оновити профіль" },
      { status: 500 }
    );
  }
}
