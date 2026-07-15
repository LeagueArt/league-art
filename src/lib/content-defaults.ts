/**
 * 콘텐츠 편집기(/admin/content)의 초기값 = 현재 공개 페이지 카피.
 * ⚠️ 목업이 아니라 실제 사이트 문구다. CMS/DB 연동 시 이 값을 초기 시드로 사용하고,
 *    저장 후에는 공개 페이지가 DB 값에서 렌더되도록 교체한다.
 */
export const CONTENT = {
  home: {
    heroEyebrow: "FASHION PORTFOLIO ACADEMY",
    heroTitle: "감각과 완성도가\n만나는 곳",
    heroSubtitle: "감각을, 학교가 읽는 포트폴리오로 —",
    introHeadline: "해외 미대·패션 스쿨 입시, 포트폴리오로 증명합니다",
    introBody:
      "리그아트는 해외 미대·패션 스쿨 입시를 위한 포트폴리오 전문 스튜디오입니다. 학생의 현재 작업과 목표 학교에 맞춰 가장 현실적인 포트폴리오 방향을 안내합니다.",
  },
  about: {
    headline: "단순한 수업을 넘어, 결과까지 책임집니다.",
    greeting:
      "리그아트는 Parsons School of Design 석사 출신 원장의 직접 지도 아래, 뉴욕 현지의 미대·패션스쿨 평가 기준을 바탕으로 포트폴리오 방향성을 설계하는 프리미엄 유학미술 포트폴리오 스튜디오입니다.",
  },
  curriculum: {
    headline: "리그아트는 현실적인 고민을 해결합니다.",
    intro:
      "해외 미대 입시를 준비하는 학생들이 가장 많이 막히는 지점은 단순히 '작품을 어떻게 만들까'가 아닙니다.",
  },
  benefit: {
    headline: "리그아트 베네핏",
    intro:
      "리그아트가 학생에게 제공하는 차별화된 가치와, 가장 많이 받는 질문들을 함께 담았습니다.",
  },
} as const;
