import { z } from "zod";
import { prisma } from "../db";
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
      return await prisma.globalVisits.count();
    }),
  addGlobalVisit: protectedProcedure.mutation(async () => {
    await prisma.globalVisits.create({
      data: {},
    });
  }),
  slugCheck: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/slug-check",
        summary:
          "This endpoint can be used to check if a given teensy i.e. short url is already in use",
        headers: [{ name: "secret-key", required: true }],
      },
    })
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
      const count = await prisma.teensy.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: count > 0 };
    }),
  fetchUserSlugs: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/fetch-user-slugs",
        protect: true,
        summary:
          "This endpoint can be used to fetch all the teensies of a given user.",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .output(
      z.object({
        teensies: z.array(
          z.object({
            id: z.number(),
            url: z.string(),
            slug: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            ownerId: z.string().nullable(),
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
      const teensies = await prisma.teensy.findMany({
        where: { owner: { email: ctx.session.user.email } },
        orderBy: { createdAt: "desc" },
        include: { visits: true },
      });

      return { teensies };
    }),
  createSlug: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/create-slug",
        summary: "This endpoint can be used to create a new teensy",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        slug: z.string(),
        url: z.string().regex(/^(?!https:\/\/teensy).*/),
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
        await prisma.teensy.create({
          data: {
            slug: input.slug,
            url: input.url,
            ownerId: input.ownerId,
          },
        });
        return { success: true };
      } catch (e) {
        console.log(e);
        return { success: false };
      }
    }),
  updateSlug: protectedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: "/update-slug",
        protect: true,
        summary: "This endpoint can be used to update a teensy",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        slug: z.string(),
        url: z.string().regex(/^(?!https:\/\/teensy).*/),
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
        await prisma.teensy.update({
          where: {
            id: input.id,
          },
          data: {
            slug: input.slug,
            url: input.url,
          },
        });
        return { success: true };
      } catch (e) {
        console.log(e);
        return { success: false };
      }
    }),
  deleteSlug: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/delete-slug",
        protect: true,
        summary: "This endpoint can be used to delete a teensy",
        headers: [{ name: "secret-key", required: true }],
      },
    })
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
        await prisma.teensy.delete({
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
