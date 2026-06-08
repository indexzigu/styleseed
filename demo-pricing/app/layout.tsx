import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://styleseed-demo.vercel.app";
const SITE_NAME = "StyleSeed";
const SITE_DESC =
  "Design engine for vibe coding — it teaches Claude Code and Cursor design judgment (69 rules), not just components. A drop-in React design system with 7 brand skins and a named motion system. MIT licensed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "StyleSeed — Design engine for vibe coding",
    template: "%s · StyleSeed",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "design system",
    "vibe coding",
    "vibe coding design system",
    "Claude Code",
    "Cursor",
    "shadcn alternative",
    "Tailwind UI",
    "framer motion presets",
    "AI design",
    "Toss design",
    "design tokens",
    "디자인 시스템",
    "AI 디자인 시스템",
    "Cursor 디자인",
  ],
  authors: [{ name: "bitjaru", url: "https://github.com/bitjaru" }],
  creator: "bitjaru",
  publisher: "bitjaru",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "StyleSeed — Design engine for vibe coding",
    description: SITE_DESC,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/showcase-hero/finance.png",
        width: 1440,
        height: 900,
        alt: "StyleSeed showcase — finance dashboard in Toss skin with Spring motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleSeed — Design engine for vibe coding",
    description: SITE_DESC,
    images: ["/showcase-hero/finance.png"],
    creator: "@bitjaru",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  // Set these in Vercel env (Project → Settings → Environment Variables) after
  // creating the Search Console / Bing Webmaster property via the HTML-tag method,
  // then redeploy. Left undefined → Next omits the tags (no empty meta).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    description: SITE_DESC,
    url: SITE_URL,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: "https://opensource.org/licenses/MIT",
    softwareVersion: "2",
    sameAs: ["https://github.com/bitjaru/styleseed"],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
