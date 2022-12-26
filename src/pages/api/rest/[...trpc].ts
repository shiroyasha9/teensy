import { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";

import { appRouter } from "../../../server/routers/_app";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  if (req.headers["secret-key"] !== process.env.SECRET_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  return createOpenApiNextHandler({
    router: appRouter,
    createContext: () => ({}),
  })(req, res);
};

export default handler;
