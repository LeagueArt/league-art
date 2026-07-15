---
template: plan
version: 1.2
description: PDCA Plan phase document for the League-Art studio website
feature: art-studio-website
date: 2026-07-05
author: sophia-hye
project: league-art
version: 0.1.0
---

# Art Studio Website Planning Document

> **Summary**: 아트 스튜디오 브랜드/기업 소개 겸 포트폴리오 웹사이트. 상단 고정 Navbar(메뉴 5개), 우측 하단 floating menu(인스타/카카오톡/컨택), 홈 히어로 이미지 3개 캐러셀.
>
> **Project**: league-art
> **Version**: 0.1.0
> **Author**: sophia-hye
> **Date**: 2026-07-05
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

League-Art 스튜디오의 브랜드/기업 소개와 포트폴리오를 함께 담는 공식 웹사이트를 구축한다.
방문자가 스튜디오의 정체성과 서비스를 이해하고, 작업물을 감상한 뒤, 손쉽게 문의로 연결되도록 하는 것이 목표다.

### 1.2 Background

- 아트 스튜디오는 시각적 첫인상이 곧 신뢰로 이어지므로, 이미지 중심의 감각적인 랜딩이 필요하다.
- 잠재 고객이 SNS/메신저에 익숙하므로, 어느 페이지에서든 즉시 접근 가능한 floating 연락 수단이 전환율을 높인다.
- 포트폴리오와 서비스 소개를 하나의 사이트에서 제공해 브랜딩과 세일즈를 동시에 달성한다.

### 1.3 Related Documents

- Requirements: 본 문서 (사용자 구두 요구사항 기반)
- References: 후속 `docs/02-design/features/art-studio-website.design.md` (예정)

---

## 2. Scope

### 2.1 In Scope

- [ ] 상단 고정(sticky) Navbar — 메뉴 5개: 홈 · 회사소개 · 서비스 · 포트폴리오 · 문의
- [ ] 홈(랜딩) 페이지 히어로 영역 — 이미지 3개 자동/수동 캐러셀
- [ ] 우측 하단 floating menu — 인스타그램, 카카오톡, 컨택(전화/이메일) 아이콘
- [ ] 반응형 레이아웃 (모바일/태블릿/데스크톱)
- [ ] 5개 메뉴에 대응하는 페이지 또는 스크롤 섹션 골격

### 2.2 Out of Scope

- 백엔드/데이터베이스, 회원 인증, 관리자 CMS (정적 콘텐츠로 시작)
- 실제 문의 폼 서버 처리(메일 발송 등) — 초기엔 mailto/외부 링크로 대체
- 다국어(i18n), 결제, 검색 기능

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 상단 Navbar가 스크롤 시에도 상단에 고정되고, 메뉴 5개(홈/회사소개/서비스/포트폴리오/문의)로 이동한다 | High | Pending |
| FR-02 | 모바일에서 Navbar가 햄버거 메뉴로 전환된다 | High | Pending |
| FR-03 | 홈 히어로에 이미지 3개가 캐러셀로 순환한다(자동 슬라이드 + 좌우/인디케이터 조작) | High | Pending |
| FR-04 | 우측 하단 floating menu에 인스타/카카오톡/컨택 아이콘을 항상 노출한다 | High | Pending |
| FR-05 | floating 아이콘 클릭 시 각각 인스타 프로필, 카카오톡 채널, 컨택(전화/이메일)로 연결된다 | High | Pending |
| FR-06 | 회사소개/서비스/포트폴리오/문의 페이지(또는 섹션) 골격을 제공한다 | Medium | Pending |
| FR-07 | 전 페이지 반응형 대응 | High | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | LCP < 2.5s, 이미지 최적화(next/image) | Lighthouse |
| Accessibility | WCAG 2.1 AA (aria-label, 키보드 포커스, 대비) | Lighthouse / axe |
| SEO | 메타태그, OpenGraph, 시맨틱 마크업 | Lighthouse |
| Responsive | 320px~1440px 무깨짐 | 브라우저/DevTools |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] 모든 High 우선순위 기능 요구사항 구현
- [ ] 5개 메뉴 라우팅/스크롤 동작 확인
- [ ] 캐러셀·floating menu 동작 확인
- [ ] 반응형 확인(모바일/데스크톱)
- [ ] README/문서 갱신

### 4.2 Quality Criteria

- [ ] `next build` 성공, lint 에러 0
- [ ] Lighthouse 성능/접근성 90+ 목표
- [ ] 핵심 컴포넌트(Navbar, Carousel, FloatingMenu) 단위 테스트

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 캐러셀 이미지 미확보 | Medium | Medium | 플레이스홀더 이미지로 선구현 후 교체 |
| SNS/카카오/연락처 실주소 미정 | Medium | High | 설정 상수(config)로 분리해 나중에 교체 용이하게 |
| 캐러셀 자체 구현 시 접근성/터치 이슈 | Medium | Medium | 검증된 라이브러리(embla-carousel 등) 채택 검토 |
| 5개 페이지 vs 단일 스크롤 방식 미확정 | Low | Medium | Design 단계에서 라우팅 방식 확정 |

---

## 6. Architecture Considerations

### 6.1 Project Level Selection

| Level | Characteristics | Recommended For | Selected |
|-------|-----------------|-----------------|:--------:|
| **Starter** | Simple structure (`components/`, `lib/`, `types/`) | Static sites, portfolios, landing pages | ☑ |
| **Dynamic** | Feature-based modules, BaaS integration (bkend.ai) | Web apps with backend, SaaS MVPs | ☐ |
| **Enterprise** | Strict layer separation, DI, microservices | High-traffic systems | ☐ |

> 백엔드 없이 정적 콘텐츠 중심의 포트폴리오/소개 사이트이므로 **Starter** 레벨을 선택. 추후 문의 폼 서버 처리 등이 필요해지면 Dynamic으로 확장.

### 6.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Framework | Next.js / React / Vue | **Next.js (App Router)** | SEO/이미지 최적화/파일 기반 라우팅에 유리 |
| Language | TypeScript / JavaScript | **TypeScript** | 타입 안정성, 사용자 요구 |
| Styling | Tailwind / CSS Modules / styled-components | **Tailwind CSS** | 반응형/고정 Navbar/floating 배치 신속 구현, 사용자 요구 |
| Carousel | embla-carousel / swiper / 직접 구현 | **embla-carousel (검토)** | 경량·접근성·터치 지원 |
| Icons | lucide-react / react-icons | **react-icons** | 인스타/카카오 등 브랜드 아이콘 확보 용이 |
| Testing | Jest / Vitest / Playwright | **Vitest + Playwright** | 단위 + E2E |

### 6.3 Clean Architecture Approach

```
Selected Level: Starter

Folder Structure Preview:
src/
  app/                      # App Router 페이지 (/, /about, /services, /portfolio, /contact)
    layout.tsx              # Navbar + FloatingMenu 전역 배치
    page.tsx                # 홈(캐러셀)
    about/ services/ portfolio/ contact/
  components/
    layout/Navbar.tsx
    layout/FloatingMenu.tsx
    home/HeroCarousel.tsx
  lib/site-config.ts        # 메뉴/SNS/연락처 상수
  types/
public/images/             # 캐러셀·포트폴리오 이미지
```

---

## 7. Convention Prerequisites

### 7.1 Existing Project Conventions

- [ ] `CLAUDE.md` 코딩 컨벤션 섹션 (프로젝트 루트 — 미생성)
- [ ] `docs/01-plan/conventions.md` (Phase 2 산출물 — 미생성)
- [ ] ESLint (`.eslintrc.*` — Next.js init 시 생성 예정)
- [ ] Prettier (`.prettierrc` — 예정)
- [ ] TypeScript (`tsconfig.json` — Next.js init 시 생성)

### 7.2 Conventions to Define/Verify

| Category | Current State | To Define | Priority |
|----------|---------------|-----------|:--------:|
| **Naming** | missing | 컴포넌트 PascalCase, 파일 kebab/PascalCase 통일 | High |
| **Folder structure** | missing | 위 6.3 구조 채택 | High |
| **Import order** | missing | 외부 → 내부(@/) → 상대 | Medium |
| **Config 상수** | missing | `lib/site-config.ts`에 메뉴/SNS/연락처 집약 | High |

### 7.3 Environment Variables Needed

| Variable | Purpose | Scope | To Be Created |
|----------|---------|-------|:-------------:|
| (없음 - 정적 사이트) | 초기 단계 불필요 | - | ☐ |

### 7.4 Pipeline Integration

| Phase | Status | Document Location | Command |
|-------|:------:|-------------------|---------|
| Phase 1 (Schema) | N/A | 정적 사이트, DB 없음 | - |
| Phase 2 (Convention) | ☐ | `docs/01-plan/conventions.md` | `/pipeline-next` |

---

## 8. Next Steps

1. [ ] Design 문서 작성 (`/pdca design art-studio-website`) — 라우팅 방식, 컴포넌트 명세, 캐러셀/floating 상세
2. [ ] SNS/카카오/연락처 실주소 및 캐러셀 이미지 확보
3. [ ] 구현 시작 (`/pdca do art-studio-website`)

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-07-05 | Initial draft | sophia-hye |
