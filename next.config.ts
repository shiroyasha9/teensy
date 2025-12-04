import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import "./src/env.js";

const config: NextConfig = {
	typescript: { ignoreBuildErrors: true },
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	experimental: {
		mdxRs: true,
	},
	reactCompiler: true,
};

// const withSerwist = withSerwistInit({
// 	swSrc: "src/sw.ts",
// 	swDest: "public/sw.js",
// 	disable: process.env.NODE_ENV === "development",
// });

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

// export default withSerwist(withMdx(config));
export default withMDX(config);
