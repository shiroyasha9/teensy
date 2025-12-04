import { relations } from "drizzle-orm";
import { accounts, sessions, users } from "./auth-schema";
import { expiredTeensy, teensy, visit } from "./schema";

export const userRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	teensies: many(teensy),
	expiredTeensies: many(expiredTeensy),
}));

export const teensyRelations = relations(teensy, ({ one, many }) => ({
	owner: one(users, {
		fields: [teensy.ownerId],
		references: [users.id],
	}),
	visits: many(visit),
}));

export const visitRelations = relations(visit, ({ one }) => ({
	teensy: one(teensy, {
		fields: [visit.teensyId],
		references: [teensy.id],
	}),
}));

export const expiredTeensyRelations = relations(expiredTeensy, ({ one }) => ({
	owner: one(users, {
		fields: [expiredTeensy.ownerId],
		references: [users.id],
	}),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
