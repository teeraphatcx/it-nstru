import NextAuth, { type DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export type UserType = "guest" | "regular";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession["user"];
  }

  interface User {
    email?: string | null;
    id?: string;
    type: UserType;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.type = user.type;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        const id = `guest-${Date.now()}`;
        return {
          id,
          email: id,
          name: "ผู้เยี่ยมชม",
          type: "guest" as const,
        };
      },
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const identifier = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "").trim();

        const normId = identifier.toLowerCase();
        const isAdminUser =
          normId === "itspace" ||
          normId === "itspace@nstru.ac.th" ||
          normId === "itspace@chatbot.local";

        const isValidAdminPassword =
          password === "ispace123456" || password === "itspace123456";

        // เฉพาะแอดมินคนเดียวเท่านั้นที่สามารถเข้าระบบได้ด้วย itspace / ispace123456
        if (!isAdminUser || !isValidAdminPassword) {
          return null;
        }

        return {
          id: "00000000-0000-4000-8000-000000000001",
          email: "itspace",
          name: "ผู้ดูแลระบบ (Admin)",
          type: "regular" as const,
        };
      },
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
});
