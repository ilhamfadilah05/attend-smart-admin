import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import { pagesOptions } from "./pages-options";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  debug: env.NODE_ENV === "development",
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const response = await axios.post(`${env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { accessToken, user } = response?.data?.data || {};

          if (user) {
            return {
              ...user,
              accessToken,
            };
          }
        } catch (error) {
          throw error;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = token.user as Record<string, any>;

      return {
        ...session,
        user,
      };
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      let result = baseUrl;
      if (parsedUrl.searchParams.has("callbackUrl")) {
        result = `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      } else if (parsedUrl.origin === baseUrl) {
        result = url;
      }

      return result;
    },
  },
};
