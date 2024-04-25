import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { teensy } from "./teensy";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const visit = pgTable("Visit", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  teensyId: integer("teensyId")
    .notNull()
    .references(() => teensy.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const selectVisitSchema = createSelectSchema(visit);
export const insertVisitSchema = createInsertSchema(visit);

export type Visit = z.infer<typeof selectVisitSchema>;
