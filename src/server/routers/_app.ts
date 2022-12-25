import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "../../db/client";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  slugCheck: procedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const count = await prisma.shortUrl.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: count > 0 };
    }),
  createSlug: procedure
    .input(
      z.object({
        slug: z.string(),
        url: z.string().regex(/^(?!https:\/\/smallify).*/),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.shortUrl.create({
          data: {
            slug: input.slug,
            url: input.url,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
