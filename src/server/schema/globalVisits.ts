import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const globalVisits = pgTable("GlobalVisits", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const selectGlobalVisitsSchema = createSelectSchema(globalVisits);
export const insertGlobalVisitsSchema = createInsertSchema(globalVisits);

export type GlobalVisits = z.infer<typeof selectGlobalVisitsSchema>;
