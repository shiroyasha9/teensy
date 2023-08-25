import { db } from "../db";

/**
 * 1. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ error, shape }) => {
    if (
      error.code === "INTERNAL_SERVER_ERROR" &&
      process.env.NODE_ENV === "production"
    ) {
      return { ...shape, message: "Internal server error" };
    }
    return shape;
  },
});

/**
 * 2. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Reusable function that enforces users are authorized to
 * make changes to the teensy before running the procedure
 */
export const enforceUserIsAuthorized = async (
  userId: string,
  teensyId: number,
) => {
  try {
    const teensy = await db.teensy.findUnique({
      where: { id: teensyId },
    });
    if (!teensy || teensy.ownerId !== userId) {
      throw new Error("Not authorized");
    }
  } catch (e) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
