import { z } from "zod";

import { prisma } from "../../db/client";
import { procedure, router } from "../trpc";

export const appRouter = router({
  slugCheck: procedure
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
      }),
    )
    .output(
      z.object({
        used: z.boolean(),
      }),
    )
    .query(async ({ input }) => {
      const count = await prisma.teeny.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: count > 0 };
    }),
  createSlug: procedure
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
      }),
    )
    .output(
      z.object({
        success: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.teeny.create({
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
});

export type AppRouter = typeof appRouter;
