import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/protected/", "/api/"],
		},
		sitemap: "https://teensy.tech/sitemap.xml",
	};
}
