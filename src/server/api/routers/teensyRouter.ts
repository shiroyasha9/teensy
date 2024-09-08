import {
	createTRPCRouter,
	enforceUserIsAuthorized,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import {
	expiredTeensy,
	globalVisits,
	teensy as teensyTable,
} from "@/server/db/schema";
import { selectTeensySchema } from "@/server/db/zod-schemas";
import { getExpiryDate } from "@/utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const teensyRouter = createTRPCRouter({
	addGlobalVisit: protectedProcedure.mutation(async () => {
		await db.insert(globalVisits).values({});
	}),
	slugCheck: publicProcedure
		.input(
			z.object({
				slug: z.string(),
			}),
		)
		.output(
			z.object({
				used: z.boolean(),
			}),
		)
		.query(async ({ input }) => {
			const teensy = await db.query.teensy.findFirst({
				where: (t, { eq }) => eq(t.slug, input.slug),
				with: {
					visits: true,
				},
			});
			if (teensy?.expiresAt && new Date(teensy.expiresAt) < new Date()) {
				await db.insert(expiredTeensy).values({
					slug: teensy.slug,
					url: teensy.url,
					visitCount: teensy.visits.length,
					password: teensy.password,
					ownerId: teensy.ownerId,
				});
				await db.delete(teensyTable).where(eq(teensyTable.id, teensy.id));
				return {
					used: false,
				};
			}

			return { used: !!teensy };
		}),
	slugCheckMultiple: publicProcedure
		.input(
			z.array(
				z.object({
					slug: z.string(),
					url: z.string(),
				}),
			),
		)
		.mutation(async ({ input }) => {
			const slugs = input.map((i) => i.slug);
			const count = await db.query.teensy.findMany({
				where: (t, { inArray }) => inArray(t.slug, slugs),
			});
			const usedSlugs = count.map((c) => c.slug);
			return { usedSlugs };
		}),
	createMultipleTeensies: publicProcedure
		.input(
			z.array(
				z.object({
					slug: z.string(),
					url: z.string().regex(/^(?!https:\/\/teensy).*/),
				}),
			),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const { session } = ctx;
				await db.insert(teensyTable).values(
					input.map((i) => ({
						slug: i.slug,
						url: i.url,
						ownerId: session?.user ? session.user.id : undefined,
					})),
				);
				return { success: true };
			} catch (_e) {
				return { success: false };
			}
		}),
	fetchUserTeensy: protectedProcedure
		.input(z.object({ slug: z.string() }))
		.output(selectTeensySchema)
		.query(async ({ input }) => {
			const teensy = await db.query.teensy.findFirst({
				where: (t, { eq }) => eq(t.slug, input.slug),
			});
			if (!teensy) {
				throw new Error("Teensy not found");
			}
			return teensy;
		}),
	fetchUserSlugs: protectedProcedure
		.input(z.void())
		.output(
			z.object({
				teensies: z.array(
					z.object({
						id: z.number(),
						url: z.string(),
						slug: z.string(),
						createdAt: z.date(),
						updatedAt: z.date(),
						expiresAt: z.date().nullable(),
						ownerId: z.string().nullable(),
						password: z.string().nullable(),
						visits: z.array(
							z.object({
								id: z.string(),
								createdAt: z.date(),
								teensyId: z.number(),
							}),
						),
					}),
				),
			}),
		)
		.query(async ({ ctx }) => {
			const teensies = await db.query.teensy.findMany({
				where: (t, { eq }) => eq(t.ownerId, ctx.session.user.id),
				orderBy: (t, { desc }) => desc(t.createdAt),
				with: { visits: true },
			});

			return { teensies };
		}),
	createSlug: publicProcedure
		.input(
			z.object({
				slug: z.string(),
				url: z.string().regex(/^(?!https:\/\/teensy).*/),
				password: z.string().or(z.undefined()),
				expiresIn: z.number().or(z.undefined()),
				ownerId: z.string().optional(),
			}),
		)
		.output(
			z.object({
				success: z.boolean(),
			}),
		)
		.mutation(async ({ input }) => {
			try {
				await db.insert(teensyTable).values({
					slug: input.slug,
					url: input.url,
					ownerId: input.ownerId,
					password: input.password,
					expiresAt: input.expiresIn
						? getExpiryDate(input.expiresIn)
						: undefined,
				});
				return { success: true };
			} catch (_e) {
				return { success: false };
			}
		}),
	updateSlug: protectedProcedure
		.input(
			z.object({
				slug: z.string(),
				url: z.string().regex(/^(?!https:\/\/teensy).*/),
				id: z.number(),
				password: z.string().or(z.undefined()).or(z.null()),
			}),
		)
		.output(
			z.object({
				success: z.boolean(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				await enforceUserIsAuthorized(ctx.session.user.id, input.id);
				await db
					.update(teensyTable)
					.set({
						slug: input.slug,
						url: input.url,
						password: input.password,
					})
					.where(eq(teensyTable.id, input.id));
				return { success: true };
			} catch (_e) {
				return { success: false };
			}
		}),
	deleteSlug: protectedProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.output(
			z.object({
				success: z.boolean(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				await enforceUserIsAuthorized(ctx.session.user.id, input.id);
				await db.delete(teensyTable).where(eq(teensyTable.id, input.id));
				return { success: true };
			} catch (_e) {
				return { success: false };
			}
		}),
});
