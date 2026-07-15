import { SITE, BUSINESS, SOCIAL_LINKS } from "@/lib/site-config";

/**
 * 구조화 데이터(JSON-LD) — 검색엔진에 사업체·교육기관 정보 제공.
 * Google 리치 결과 및 지식 패널 후보 노출에 도움.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: `${SITE.nameKo} 패션유학학원`,
    legalName: BUSINESS.legalName,
    alternateName: ["리그아트", "League-Art", "League Art Studio"],
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogImage}`,
    image: `${SITE.url}${SITE.ogImage}`,
    description: SITE.seoDescription,
    telephone: BUSINESS.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: BUSINESS.addressRegion,
      addressLocality: BUSINESS.addressLocality,
      streetAddress: BUSINESS.streetAddress,
      ...(BUSINESS.postalCode ? { postalCode: BUSINESS.postalCode } : {}),
    },
    areaServed: "KR",
    knowsAbout: [
      "해외 미대 입시",
      "패션 포트폴리오",
      "유학 포트폴리오",
      "의상 메이킹",
    ],
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.blog,
      BUSINESS.naverPlace,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify 결과만 주입 — 사용자 입력 없음(정적 상수)이라 안전.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
