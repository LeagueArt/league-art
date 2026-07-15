/**
 * 관리자 화면용 목업(mock) 데이터.
 * ⚠️ 백엔드 미연결 상태의 예시 데이터입니다. 실제 상담 신청/방문 통계는
 *    백엔드(DB/폼 서비스/애널리틱스) 연결 후 이 파일을 실제 조회로 교체합니다.
 */

export type ConsultStatus = "new" | "contacted" | "done";

export type Consult = {
  id: string;
  name: string;
  phone: string;
  grade: string;
  school: string;
  target: string;
  referrer: string;
  status: ConsultStatus;
  createdAt: string; // YYYY-MM-DD
};

export const STATUS_LABEL: Record<ConsultStatus, string> = {
  new: "신규",
  contacted: "연락완료",
  done: "상담완료",
};

export const MOCK_CONSULTS: Consult[] = [
  {
    id: "c-1042",
    name: "김서연",
    phone: "010-2345-6789",
    grade: "고등학교 2학년",
    school: "한영외국어고등학교",
    target: "Parsons · 패션 디자인",
    referrer: "이지훈",
    status: "new",
    createdAt: "2026-07-15",
  },
  {
    id: "c-1041",
    name: "박도윤",
    phone: "010-8765-4321",
    grade: "고등학교 3학년",
    school: "선화예술고등학교",
    target: "RISD · 일러스트레이션",
    referrer: "",
    status: "new",
    createdAt: "2026-07-15",
  },
  {
    id: "c-1040",
    name: "이하은",
    phone: "010-3456-1289",
    grade: "N수·재수생",
    school: "",
    target: "Central Saint Martins · 패션",
    referrer: "네이버 블로그",
    status: "contacted",
    createdAt: "2026-07-14",
  },
  {
    id: "c-1039",
    name: "최민준",
    phone: "010-9012-3456",
    grade: "고등학교 1학년",
    school: "경기고등학교",
    target: "SCAD · 그래픽 디자인",
    referrer: "김서연",
    status: "contacted",
    createdAt: "2026-07-13",
  },
  {
    id: "c-1038",
    name: "정유나",
    phone: "010-4567-8901",
    grade: "대학교 재학·편입 준비",
    school: "홍익대학교",
    target: "Parsons · MFA",
    referrer: "",
    status: "done",
    createdAt: "2026-07-12",
  },
  {
    id: "c-1037",
    name: "강시우",
    phone: "010-6789-0123",
    grade: "고등학교 3학년",
    school: "안양예술고등학교",
    target: "FIT · 패션 디자인",
    referrer: "인스타그램",
    status: "done",
    createdAt: "2026-07-11",
  },
  {
    id: "c-1036",
    name: "윤서아",
    phone: "010-1122-3344",
    grade: "해외 유학 준비",
    school: "",
    target: "Istituto Marangoni · 패션",
    referrer: "박도윤",
    status: "done",
    createdAt: "2026-07-10",
  },
  {
    id: "c-1035",
    name: "임재원",
    phone: "010-5566-7788",
    grade: "고등학교 2학년",
    school: "대전외국어고등학교",
    target: "SAIC · 파인아트",
    referrer: "",
    status: "done",
    createdAt: "2026-07-09",
  },
];

/** 대시보드 요약 지표 (mock) */
export const MOCK_STATS = {
  todayConsults: 2,
  weekConsults: 7,
  totalConsults: 128,
  weekVisitors: 1840,
  conversionRate: 4.2, // %
};

/** 최근 7일 방문자 추이 (mock) — 간단 막대 차트용 */
export const MOCK_VISITS_7D: { day: string; visitors: number }[] = [
  { day: "월", visitors: 210 },
  { day: "화", visitors: 264 },
  { day: "수", visitors: 298 },
  { day: "목", visitors: 251 },
  { day: "금", visitors: 320 },
  { day: "토", visitors: 245 },
  { day: "일", visitors: 252 },
];

// ── 방문 통계 상세 (/admin/analytics) ──────────────────
export const MOCK_MONTHLY_VISITS: { month: string; visitors: number }[] = [
  { month: "2월", visitors: 4120 },
  { month: "3월", visitors: 4980 },
  { month: "4월", visitors: 5340 },
  { month: "5월", visitors: 6210 },
  { month: "6월", visitors: 7050 },
  { month: "7월", visitors: 7840 },
];

export const MOCK_TRAFFIC_SOURCES: { source: string; visitors: number; pct: number }[] = [
  { source: "네이버 검색", visitors: 3210, pct: 41 },
  { source: "구글 검색", visitors: 1880, pct: 24 },
  { source: "직접 유입", visitors: 1250, pct: 16 },
  { source: "인스타그램", visitors: 720, pct: 9 },
  { source: "네이버 블로그", visitors: 480, pct: 6 },
  { source: "카카오", visitors: 300, pct: 4 },
];

export const MOCK_TOP_PAGES: { path: string; label: string; views: number }[] = [
  { path: "/", label: "홈", views: 9840 },
  { path: "/curriculum", label: "커리큘럼", views: 4210 },
  { path: "/admissions", label: "합격자 명단", views: 3180 },
  { path: "/about", label: "소개", views: 2760 },
  { path: "/faq", label: "베네핏 · FAQ", views: 1920 },
  { path: "/contact", label: "상담 신청", views: 1540 },
];

export const MOCK_DEVICES: { type: string; pct: number }[] = [
  { type: "모바일", pct: 68 },
  { type: "데스크탑", pct: 27 },
  { type: "태블릿", pct: 5 },
];

export const MOCK_FUNNEL: { step: string; count: number }[] = [
  { step: "방문", count: 7840 },
  { step: "상담 페이지 조회", count: 1540 },
  { step: "폼 작성 시작", count: 460 },
  { step: "상담 신청 완료", count: 328 },
];

// ── 투자자 지표 (/admin/investors) — Eqüre 데이터 파이프라인 Layer 1 ──
export const MOCK_INVESTOR_KPIS: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}[] = [
  { label: "누적 가입자", value: "1,284", delta: "+12.4% MoM", positive: true },
  { label: "상담 전환율", value: "4.2%", delta: "+0.6%p MoM", positive: true },
  { label: "데이터 동의율", value: "91%", delta: "+2%p MoM", positive: true },
  { label: "레퍼럴 비중", value: "34%", delta: "+5%p MoM", positive: true },
  { label: "CAC(추정)", value: "₩38,000", delta: "-8% MoM", positive: true },
  { label: "재방문율", value: "27%", delta: "-1%p MoM", positive: false },
];

export const MOCK_PIPELINE_FUNNEL: { step: string; count: number }[] = [
  { step: "방문(월)", count: 7840 },
  { step: "가입", count: 612 },
  { step: "상담 신청", count: 328 },
  { step: "등록 전환", count: 96 },
];

export const MOCK_REFERRAL_PERF: {
  channel: string;
  signups: number;
  conversion: number;
}[] = [
  { channel: "지인 추천", signups: 142, conversion: 38 },
  { channel: "네이버 블로그", signups: 96, conversion: 22 },
  { channel: "인스타그램", signups: 74, conversion: 18 },
  { channel: "기존 수강생", signups: 51, conversion: 41 },
];

export const MOCK_CONSENT_BREAKDOWN: { label: string; pct: number }[] = [
  { label: "필수(상담) 동의", pct: 100 },
  { label: "마케팅 수신 동의", pct: 62 },
  { label: "민감정보(멘탈케어) 별도 동의", pct: 18 },
];

// ── 콘텐츠 편집 (/admin/content) — 현재 카피(편집 초기값) ──
export const MOCK_CONTENT = {
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
