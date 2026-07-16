/**
 * 상담 상태 타입·라벨 (서버/클라이언트 공용 — server-only 금지).
 * 실제 조회 로직은 server-only 인 admin-data.ts 에 있다.
 */
export type ConsultStatus = "new" | "contacted" | "done";

export const STATUS_LABEL: Record<ConsultStatus, string> = {
  new: "신규",
  contacted: "연락완료",
  done: "상담완료",
};
