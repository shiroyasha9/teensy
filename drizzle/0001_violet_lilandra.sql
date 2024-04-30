ALTER TABLE "User" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Teensy" DROP CONSTRAINT "Teensy_ownerId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "ExpiredTeensy" DROP CONSTRAINT "ExpiredTeensy_ownerId_User_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "User_email_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_key" ON "user" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teensy" ADD CONSTRAINT "Teensy_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ExpiredTeensy" ADD CONSTRAINT "ExpiredTeensy_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
