ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "expires" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "Visit" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "GlobalVisits" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "expires" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "Teensy" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "Teensy" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "Teensy" ALTER COLUMN "expiresAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "ExpiredTeensy" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;