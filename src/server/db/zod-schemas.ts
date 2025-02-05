import { createSelectSchema } from "drizzle-zod";
import { teensy } from "./schema";

export const selectTeensySchema = createSelectSchema(teensy);
