// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

const config = {
  reactStrictMode: true,
  swcMinify: true,
};

const withPWA = (await import("next-pwa")).default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default withPWA({
  ...config,
});
