"use client";

import Link from "next/link";
import SignOut from "@/components/SignOut";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ConditionalHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Hide the header on the hero section (root page)
  if (pathname === "/") {
    return null;
  }

  return (
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
  );
}