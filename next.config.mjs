// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const config = {
  reactStrictMode: true,
  swcMinify: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

const withPWA = (await import("next-pwa")).default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default withPWA({
  ...config,
});
