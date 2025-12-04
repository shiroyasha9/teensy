"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import {
	expiredTeensy as expiredTeensyTable,
	globalVisits,
	teensy,
	visit,
} from "@/server/db/schema";
import { isDevEnvironment } from "@/utils";

export const revalidateUrlPath = async (path: string) => {
	await revalidatePath(path);
};

export const handleTeensyVisit = async (slug: string | null | undefined) => {
	if (!slug) {
		return {
			status: 404,
			data: null,
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
			return {
				status: 498,
				data: null,
			};
		}

		return {
			status: 404,
			data: null,
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
			status: 498,
			data: null,
		};
	}
	if (!isDevEnvironment) {
		await db.insert(visit).values({
			teensyId: data.id,
		});
		await db.insert(globalVisits).values({});
	}

	return {
		status: 200,
		data,
	};
};
