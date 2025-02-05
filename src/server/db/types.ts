import type {
	account,
	expiredTeensy,
	globalVisits,
	session,
	teensy,
	user,
	verificationToken,
	visit,
} from "./schema";

export type Account = typeof account.$inferSelect;
export type ExpiredTeensy = typeof expiredTeensy.$inferSelect;
export type GlobalVisits = typeof globalVisits.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Teensy = typeof teensy.$inferSelect;
export type User = typeof user.$inferSelect;
export type VerificationToken = typeof verificationToken.$inferSelect;
export type Visit = typeof visit.$inferSelect;
