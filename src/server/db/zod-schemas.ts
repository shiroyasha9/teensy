import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import {
	account,
	expiredTeensy,
	globalVisits,
	session,
	teensy,
	user,
	verificationToken,
	visit,
} from "./schema";

export const selectAccountSchema = createSelectSchema(account);
export const insertAccountSchema = createInsertSchema(account);

export type Account = z.infer<typeof selectAccountSchema>;

export const selectExpiredTeensySchema = createSelectSchema(expiredTeensy);
export const insertExpiredTeensySchema = createInsertSchema(expiredTeensy);

export type ExpiredTeensy = z.infer<typeof selectExpiredTeensySchema>;

export const selectGlobalVisitsSchema = createSelectSchema(globalVisits);
export const insertGlobalVisitsSchema = createInsertSchema(globalVisits);

export type GlobalVisits = z.infer<typeof selectGlobalVisitsSchema>;

export const selectSessionSchema = createSelectSchema(session);
export const insertSessionSchema = createInsertSchema(session);

export type Session = z.infer<typeof selectSessionSchema>;

export const selectTeensySchema = createSelectSchema(teensy);
export const insertTeensySchema = createInsertSchema(teensy);

export type Teensy = z.infer<typeof selectTeensySchema>;

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export type User = z.infer<typeof selectUserSchema>;

export const selectVerificationTokenSchema =
	createSelectSchema(verificationToken);
export const insertVerificationTokenSchema =
	createInsertSchema(verificationToken);

export type VerificationToken = z.infer<typeof selectVerificationTokenSchema>;

export const selectVisitSchema = createSelectSchema(visit);
export const insertVisitSchema = createInsertSchema(visit);

export type Visit = z.infer<typeof selectVisitSchema>;
