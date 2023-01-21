import type { NextApiRequest, NextApiResponse } from "next";

import { openApiDocument } from "../../server/api/openapi";

const hander = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(openApiDocument);
};

export default hander;
