/**
 * 히어로 메인 이미지 (전체 이미지 캐러셀).
 * 각 이미지는 그 자체로 완성된 구성(콜라주 / 디자이너 스프레드)이므로 통이미지로 노출한다.
 * 원본 비율 16:9 (2400x1350).
 */

export type HeroSlide = {
  src: string;
  alt: string;
};

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    src: "/images/hero/main-1.jpg",
    alt: "리그아트 학생들의 패션쇼 및 작업 현장 콜라주",
  },
  {
    src: "/images/hero/main-2.jpg",
    alt: "Parsons·1Granary Dialective '23 참여 디자이너 소개 스프레드",
  },
] as const;
