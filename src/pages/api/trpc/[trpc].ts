import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../db/client";
import { Joke } from "../../../types";

export const appRouter = trpc
  .router()
  .query("slugCheck", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const count = await prisma.shortUrl.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: count > 0 };
    },
  })
  .mutation("createSlug", {
    input: z.object({
      slug: z.string(),
      url: z.string().regex(/^(?!https:\/\/smallify).*/),
    }),
    async resolve({ input }) {
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
    },
  })
  .query("getJoke", {
    async resolve() {
      try {
        const res = await fetch(
          "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw",
        );
        const data = (await res.json()) as Joke;

        if (data.error) {
          throw new Error("Joke API Error");
        }

        return data;
      } catch (e) {
        console.log(e);
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
