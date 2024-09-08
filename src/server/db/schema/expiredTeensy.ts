import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { user } from "./user";

export const expiredTeensy = pgTable(
	"ExpiredTeensy",
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 21 }),
		url: varchar("url", { length: 2000 }).notNull(),
		slug: text("slug").notNull(),
		createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		password: text("password"),
		ownerId: text("ownerId").references(() => user.id, {
			onDelete: "set null",
			onUpdate: "cascade",
		}),
		visitCount: integer("visitCount").default(0).notNull(),
	},
	(table) => {
		return {
			slugIdx: index("ExpiredTeensy_slug_idx").on(table.slug),
		};
	},
);

export const selectExpiredTeensySchema = createSelectSchema(expiredTeensy);
export const insertExpiredTeensySchema = createInsertSchema(expiredTeensy);

export type ExpiredTeensy = z.infer<typeof selectExpiredTeensySchema>;
