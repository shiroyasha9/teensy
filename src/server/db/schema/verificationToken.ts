import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const verificationToken = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export const selectVerificationTokenSchema =
	createSelectSchema(verificationToken);
export const insertVerificationTokenSchema =
	createInsertSchema(verificationToken);

export type VerificationToken = z.infer<typeof selectVerificationTokenSchema>;
