import { GetServerSideProps } from "next";
import { db } from "@/lib/db";

interface ProfilePageProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  if (!user) {
    return <p>Користувача не знайдено.</p>;
  }

  return (
    <div>
      <h1>Профіль користувача</h1>
      <img
        src={user.image || undefined}
        alt={user.name || "User avatar"}
        width={100}
        height={100}
      />
      <h2>{user.name || "Невідомий користувач"}</h2>
      <p>Email: {user.email || "Приховано"}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const user = await db.user.findUnique({
    where: { id: id }, // ID is a string
    select: {
      id: true,
      name: true, // Заберіть, якщо email повинен бути прихованим
      image: true,
      username: true,
    },
  });

  return {
    props: {
      user,
    },
  };
};
