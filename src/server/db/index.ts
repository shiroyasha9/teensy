import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
// biome-ignore lint/style/noNamespaceImport: needed here
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client =
	globalForDb.conn ?? postgres(connectionString, { prepare: false });

if (env.NODE_ENV !== "production") {
	globalForDb.conn = client;
}

export const db = drizzle(client, { schema });
