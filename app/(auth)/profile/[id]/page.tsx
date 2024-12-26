import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/ui/back-button";
import db from "@/lib/db";
import { EditProfileButton } from "@/components/ui/editprofile-button";
import { DialogCloseButton } from "@/components/ui/shareprofile-button";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  const userId = (await params).id;

  console.log("Твій АЙДІ", session?.user?.id);

  // Отримання даних користувача за id
  const user = await db.user.findUnique({
    where: { id: userId },
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

  const isOwnProfile = session?.user?.id === user.id; // Перевірка, чи це власний профіль

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex justify-between w-full">
        <BackButton />
      </div>
      <div>
        <Avatar className="h-20 w-20 font-semibold text-4xl text-gray-500">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>
            {(user.name?.[0]?.toUpperCase() ||
              user.username?.[0]?.toUpperCase()) ??
              "U"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 className="font-bold text-xl">{user.username || user.name}</h1>
      </div>

      {isOwnProfile ? (
        <div className="mt-5 flex gap-5">
          <EditProfileButton />
          <DialogCloseButton userId={session.user.id} />
        </div>
      ) : (
        <div className="mt-5">
          <Button variant="outline" disabled>
            Follow
          </Button>
        </div>
      )}

      <div className="flex justify-between gap-14 mt-5">
        <div className="flex flex-col items-center gap-3">
          <div className="font-bold">Читачів</div>
          <div className="text-muted-foreground text-base font-semibold">
            68
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="font-bold">Підписок</div>
          <div className="text-muted-foreground text-base font-semibold">
            186
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="font-bold">Оцінок</div>
          <div className="text-muted-foreground text-base font-semibold">
            23
          </div>
        </div>
      </div>

      <Separator />
      <div className="flex flex-col w-full">
        <div className="items-start">
          <h2 className="font-bold text-xl">Книжкова полиця</h2>
        </div>
        <div className="book flex flex-wrap gap-12 justify-center">
          <div className="book flex">
            <div className="flex place-content-start mt-8">
              <div className="flex flex-col items-center gap-3">
                <div className="flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://static.yakaboo.ua/media/catalog/product/9/3/9370fb73fbe29807bc7542707ee3f92b.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-bold text-lg">Book Title</div>
                  <div className="text-muted-foreground">Author Name</div>
                  <div className="text-muted-foreground text-sm">2021</div>
                </div>
              </div>
            </div>
          </div>

          <div className="book">
            <div className="flex place-content-start mt-8">
              <div className="flex flex-col items-center gap-3">
                <div className="flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://static.yakaboo.ua/media/catalog/product/r/e/reykjavik-2500.1800x1200w.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-bold text-lg">Book Title</div>
                  <div className="text-muted-foreground">Author Name</div>
                  <div className="text-muted-foreground text-sm">2021</div>
                </div>
              </div>
            </div>
          </div>

          <div className="book">
            <div className="flex place-content-start mt-8">
              <div className="flex flex-col items-center gap-3">
                <div className="flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://static.yakaboo.ua/media/catalog/product/7/1/71laq_nxvtl._sl1500__1.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-bold text-lg">Book Title</div>
                  <div className="text-muted-foreground">Author Name</div>
                  <div className="text-muted-foreground text-sm">2021</div>
                </div>
              </div>
            </div>
          </div>

          <div className="book">
            <div className="flex place-content-start mt-8">
              <div className="flex flex-col items-center gap-3">
                <div className="flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://static.yakaboo.ua/media/catalog/product/9/7/9780063158450_0.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-bold text-lg">Book Title</div>
                  <div className="text-muted-foreground">Author Name</div>
                  <div className="text-muted-foreground text-sm">2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
