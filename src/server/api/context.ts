import { getAuthSession } from "@/server/auth";
import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext({}: FetchCreateContextFnOptions) {
  const session = await getAuthSession();

  return { session };
}

export type Context = inferAsyncReturnType<typeof createContext>;
