import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

/** robots.txt — 색인 허용 + 비공개/기능 경로 차단, 사이트맵 위치 안내. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/auth/",
        "/api/",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/mypage",
        "/contact/complete",
        "/privacy",
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
