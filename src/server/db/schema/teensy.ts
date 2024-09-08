import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { user } from "./user";

export const teensy = pgTable(
	"Teensy",
	{
		id: integer("id")
			.primaryKey()
			.generatedAlwaysAsIdentity({ startWith: 808 }),
		url: varchar("url", { length: 2000 }).notNull(),
		slug: text("slug").notNull(),
		createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		ownerId: text("ownerId").references(() => user.id, {
			onDelete: "set null",
			onUpdate: "cascade",
		}),
		password: text("password"),
		expiresAt: timestamp("expiresAt", { mode: "date", withTimezone: true }),
	},
	(table) => {
		return {
			slugKey: uniqueIndex("Teensy_slug_key").on(table.slug),
			slugIdx: index("Teensy_slug_idx").on(table.slug),
		};
	},
);

export const selectTeensySchema = createSelectSchema(teensy);
export const insertTeensySchema = createInsertSchema(teensy);

export type Teensy = z.infer<typeof selectTeensySchema>;
