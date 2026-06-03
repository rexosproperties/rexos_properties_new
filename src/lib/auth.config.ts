import type { NextAuthConfig } from "next-auth";
import { canAccessSection, sectionForPath } from "./permissions";

export const authConfig = {
  pages: { signIn: "/rexos-staff/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const path = nextUrl.pathname;
      const isProtected =
        path.startsWith("/rexos-staff") && path !== "/rexos-staff/login";
      if (!isProtected) return true;

      const user = auth?.user;
      if (!user) return false;

      const section = sectionForPath(path);
      return canAccessSection(
        user.role ?? "staff",
        user.permissions ?? [],
        section,
      );
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.id) session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "staff";
        session.user.permissions = (token.permissions as string[]) ?? [];
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
