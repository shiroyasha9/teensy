import {
	index,
	pgEnum,
	pgTable,
	primaryKey,
	uniqueIndex,
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
	(t) => ({
		id: t
			.text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID())
			.notNull(),
		name: t.text(),
		email: t.text().notNull(),
		emailVerified: t.timestamp({
			mode: "date",
			withTimezone: true,
		}),
		image: t.text(),
	}),
	(t) => ({
		emailKey: uniqueIndex("user_email_key").on(t.email),
	}),
);

export const teensy = pgTable(
	"Teensy",
	(t) => ({
		id: t.integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 808 }),
		url: t.varchar({ length: 2000 }).notNull(),
		slug: t.text().notNull(),
		createdAt: t
			.timestamp({ mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: t
			.timestamp({ mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		ownerId: t.text(),
		password: t.text(),
		expiresAt: t.timestamp({ mode: "date", withTimezone: true }),
	}),
	(t) => ({
		slugKey: uniqueIndex("Teensy_slug_key").on(t.slug),
		slugIdx: index("Teensy_slug_idx").on(t.slug),
	}),
);

// Teensy_ownerId_user_id_fk;
export const visit = pgTable("Visit", (t) => ({
	id: t
		.text()
		.primaryKey()
		.notNull()
		.$defaultFn(() => nanoid()),
	createdAt: t
		.timestamp({ mode: "date", withTimezone: true })
		.defaultNow()
		.notNull(),
	teensyId: t
		.integer()
		.notNull()
		.references(() => teensy.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
}));

export const globalVisits = pgTable("GlobalVisits", (t) => ({
	id: t
		.text()
		.primaryKey()
		.notNull()
		.$defaultFn(() => nanoid()),
	createdAt: t
		.timestamp({ mode: "date", withTimezone: true })
		.defaultNow()
		.notNull(),
}));

export const expiredTeensy = pgTable(
	"ExpiredTeensy",
	(t) => ({
		id: t.integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 21 }),
		url: t.varchar({ length: 2000 }).notNull(),
		slug: t.text().notNull(),
		createdAt: t
			.timestamp({ mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		password: t.text(),
		ownerId: t.text().references(() => user.id, {
			onDelete: "set null",
			onUpdate: "cascade",
		}),
		visitCount: t.integer().default(0).notNull(),
	}),
	(t) => ({
		slugIdx: index("ExpiredTeensy_slug_idx").on(t.slug),
	}),
);

export const session = pgTable("session", (t) => ({
	sessionToken: t.text().primaryKey(),
	userId: t
		.text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expires: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
}));

export const verificationToken = pgTable(
	"verificationToken",
	(t) => ({
		identifier: t.text().notNull(),
		token: t.text().notNull(),
		expires: t
			.timestamp({
				mode: "date",
				withTimezone: true,
			})
			.notNull(),
	}),
	(t) => ({
		compoundKey: primaryKey({ columns: [t.identifier, t.token] }),
	}),
);

export const account = pgTable(
	"account",
	(t) => ({
		userId: t
			.text()
			.notNull()
			.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
		type: t.text().$type<AdapterAccount["type"]>().notNull(),
		provider: t.text().notNull(),
		providerAccountId: t.text().notNull(),
		refresh_token: t.text("refresh_token"),
		access_token: t.text("access_token"),
		expires_at: t.integer("expires_at"),
		token_type: t.text("token_type"),
		scope: t.text(),
		id_token: t.text("id_token"),
		session_state: t.text("session_state"),
	}),
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);
