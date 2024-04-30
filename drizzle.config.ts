import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/schema/index.ts",
	driver: "pg",
	strict: true,
	verbose: true,
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
} satisfies Config;
