/**
 * 편집 가능한 사이트 콘텐츠 스키마 + 기본값(현재 공개 페이지의 실제 카피).
 *
 * ⚠️ 여기 정의된 슬롯만 관리자 편집기(/admin/content)에 노출되고, 각 공개 페이지가
 *    이 키로 문구를 렌더한다. 편집기·서버·공개 페이지가 공유하므로 "server-only" 금지.
 *
 * 값은 목업이 아니라 실제 렌더 중인 문구다. 편집기에서 바꾸면 site_content 테이블에
 * 저장되고 공개 페이지에 반영된다(없으면 아래 기본값으로 폴백).
 */

export type ContentField = { key: string; label: string; multiline?: boolean };
export type ContentSection = { id: string; label: string; fields: ContentField[] };

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "home",
    label: "홈",
    fields: [
      { key: "home.heroEyebrow", label: "히어로 상단문구" },
      { key: "home.heroTitle", label: "히어로 제목", multiline: true },
      { key: "home.heroSubtitle", label: "히어로 부제" },
      { key: "home.introBody", label: "인트로 본문", multiline: true },
    ],
  },
  {
    id: "about",
    label: "소개",
    fields: [
      { key: "about.title", label: "페이지 제목" },
      { key: "about.intro", label: "소개 문단", multiline: true },
    ],
  },
  {
    id: "curriculum",
    label: "커리큘럼",
    fields: [
      { key: "curriculum.introHeadline", label: "인트로 헤드라인" },
    ],
  },
  {
    id: "benefit",
    label: "베네핏",
    fields: [
      { key: "benefit.title", label: "페이지 제목" },
      { key: "benefit.intro", label: "인트로 문단", multiline: true },
    ],
  },
];

/** 코드 기본값 = 현재 공개 페이지 실제 카피(폴백/시드). */
export const CONTENT_DEFAULTS: Record<string, string> = {
  "home.heroEyebrow": "FASHION PORTFOLIO ACADEMY",
  "home.heroTitle": "감각과 완성도가\n만나는 곳",
  "home.heroSubtitle": "감각을, 학교가 읽는 포트폴리오로 —",
  "home.introBody":
    "리그아트는 해외 미대·패션 스쿨 입시를 위한 포트폴리오 전문 스튜디오입니다. 학생의 현재 작업과 목표 학교에 맞춰 가장 현실적인 포트폴리오 방향을 안내합니다.",
  "about.title": "리그아트 소개",
  "about.intro":
    "해외 명문 미술대학 입학부터 포트폴리오 디벨롭, 졸업 프로젝트, 그리고 글로벌 크리에이티브 커리어까지 함께하는 프리미엄 아트 스튜디오입니다.",
  "curriculum.introHeadline": "리그아트는 현실적인 고민을 해결합니다.",
  "benefit.title": "리그아트 베네핏",
  "benefit.intro":
    "리그아트가 학생에게 제공하는 차별화된 가치와, 가장 많이 받는 질문들을 함께 담았습니다.",
};

/** 편집기가 다루는 전체 키 목록 (API 화이트리스트 검증용). */
export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS);
