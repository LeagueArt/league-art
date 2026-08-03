import { getAdmissions } from "@/lib/admin-data";
import AdmissionsManager from "./AdmissionsManager";

/**
 * 합격자 명단 관리 페이지 — 합격 실적을 service_role 로 조회해 관리 UI에 전달.
 * 접근 통제는 상위 /admin/layout.tsx(이메일 화이트리스트)에서 강제된다.
 */
export const dynamic = "force-dynamic";

export default async function AdminAdmissionsPage() {
  const { rows, ready } = await getAdmissions();
  return <AdmissionsManager initial={rows} ready={ready} />;
}
