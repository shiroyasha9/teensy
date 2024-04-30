import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@/env";
// biome-ignore lint/style/noNamespaceImport: needed here
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	pool: Pool | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is not set");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client =
	globalForDb.pool ?? new Pool({ connectionString: connectionString });

if (env.NODE_ENV !== "production") {
	globalForDb.pool = client;
}

export const db = drizzle(client, { schema });
