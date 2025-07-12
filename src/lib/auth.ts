import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/db/prisma";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) {
          return null;
        }

        // check if user exists
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        // check password
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // if no user and password no match
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token, user, trigger }: any) {
      // set user id from token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //  if update update name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, session, user, trigger }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    async authorized({ request, auth }) {
      // Array of regex we protect
      const protectedPaths = [/\/creator/, /\/creator\/(.*)/];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
