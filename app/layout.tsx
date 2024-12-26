import Provider from "@/components/ui/Provider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dumky - Next.js Starter",
  description: "Next.js starter with batteries included.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
