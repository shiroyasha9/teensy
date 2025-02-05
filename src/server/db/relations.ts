import { relations } from "drizzle-orm";
import { account, expiredTeensy, session, teensy, user, visit } from "./schema";

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account),
	sessions: many(session),
	teensies: many(teensy),
	expiredTeensies: many(expiredTeensy),
}));

export const teensyRelations = relations(teensy, ({ one, many }) => ({
	owner: one(user, {
		fields: [teensy.ownerId],
		references: [user.id],
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
	owner: one(user, {
		fields: [expiredTeensy.ownerId],
		references: [user.id],
	}),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
