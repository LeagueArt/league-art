import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 관리자 화면용 실데이터 조회 (서버 전용, service_role).
 *
 * 원칙:
 *  - 모든 조회는 service_role 로 서버에서만 (RLS 우회는 서버에서만).
 *  - 테이블 미생성(마이그레이션 미적용) 등 오류 시 throw 하지 않고
 *    비어있는 값 + ready:false 를 돌려줘 관리자 화면이 죽지 않게 한다.
 */

export type ConsultStatus = "new" | "contacted" | "done";

export const STATUS_LABEL: Record<ConsultStatus, string> = {
  new: "신규",
  contacted: "연락완료",
  done: "상담완료",
};

export type Consult = {
  id: string;
  name: string;
  phone: string;
  grade: string;
  school: string | null;
  target: string | null;
  referrer: string | null;
  status: ConsultStatus;
  created_at: string;
};

/** 상담 신청 목록 (최신순). ready:false = consults 테이블 미생성/조회 실패. */
export async function getConsults(): Promise<{
  rows: Consult[];
  ready: boolean;
}> {
  try {
    const svc = createAdminClient();
    const { data, error } = await svc
      .from("consults")
      .select("id, name, phone, grade, school, target, referrer, status, created_at")
      .order("created_at", { ascending: false });
    if (error) return { rows: [], ready: false };
    return { rows: (data ?? []) as Consult[], ready: true };
  } catch {
    return { rows: [], ready: false };
  }
}

/** KST 기준 오늘 0시(UTC ISO). "오늘 상담" 필터에 사용. */
function startOfTodayKstISO(): string {
  const now = new Date();
  // KST = UTC+9. UTC now + 9h 의 날짜를 구해 그 날 0시(KST)=전날 15시(UTC).
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const y = kst.getUTCFullYear();
  const m = kst.getUTCMonth();
  const d = kst.getUTCDate();
  const kstMidnightUtc = Date.UTC(y, m, d, 0, 0, 0) - 9 * 60 * 60 * 1000;
  return new Date(kstMidnightUtc).toISOString();
}

/** 대시보드/투자자 지표용 집계. 각 항목은 조회 실패 시 null. */
export async function getAdminStats(): Promise<{
  members: number | null;
  consultsTotal: number | null;
  consultsNew: number | null;
  consultsToday: number | null;
}> {
  const svc = createAdminClient();

  const members = await (async () => {
    try {
      const { count, error } = await svc
        .from("profiles")
        .select("*", { count: "exact", head: true });
      return error ? null : (count ?? 0);
    } catch {
      return null;
    }
  })();

  const consultsTotal = await (async () => {
    try {
      const { count, error } = await svc
        .from("consults")
        .select("*", { count: "exact", head: true });
      return error ? null : (count ?? 0);
    } catch {
      return null;
    }
  })();

  const consultsNew = await (async () => {
    try {
      const { count, error } = await svc
        .from("consults")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      return error ? null : (count ?? 0);
    } catch {
      return null;
    }
  })();

  const consultsToday = await (async () => {
    try {
      const { count, error } = await svc
        .from("consults")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfTodayKstISO());
      return error ? null : (count ?? 0);
    } catch {
      return null;
    }
  })();

  return { members, consultsTotal, consultsNew, consultsToday };
}

/**
 * 동의율 집계 (consents 테이블 기준).
 *  - 필수(상담/약관) 동의: 가입자 전원 = 100% (가입 트리거가 항상 기록).
 *  - 이큐어 제3자 제공 동의율: 사용자별 최신 equre_3rd_party 행의 granted=true 비율.
 */
export async function getConsentStats(): Promise<{
  members: number;
  equreGranted: number;
  equrePct: number | null;
  ready: boolean;
}> {
  try {
    const svc = createAdminClient();
    const { data, error } = await svc
      .from("consents")
      .select("user_id, granted, granted_at")
      .eq("type", "equre_3rd_party")
      .order("granted_at", { ascending: false });
    if (error) return { members: 0, equreGranted: 0, equrePct: null, ready: false };

    // 사용자별 최신 행만 채택 (내림차순 정렬이므로 첫 등장이 최신).
    const latest = new Map<string, boolean>();
    for (const row of data ?? []) {
      const uid = row.user_id as string;
      if (!latest.has(uid)) latest.set(uid, Boolean(row.granted));
    }
    const members = latest.size;
    const equreGranted = [...latest.values()].filter(Boolean).length;
    const equrePct = members > 0 ? Math.round((equreGranted / members) * 100) : null;
    return { members, equreGranted, equrePct, ready: true };
  } catch {
    return { members: 0, equreGranted: 0, equrePct: null, ready: false };
  }
}
