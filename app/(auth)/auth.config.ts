import type { NextAuthConfig } from "next-auth";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const authConfig = {
  basePath: "/api/auth",
  callbacks: {},
  pages: {
    newUser: `${base}/`,
    signIn: `${base}/login`,
  },
  providers: [],
  secret: process.env.AUTH_SECRET ?? "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  trustHost: true,
} satisfies NextAuthConfig;
