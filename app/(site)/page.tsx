import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <Button variant="outline" className="mt-5">
        <Link href="/profile">Профіль</Link>
      </Button>
    </div>
  );
}
