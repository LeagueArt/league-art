---
template: design-starter
version: 1.0
description: Design document for the League-Art studio website
feature: art-studio-website
date: 2026-07-05
level: Starter
---

# Art Studio Website Design

> **Created**: 2026-07-05
> **Plan**: [art-studio-website.plan.md](../../01-plan/features/art-studio-website.plan.md)

---

## Goal

League-Art 스튜디오 소개 + 포트폴리오 웹사이트를 Next.js(App Router) + TypeScript + Tailwind CSS로 구축한다.
5개 메뉴는 **별도 페이지 라우팅**, floating 아이콘은 **먼저 노출만**(링크는 추후 주입), 홈 캐러셀은 **무료 아트 이미지 3장**으로 구현한다.

---

## Decisions (확정)

| # | 항목 | 결정 |
|---|------|------|
| 1 | 메뉴 네비게이션 | 5개 **별도 페이지 라우팅** (`/`, `/about`, `/services`, `/portfolio`, `/contact`) |
| 2 | Floating 링크 | 인스타/카카오/연락처 실주소는 추후 전달 → 지금은 **아이콘 + placeholder(`#`)** 로 구현, `site-config.ts`에서 한 곳으로 교체 |
| 3 | 캐러셀 이미지 | 무료 아트 이미지 3장을 임의 선정하여 적용 (출처는 Notes 참조) |

---

## How It Works

```
[Navbar] 메뉴 클릭        → Next.js Link 라우팅       → 해당 페이지 이동 (Navbar는 항상 상단 고정)
[Home] 페이지 진입        → HeroCarousel 자동 슬라이드 → 3장 이미지 5초 간격 순환 + 좌우/인디케이터 조작
[FloatingMenu] 아이콘 클릭 → site-config의 href로 이동  → 인스타/카카오/컨택 (현재 placeholder)
[모바일] 화면 축소         → Navbar 햄버거 토글         → 오버레이 메뉴 노출
```

---

## What We Need to Build

### Routing (App Router)

| Route | 파일 | 내용 |
|-------|------|------|
| `/` | `src/app/page.tsx` | 홈 — HeroCarousel(3장) + 인트로 섹션 |
| `/about` | `src/app/about/page.tsx` | 회사소개 |
| `/services` | `src/app/services/page.tsx` | 서비스 |
| `/portfolio` | `src/app/portfolio/page.tsx` | 포트폴리오 그리드 |
| `/contact` | `src/app/contact/page.tsx` | 문의 (연락처 안내) |

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | 전역 레이아웃 — `<Navbar/>` + `{children}` + `<FloatingMenu/>` |
| `src/app/globals.css` | Tailwind 지시자 + 기본 스타일 |
| `src/components/layout/Navbar.tsx` | 상단 고정 Navbar (데스크톱 + 모바일 햄버거) |
| `src/components/layout/FloatingMenu.tsx` | 우측 하단 floating 아이콘 3개 |
| `src/components/home/HeroCarousel.tsx` | 홈 이미지 3장 캐러셀 (client component) |
| `src/lib/site-config.ts` | 메뉴 목록 · SNS/연락처 href 상수 (교체 지점) |
| `src/lib/carousel-images.ts` | 캐러셀 이미지 메타(경로/alt/출처) |
| `public/images/hero/*.jpg` | 무료 아트 이미지 3장 |

### Component Specs

**Navbar** (`components/layout/Navbar.tsx`)
- `sticky top-0 z-50` + 배경/블러, 좌측 로고(League-Art), 우측 메뉴 5개
- `NAV_ITEMS` 를 `site-config.ts`에서 map 렌더 → `next/link` 사용
- 모바일(`md:` 미만): 햄버거 버튼 → `useState` 토글 오버레이
- 현재 경로 강조(`usePathname`)

**FloatingMenu** (`components/layout/FloatingMenu.tsx`)
- `fixed bottom-6 right-6 z-50`, 세로 스택, 원형 버튼 3개
- 아이콘: Instagram, 카카오톡(말풍선), 컨택(전화/메일) — `react-icons`
- `href`는 `site-config.ts`의 placeholder(`#`) → `aria-label` 부여, 새 탭(`target="_blank" rel="noopener"`)
- hover 확대/툴팁

**HeroCarousel** (`components/home/HeroCarousel.tsx`) — `"use client"`
- 이미지 3장 `next/image` (`fill`, `priority` 첫 장)
- 5초 자동 전환(`setInterval`, cleanup), 좌/우 화살표, 하단 인디케이터 dot
- 접근성: `aria-roledescription="carousel"`, 버튼 `aria-label`, 자동재생 pause on hover

### Layout

```
┌───────────────────────────────────────────────┐
│  Navbar (sticky)  로고 | 홈 소개 서비스 포폴 문의 │
├───────────────────────────────────────────────┤
│                                               │
│   HeroCarousel  ◀  [ 이미지 1 / 2 / 3 ]  ▶     │
│                   ● ○ ○                        │
│                                               │
│   (페이지별 콘텐츠)                             │  ┌──────┐
│                                               │  │ IG   │
│                                               │  │ Kakao│ ← FloatingMenu (fixed)
│                                               │  │ 컨택 │
├───────────────────────────────────────────────┤  └──────┘
│  Footer                                       │
└───────────────────────────────────────────────┘
```

### site-config.ts (교체 지점 예시)

```ts
export const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/services" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "문의", href: "/contact" },
] as const;

// TODO: 실제 주소 전달받으면 교체
export const SOCIAL_LINKS = {
  instagram: "#",
  kakao: "#",
  contact: "#", // tel: 또는 mailto:
} as const;
```

---

## Completion Checklist

- [ ] `create-next-app`(TS + Tailwind + App Router) 초기화, `next build` 성공
- [ ] 5개 라우트 페이지 생성 및 Navbar 링크 이동 동작
- [ ] Navbar 상단 고정 + 모바일 햄버거 동작
- [ ] HeroCarousel 3장 자동/수동 전환 동작
- [ ] FloatingMenu 아이콘 3개 노출(placeholder 링크)
- [ ] 데스크톱/모바일 반응형 확인
- [ ] 브라우저 테스트

---

## Notes

- **이미지 출처**: 무료·상업적 사용 가능 소스(Unsplash/Pexels 라이선스, 저작자 표시 불필요)에서 아트 관련 3장을 선정해 `public/images/hero/`에 저장. 파일별 출처를 `carousel-images.ts` 주석에 기록.
- SNS/연락처 실주소, 실제 포트폴리오 이미지·카피는 추후 전달받아 `site-config.ts` 및 각 페이지에 반영.
- 캐러셀 라이브러리는 의존성 최소화를 위해 **경량 자체 구현** 우선. 스와이프/접근성 이슈가 크면 `embla-carousel-react`로 대체.
