import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./routers/_app";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Smallify API",
  description: "OpenAPI compliant API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api/rest",
  tags: ["slug"],
});
