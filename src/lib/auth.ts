import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		camelCase: true,
		usePlural: true,
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_ID,
			clientSecret: env.GOOGLE_SECRET,
		},
	},
	plugins: [nextCookies()],
});
