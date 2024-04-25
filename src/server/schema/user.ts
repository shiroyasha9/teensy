import { pgTable, uniqueIndex, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const user = pgTable(
  "User",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { precision: 3, mode: "string" }),
    image: text("image"),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
    };
  },
);

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export type User = z.infer<typeof selectUserSchema>;
