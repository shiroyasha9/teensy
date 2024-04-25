import { pgEnum } from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "expired",
  "invalid",
  "valid",
  "default",
]);
export const keyType = pgEnum("key_type", [
  "stream_xchacha20",
  "secretstream",
  "secretbox",
  "kdf",
  "generichash",
  "shorthash",
  "auth",
  "hmacsha256",
  "hmacsha512",
  "aead-det",
  "aead-ietf",
]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
]);
export const action = pgEnum("action", [
  "ERROR",
  "TRUNCATE",
  "DELETE",
  "UPDATE",
  "INSERT",
]);
export const equalityOp = pgEnum("equality_op", [
  "in",
  "gte",
  "gt",
  "lte",
  "lt",
  "neq",
  "eq",
]);
export const factorType = pgEnum("factor_type", ["webauthn", "totp"]);
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"]);
export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"]);
