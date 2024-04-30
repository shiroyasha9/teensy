import "server-only";

import { db } from "@/server/db";
import {
	expiredTeensy as expiredTeensyTable,
	globalVisits,
	teensy,
	visit,
} from "@/server/db/schema";
import { isDevEnvironment } from "@/utils";
import { eq } from "drizzle-orm";

export const checkSlug = async (slug: string) => {
	if (!slug) {
		return {
			data: null,
			status: 404,
		};
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
			// slug has expired
			return {
				data: null,
				status: 498,
			};
		}
		return {
			// slug not found
			data: null,
			status: 404,
		};
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
		return {
			// slug has expired
			data: null,
			status: 498,
		};
	}

	if (!isDevEnvironment) {
		await db.insert(visit).values({
			teensyId: data.id,
		});
		await db.insert(globalVisits).values({});
	}

	return {
		data,
		status: 200,
	};
};
