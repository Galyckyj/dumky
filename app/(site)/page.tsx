import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Home</h1>
      {session?.user?.id && (
        <Button variant="outline" className="mt-5">
          <Link href={`/profile/${session.user.id}`}>Профіль</Link>
        </Button>
      )}
    </div>
  );
}
