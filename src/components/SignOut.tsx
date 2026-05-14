"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      Sign Out
    </button>
  );
}
