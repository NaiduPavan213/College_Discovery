import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};