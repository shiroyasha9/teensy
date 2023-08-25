import { getAuthSession } from "@/server/auth";
import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { db } from "../db";

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const session = await getAuthSession();

  return { req, resHeaders, session, db };
}

export type Context = inferAsyncReturnType<typeof createContext>;
