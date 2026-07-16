/**
 * 이큐어 제3자 제공 동의 — 고지 4항목 단일 소스(회원가입 폼 · 마이페이지 공용).
 * ⚠️ 아래 값은 SQL(0001_init.sql 트리거)의 동일 값과 **일치**해야 합니다.
 *    purpose/retention은 제3자 제공 표준 문구입니다. 계약 제9조 원문이 따로 있으면
 *    그 문구로 교체하세요(법률 검토 권장).
 *
 * 참고: 이 파일은 "동의 고지 문구"일 뿐, 실제 데이터 전달을 수행하지 않습니다.
 *       전달은 동의자에 한해 equre_shared_view + (기본 OFF) export 엔드포인트로만.
 */
export const EQURE_CONSENT_TYPE = "equre_3rd_party" as const;

/**
 * 이큐어 제3자 제공 "동의 화면" 노출 여부 (회원가입·마이페이지 UI).
 * 실제 데이터 제공을 하기로 합의했을 때만 노출한다. 미설정(기본) = 숨김.
 * ⚠️ 데이터 export 토글(EQURE_SHARING_ENABLED, 서버 전용)과는 별개의 공개 플래그.
 */
export const EQURE_CONSENT_ENABLED =
  process.env.NEXT_PUBLIC_EQURE_CONSENT_ENABLED === "true";

export const EQURE_PROVISION = {
  /** 제공받는 자 */
  provider: "주식회사 이큐어(Equre Co., Ltd.)",
  /** 이용 목적 (제9조) */
  purpose:
    "이큐어의 통합 회원 관리 및 본인 식별, 맞춤형 서비스·혜택 제공, 이벤트·프로모션 등 정보 안내, 서비스 개선을 위한 통계·분석",
  /** 제공하는 개인정보 항목 */
  items: ["이름", "이메일", "연락처"] as const,
  /** 보유·이용 기간 (제9조) */
  retention:
    "제공일로부터 회원 탈퇴 또는 동의 철회 시까지. 단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관 후 파기합니다.",
} as const;
