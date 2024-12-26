// app/profile/[id]/page.tsx (серверний компонент)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import ProfilePageClient from "@/components/ui/profile-page-client";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  // const user = (await params).id

  const user = await db.user.findUnique({
    where: { id: (await params).id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      username: true,
    },
  });

  if (!user) {
    return <div>Користувача не знайдено!</div>;
  }

  const isOwnProfile = session?.user?.id === user.id;

  return (
    <ProfilePageClient
      user={user}
      isOwnProfile={isOwnProfile}
      session={session}
    />
  );
}
