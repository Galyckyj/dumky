// app/api/update-profile/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Імпортуйте ваш Prisma клієнт або будь-який інший спосіб доступу до бази даних
import { authOptions } from "@/lib/auth"; // Якщо вам потрібен доступ до сесії

export async function POST(request: Request) {
  try {
    const { userId, newName } = await request.json(); // Отримуємо дані з тіла запиту

    if (!userId || !newName) {
      return NextResponse.json(
        { error: "Недостатньо даних для оновлення" },
        { status: 400 }
      );
    }

    // Оновлення даних у базі
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { name: newName },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Не вдалося оновити профіль" },
      { status: 500 }
    );
  }
}
