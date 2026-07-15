/**
 * 사이트 전역 상수 — 메뉴 / CTA / SNS / 연락처.
 * SNS·연락처 실제 주소는 추후 전달받아 이 파일 한 곳만 교체하면 된다.
 */

export const SITE = {
  name: "League-Art",
  nameKo: "리그아트",
  tagline: "Fashion Portfolio Academy",
  description:
    "리그아트는 해외 미대·패션 스쿨 입시를 위한 포트폴리오 전문 스튜디오입니다. 학생의 현재 작업과 목표 학교에 맞춰 가장 현실적인 포트폴리오 방향을 안내합니다.",

  // ── SEO ──────────────────────────────────────────────
  // TODO: 실제 배포 도메인 확정 시 환경변수 NEXT_PUBLIC_SITE_URL 설정(또는 아래 기본값 교체).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.league-art.kr").replace(
    /\/$/,
    "",
  ),
  // 네이버/구글 자연 노출용 한글 타이틀·설명 (검색 의도 키워드 반영)
  seoTitle: "리그아트 패션유학학원 | 강남 패션유학 포트폴리오 & 메이킹 전문",
  seoDescription:
    "강남 서초동 리그아트 패션유학학원. 파슨스·CSM 출신 지도진의 1:4 밀착 지도로 해외 미대·패션스쿨(Parsons, FIT, CSM, RISD, SCAD 등) 입시 포트폴리오와 의상 메이킹을 전문으로 준비합니다. 무료 포트폴리오 리뷰 상담.",
  keywords: [
    "패션유학",
    "패션유학학원",
    "강남 패션유학",
    "해외 미대 입시",
    "포트폴리오 학원",
    "패션 포트폴리오",
    "유학 포트폴리오",
    "파슨스 포트폴리오",
    "CSM 포트폴리오",
    "리그아트",
    "서초동 미술학원",
    "의상 메이킹",
  ],
  ogImage: "/images/hero/hero-main.jpg",
} as const;

/**
 * 사업자·오프라인 정보 — 구조화 데이터(JSON-LD)와 SEO에 사용.
 * TODO: [ ] 항목은 사업자 확정 정보로 교체 (상호/도로명 주소/우편번호/사업자등록번호).
 */
export const BUSINESS = {
  legalName: "리그아트", // [ ] 사업자등록 상호로 교체
  phoneDisplay: "0507-1319-1038",
  addressRegion: "서울특별시",
  addressLocality: "강남구", // 서초동 소재 (행정구역 확정 시 조정)
  streetAddress: "서초동", // [ ] 도로명 상세 주소로 교체
  postalCode: "", // [ ] 우편번호
  naverPlace:
    "https://map.naver.com/p/entry/place/2023581297",
} as const;

export type NavItem = { label: string; href: string };

/** 상단 네비게이션 (정보 링크 4개) */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "소개", href: "/about" },
  { label: "커리큘럼", href: "/curriculum" },
  { label: "합격자 명단", href: "/admissions" },
  { label: "베네핏", href: "/faq" },
] as const;

/** 전환 CTA — 네비게이션과 시각적으로 분리되는 레드 버튼 */
export const CTA_ITEM: NavItem = { label: "상담 신청", href: "/contact" };

/** SNS·연락처 실제 주소. */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/league_art_/",
  kakao: "https://pf.kakao.com/_zjexfX/friend",
  blog: "https://blog.naver.com/league_art",
  location:
    "https://map.naver.com/p/entry/place/2023581297?placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607151019%26locale%3Dko%26svcName%3Dmap_pcv5&c=15.00,0,0,0,dh",
  phone: "tel:0507-1319-1038",
} as const;
