import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => (
    <header className="flex justify-between">
      <h1 className="text-lg font-bold">Привіт👋</h1>
      <Button asChild>
        <Link href="/auth/login">Увійти</Link>
      </Button>
      
    </header>
  );
  
export default Header;