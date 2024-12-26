import { db } from "@/lib/db"; // Ваша Prisma інстанція
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Функція для оновлення профілю
export const updateProfile = async ({ name }: { name: string }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const updatedUser = await db.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  return updatedUser;
};
