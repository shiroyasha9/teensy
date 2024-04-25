import { pgTable, uniqueIndex, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const verificationToken = pgTable(
  "VerificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
      identifierTokenKey: uniqueIndex(
        "VerificationToken_identifier_token_key",
      ).on(table.identifier, table.token),
    };
  },
);

export const selectVerificationTokenSchema =
  createSelectSchema(verificationToken);
export const insertVerificationTokenSchema =
  createInsertSchema(verificationToken);

export type VerificationToken = z.infer<typeof selectVerificationTokenSchema>;
