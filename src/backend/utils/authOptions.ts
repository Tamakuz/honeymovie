import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { createUser } from "../controllers/user-controller";

export const authOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      // if (user && account) {
      //   await createUser({email: user.email, name: user.name, provider: account.provider});
      // }
      return true
    }
  }
};

export const getAuth = () => NextAuth(authOption);
