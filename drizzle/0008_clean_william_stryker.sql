ALTER TABLE "ExpiredTeensy" DROP CONSTRAINT "ExpiredTeensy_ownerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ExpiredTeensy" ADD CONSTRAINT "ExpiredTeensy_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;