import NextAuth, { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    async authorized({ request, auth }) {
      // Array of regex we protect
      const protectedPaths = [/\/creator/, /\/creator\/(.*)/];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
