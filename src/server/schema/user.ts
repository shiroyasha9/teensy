import { pgTable, uniqueIndex, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const user = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("user_email_key").on(table.email),
    };
  },
);

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export type User = z.infer<typeof selectUserSchema>;
