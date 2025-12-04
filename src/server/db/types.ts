import type { accounts, sessions, users, verifications } from "./auth-schema";
import type { expiredTeensy, globalVisits, teensy, visit } from "./schema";

export type Account = typeof accounts.$inferSelect;
export type ExpiredTeensy = typeof expiredTeensy.$inferSelect;
export type GlobalVisits = typeof globalVisits.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Teensy = typeof teensy.$inferSelect;
export type User = typeof users.$inferSelect;
export type Verification = typeof verifications.$inferSelect;
export type Visit = typeof visit.$inferSelect;
