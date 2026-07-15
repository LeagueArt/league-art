import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import ConditionalChrome from "@/components/layout/ConditionalChrome";
import JsonLd from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site-config";

// SUITE (스위트) — SIL OFL, 본문 기본 서체 (한글+라틴)
const suite = localFont({
  src: "../fonts/SUITE-Variable.woff2",
  variable: "--font-suite",
  weight: "100 900",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.seoTitle,
    template: `%s | ${SITE.nameKo} 패션유학학원`,
  },
  description: SITE.seoDescription,
  keywords: [...SITE.keywords],
  applicationName: SITE.nameKo,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: `${SITE.nameKo} 패션유학학원`,
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.nameKo} 패션유학학원`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // TODO: 네이버 서치어드바이저 / 구글 서치콘솔에서 발급받은 코드로 교체.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${suite.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <JsonLd />
        <AuthProvider>
          <ConditionalChrome>{children}</ConditionalChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
