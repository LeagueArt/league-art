import { getSiteContent } from "@/lib/site-content";
import ContentEditor from "./ContentEditor";

/**
 * 콘텐츠 편집 페이지 — 현재 저장된 값을 로드해 편집기에 전달(서버 컴포넌트).
 * 편집기는 /api/admin/content 로 저장하고, 저장 시 공개 페이지가 재검증된다.
 */
export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await getSiteContent();
  return <ContentEditor initial={content} />;
}
