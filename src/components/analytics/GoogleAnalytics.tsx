import Script from "next/script";

/**
 * 기본 방문분석(GA4) 연동 — 계약 별첨 A 6항.
 *
 * 리그아트가 GA 측정 ID(G-XXXXXXX)를 발급해 환경변수 NEXT_PUBLIC_GA_MEASUREMENT_ID 로
 * 주입하면 전 페이지에 표준 gtag 추적 스크립트가 삽입된다. 미설정 시에는 아무것도
 * 렌더하지 않아(사이트는 정상 동작) 개발·미연동 상태에서도 문제가 없다.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
