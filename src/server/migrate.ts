import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, client } from "./db";

async function main() {
	// biome-ignore lint/suspicious/noConsoleLog: This is a dev script
	console.log("Running migrations");
	await migrate(db, { migrationsFolder: "drizzle" });
	// biome-ignore lint/suspicious/noConsoleLog: This is a dev script
	console.log("Migrations finished");
	await client.end();
}

void main().catch((e) => {
	console.error("Error running migrations");
	console.error(e);
	process.exit(1);
});
