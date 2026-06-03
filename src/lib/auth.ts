import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
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
