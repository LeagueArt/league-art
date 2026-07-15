import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

/** 검색엔진 크롤링용 사이트맵. 공개 색인 대상 페이지만 포함. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/curriculum", priority: 0.9, changeFrequency: "monthly" },
    { path: "/admissions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
