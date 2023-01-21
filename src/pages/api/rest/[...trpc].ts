import type { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";

import { createOpenApiNextHandler } from "trpc-openapi";

import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await cors(req, res);

  if (req.headers["secret-key"] !== process.env.SECRET_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  return createOpenApiNextHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
