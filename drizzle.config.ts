import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema/index.ts",
	out: "./drizzle",
	dialect: "postgresql",
	strict: true,
	verbose: true,
	dbCredentials: {
		url: env.DATABASE_URL,
	},
} satisfies Config;
