import { SessionProvider } from "next-auth/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-screen-xl m-auto p-5">{children}</div>;
}
