import { generateOpenApiDocument } from "trpc-openapi";
import { getBaseUrl } from "../utils/trpc";

import { appRouter } from "./routers/_app";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Teensy API",
  description: "OpenAPI compliant API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: `${getBaseUrl()}/api/rest`,
  tags: ["slug"],
});
