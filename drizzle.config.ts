import type { Config } from "drizzle-kit";
import { env } from "./src/env.mjs";

export default {
	schema: "./src/server/schema/index.ts",
	driver: "pg",
	strict: true,
	verbose: true,
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
} satisfies Config;
