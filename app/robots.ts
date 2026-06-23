import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://neurolixprotocol.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/protocol/", "/roadmap/"],
        disallow: ["/tokenomics/", "/governance/", "/legacy/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}