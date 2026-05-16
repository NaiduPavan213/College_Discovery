import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import ConditionalHeader from "@/components/ConditionalHeader";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "campasso",
  description: "Discover your dream college",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ConditionalHeader />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}