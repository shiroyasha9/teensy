import { z } from "zod";
import { prisma } from "../db";
import { createTRPCRouter, publicProcedure } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  slugCheck: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/slug-check",
        tags: ["slug"],
        summary:
          "This endpoint can be used to check if a given slug is already in use",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .output(
      z.object({
        used: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const count = await prisma.teensy.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: count > 0 };
    }),
  fetchUserSlugs: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/fetch-user-slugs",
        tags: ["slug"],
        summary:
          "This endpoint can be used to fetch all the slugs of a given user.",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        email: z.string(),
      })
    )
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
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const teensies = await prisma.teensy.findMany({
        where: { owner: { email: input.email } },
        orderBy: { createdAt: "desc" },
      });

      return { teensies };
    }),
  createSlug: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/create-slug",
        tags: ["slug"],
        summary: "This endpoint can be used to create a new slug i.e short url",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        slug: z.string(),
        url: z.string().regex(/^(?!https:\/\/teensy).*/),
        ownerId: z.string().optional(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
      })
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
  updateSlug: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/update-slug",
        tags: ["slug"],
        summary: "This endpoint can be used to update a slug i.e short url",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        slug: z.string(),
        url: z.string().regex(/^(?!https:\/\/teensy).*/),
        id: z.number(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
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
  deleteSlug: publicProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/delete-slug",
        tags: ["slug"],
        summary: "This endpoint can be used to delete a slug i.e short url",
        headers: [{ name: "secret-key", required: true }],
      },
    })
    .input(
      z.object({
        id: z.number(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
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
