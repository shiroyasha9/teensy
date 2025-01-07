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
		id: text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID())
			.notNull(),
		name: text(),
		email: text().notNull(),
		emailVerified: timestamp({
			mode: "date",
			withTimezone: true,
		}),
		image: text(),
	},
	(t) => [uniqueIndex("user_email_key").on(t.email)],
);

export const teensy = pgTable(
	"Teensy",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 808 }),
		url: varchar({ length: 2000 }).notNull(),
		slug: text().notNull(),
		createdAt: timestamp({ mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp({ mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		ownerId: text(),
		password: text(),
		expiresAt: timestamp({ mode: "date", withTimezone: true }),
	},
	(t) => [
		uniqueIndex("Teensy_slug_key").on(t.slug),
		index("Teensy_slug_idx").on(t.slug),
	],
);

export const visit = pgTable("Visit", {
	id: text()
		.primaryKey()
		.notNull()
		.$defaultFn(() => nanoid()),
	createdAt: timestamp({ mode: "date", withTimezone: true })
		.defaultNow()
		.notNull(),
	teensyId: integer()
		.notNull()
		.references(() => teensy.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
});

export const globalVisits = pgTable("GlobalVisits", {
	id: text()
		.primaryKey()
		.notNull()
		.$defaultFn(() => nanoid()),
	createdAt: timestamp({ mode: "date", withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const expiredTeensy = pgTable(
	"ExpiredTeensy",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 21 }),
		url: varchar({ length: 2000 }).notNull(),
		slug: text().notNull(),
		createdAt: timestamp({ mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		password: text(),
		ownerId: text().references(() => user.id, {
			onDelete: "set null",
			onUpdate: "cascade",
		}),
		visitCount: integer().default(0).notNull(),
	},
	(t) => [index("ExpiredTeensy_slug_idx").on(t.slug)],
);

export const session = pgTable("session", {
	sessionToken: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expires: timestamp({ mode: "date", withTimezone: true }).notNull(),
});

export const verificationToken = pgTable(
	"verificationToken",
	{
		identifier: text().notNull(),
		token: text().notNull(),
		expires: timestamp({ mode: "date", withTimezone: true }).notNull(),
	},
	(t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const account = pgTable(
	"account",
	{
		userId: text()
			.notNull()
			.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
		type: text().$type<AdapterAccount["type"]>().notNull(),
		provider: text().notNull(),
		providerAccountId: text().notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text(),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(t) => [
		primaryKey({
			columns: [t.provider, t.providerAccountId],
		}),
	],
);
