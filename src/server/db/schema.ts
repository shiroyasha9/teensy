import {
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { users } from "./auth-schema";

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
		ownerId: text().references(() => users.id, {
			onDelete: "set null",
			onUpdate: "cascade",
		}),
		visitCount: integer().default(0).notNull(),
	},
	(t) => [index("ExpiredTeensy_slug_idx").on(t.slug)],
);
