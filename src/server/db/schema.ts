import { relations } from "drizzle-orm";
import {
	index,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import type { AdapterAccount } from "next-auth/adapters";

export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"]);
export const action = pgEnum("action", [
	"ERROR",
	"TRUNCATE",
	"DELETE",
	"UPDATE",
	"INSERT",
]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
	"plain",
	"s256",
]);
export const equalityOp = pgEnum("equality_op", [
	"in",
	"gte",
	"gt",
	"lte",
	"lt",
	"neq",
	"eq",
]);
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"]);
export const factorType = pgEnum("factor_type", ["webauthn", "totp"]);
export const keyStatus = pgEnum("key_status", [
	"expired",
	"invalid",
	"valid",
	"default",
]);
export const keyType = pgEnum("key_type", [
	"stream_xchacha20",
	"secretstream",
	"secretbox",
	"kdf",
	"generichash",
	"shorthash",
	"auth",
	"hmacsha256",
	"hmacsha512",
	"aead-det",
	"aead-ietf",
]);

export const user = pgTable(
	"user",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID())
			.notNull(),
		name: text("name"),
		email: text("email").notNull(),
		emailVerified: timestamp("emailVerified", {
			mode: "date",
			withTimezone: true,
		}),
		image: text("image"),
	},
	(table) => {
		return {
			emailKey: uniqueIndex("user_email_key").on(table.email),
		};
	},
);

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account),
	sessions: many(session),
	teensies: many(teensy),
	expiredTeensies: many(expiredTeensy),
}));

export const teensy = pgTable(
	"Teensy",
	{
		id: integer("id")
			.primaryKey()
			.generatedAlwaysAsIdentity({ startWith: 808 }),
		url: varchar("url", { length: 2000 }).notNull(),
		slug: text("slug").notNull(),
		createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		ownerId: text("ownerId"),
		password: text("password"),
		expiresAt: timestamp("expiresAt", { mode: "date", withTimezone: true }),
	},
	(table) => {
		return {
			slugKey: uniqueIndex("Teensy_slug_key").on(table.slug),
			slugIdx: index("Teensy_slug_idx").on(table.slug),
		};
	},
);

export const teensyRelations = relations(teensy, ({ one, many }) => ({
	owner: one(user, {
		fields: [teensy.ownerId],
		references: [user.id],
	}),
	visits: many(visit),
}));
// Teensy_ownerId_user_id_fk;
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

export const visitRelations = relations(visit, ({ one }) => ({
	teensy: one(teensy, {
		fields: [visit.teensyId],
		references: [teensy.id],
	}),
}));

export const globalVisits = pgTable("GlobalVisits", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => nanoid()),
	createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const expiredTeensy = pgTable(
	"ExpiredTeensy",
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 21 }),
		url: varchar("url", { length: 2000 }).notNull(),
		slug: text("slug").notNull(),
		createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		password: text("password"),
		ownerId: text("ownerId").references(() => user.id, {
			onDelete: "set null",
			onUpdate: "cascade",
		}),
		visitCount: integer("visitCount").default(0).notNull(),
	},
	(table) => {
		return {
			slugIdx: index("ExpiredTeensy_slug_idx").on(table.slug),
		};
	},
);

export const expiredTeensyRelations = relations(expiredTeensy, ({ one }) => ({
	owner: one(user, {
		fields: [expiredTeensy.ownerId],
		references: [user.id],
	}),
}));

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const verificationToken = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", {
			mode: "date",
			withTimezone: true,
		}).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);
export const account = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
