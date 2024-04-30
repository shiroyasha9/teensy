import withMdxInit from "@next/mdx";
import withSerwistInit from "@serwist/next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	experimental: {
		mdxRs: true,
	},
};

const withSerwist = withSerwistInit({
	swSrc: "src/sw.ts",
	swDest: "public/sw.js",
	disable: process.env.NODE_ENV === "development",
});

const withMdx = withMdxInit({});

export default withSerwist(withMdx(config));
