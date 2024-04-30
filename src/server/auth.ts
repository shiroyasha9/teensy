import { getServerSession, type NextAuthOptions } from "next-auth";
import { db } from "@/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
		signOut: "/login",
	},
	session: {
		strategy: "jwt",
	},
	// Include user.id on session
	callbacks: {
		session({ session, token }) {
			if (token) {
				session.user.id = token.id;
			}
			return session;
		},
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	// Configure one or more authentication providers
	adapter: DrizzleAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
		/**
		 * ...add more providers here
		 *
		 * For example, the GitHub provider requires you to add the
		 * `refresh_token_expires_in` field to the Account model. Refer to the
		 * NextAuth.js docs for the provider you want to use. Example:
		 * @see https://next-auth.js.org/providers/github
		 */
	],
};

export const getAuthSession = () => getServerSession(authOptions);
