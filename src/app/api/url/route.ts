import { db } from "@/server/db";
import {
	expiredTeensy as expiredTeensyTable,
	globalVisits,
	teensy,
	visit,
} from "@/server/schema";
import { isDevEnvironment } from "@/utils";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const slug = url.searchParams.get("slug");

	if (!slug) {
		return new Response("Please pass a slug", { status: 404 });
	}
	const data = await db.query.teensy.findFirst({
		where: (t, { eq }) => eq(t.slug, slug),
		with: {
			visits: true,
		},
	});

	if (!data) {
		const expiredTeensy = await db.query.expiredTeensy.findFirst({
			where: (t, { eq }) => eq(t.slug, slug),
		});

		if (expiredTeensy) {
			return new Response("Slug has expired", { status: 498 });
		}
		return new Response("Slug not found", { status: 404 });
	}

	if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
		await db.insert(expiredTeensyTable).values({
			slug: data.slug,
			url: data.url,
			visitCount: data.visits.length,
			password: data.password,
			ownerId: data.ownerId,
		});
		await db.delete(teensy).where(eq(teensy.id, data.id));
		return new Response("Slug has expired", { status: 498 });
	}
	if (!isDevEnvironment) {
		await db.insert(visit).values({
			teensyId: data.id,
		});
		await db.insert(globalVisits).values({});
	}

	return new Response(JSON.stringify(data));
}
