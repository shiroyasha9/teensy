import { drizzle } from "drizzle-orm/postgres-js";
// biome-ignore lint/style/noNamespaceImport: needed here
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

export const db = drizzle({
	connection: connectionString,
	schema,
	casing: "camelCase",
});
