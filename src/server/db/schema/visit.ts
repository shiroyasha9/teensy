import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import type { z } from "zod";
import { teensy } from "./teensy";

export const visit = pgTable("Visit", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => nanoid()),
	createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
		.defaultNow()
		.notNull(),
	teensyId: integer("teensyId")
		.notNull()
		.references(() => teensy.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
});

export const selectVisitSchema = createSelectSchema(visit);
export const insertVisitSchema = createInsertSchema(visit);

export type Visit = z.infer<typeof selectVisitSchema>;
