import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      // Sign-in: stamp the token from the authorize() result.
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
        token.refreshedAt = Date.now();
        return token;
      }

      // Later requests: re-sync role/permissions from the DB at most
      // every 5 minutes so changes apply without forcing a re-login.
      const FIVE_MIN = 5 * 60 * 1000;
      const stale =
        !token.refreshedAt ||
        Date.now() - (token.refreshedAt as number) > FIVE_MIN;
      if (token.id && stale) {
        const admin = await prisma.admin.findUnique({
          where: { id: token.id as string },
          select: { role: true, permissions: true },
        });
        if (!admin) return null; // account deleted → invalidate session
        token.role = admin.role;
        token.permissions = admin.permissions;
        token.refreshedAt = Date.now();
      }
      return token;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return null;

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return null;

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          permissions: admin.permissions,
        };
      },
    }),
  ],
});
