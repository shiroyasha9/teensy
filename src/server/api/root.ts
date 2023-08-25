import { getExpiryDate } from "@/utils/functions";
import { z } from "zod";
import { db } from "../db";
import {
  createTRPCRouter,
  enforceUserIsAuthorized,
  protectedProcedure,
  publicProcedure,
} from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  fetchGlobalVisitsCounts: publicProcedure
    .output(z.number())
    .query(async () => {
      return await db.globalVisits.count();
    }),
  addGlobalVisit: protectedProcedure.mutation(async () => {
    await db.globalVisits.create({
      data: {},
    });
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
      const teensy = await db.teensy.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          visits: true,
        },
      });
      if (
        teensy &&
        teensy.expiresAt &&
        new Date(teensy.expiresAt) < new Date()
      ) {
        await db.expiredTeensy.create({
          data: {
            slug: teensy.slug,
            url: teensy.url,
            visitCount: teensy.visits.length,
            password: teensy.password,
            ownerId: teensy.ownerId,
          },
        });
        await db.teensy.delete({
          where: {
            id: teensy.id,
          },
        });
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
      const count = await db.teensy.findMany({
        where: {
          slug: { in: slugs },
        },
      });
      const usedSlugs = count.map((c) => c.slug);
      console.log({ usedSlugs });
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
        const { db, session } = ctx;
        await db.teensy.createMany({
          data: input.map((i) => ({
            slug: i.slug,
            url: i.url,
            ownerId: session?.user ? session.user.id : undefined,
          })),
        });
        return { success: true };
      } catch (e) {
        return { success: false };
      }
    }),
  fetchUserTeensy: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .output(
      z.object({
        id: z.number(),
        url: z.string(),
        slug: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        ownerId: z.string().nullable(),
        password: z.string().nullable(),
      }),
    )
    .query(async ({ input }) => {
      const teensy = await db.teensy.findFirstOrThrow({
        where: {
          slug: input.slug,
        },
      });
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
      const teensies = await db.teensy.findMany({
        where: { owner: { email: ctx.session.user.email } },
        orderBy: { createdAt: "desc" },
        include: { visits: true },
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
        await db.teensy.create({
          data: {
            slug: input.slug,
            url: input.url,
            ownerId: input.ownerId,
            password: input.password,
            expiresAt: input.expiresIn
              ? getExpiryDate(input.expiresIn)
              : undefined,
          },
        });
        return { success: true };
      } catch (e) {
        console.log(e);
        return { success: false };
      }
    }),
  updateSlug: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        url: z.string().regex(/^(?!https:\/\/teensy).*/),
        id: z.number(),
        password: z.string().or(z.undefined()),
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
        await db.teensy.update({
          where: {
            id: input.id,
          },
          data: {
            slug: input.slug,
            url: input.url,
            password: input.password,
          },
        });
        return { success: true };
      } catch (e) {
        console.log(e);
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
        await db.teensy.delete({
          where: {
            id: input.id,
          },
        });
        return { success: true };
      } catch (e) {
        console.log(e);
        return { success: false };
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
