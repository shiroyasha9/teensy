import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const selectSessionSchema = createSelectSchema(session);
export const insertSessionSchema = createInsertSchema(session);

export type Session = z.infer<typeof selectSessionSchema>;
