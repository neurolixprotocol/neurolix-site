import type { MetadataRoute } from "next";

const BASE_URL = "https://neurolixprotocol.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/protocol/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/roadmap/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}