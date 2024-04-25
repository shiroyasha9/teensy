import { pgTable, uniqueIndex, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const session = pgTable(
  "Session",
  {
    id: text("id").primaryKey().notNull(),
    sessionToken: text("sessionToken").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  (table) => {
    return {
      sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(
        table.sessionToken,
      ),
    };
  },
);

export const selectSessionSchema = createSelectSchema(session);
export const insertSessionSchema = createInsertSchema(session);

export type Session = z.infer<typeof selectSessionSchema>;
