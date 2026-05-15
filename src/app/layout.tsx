import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import SignOut from "@/components/SignOut";
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
          <header className="bg-white border-b sticky top-0 z-20">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-gray-900">
                  campasso
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {session?.user ? (
                  <>
                    <span className="text-sm text-gray-600">
                      {session.user.name || session.user.email}
                    </span>
                    <SignOut />
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </header>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}