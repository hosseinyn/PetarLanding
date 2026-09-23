import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ClarityProvider from "@/components/analytics/ClarityProvider";
import type { Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';

const estedad = localFont({
  src: "../public/fonts/Estedad.woff2",
  variable: "--font-estedad",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "پلتفرم تدریس اسلامی رستادی | قرآن رو بخون، بفهم، زندگی کن",
  description:
    "پلتفرم تدریس اسلامی رستادی قرآن، احکام و معارف شیعه رو با تجربه های کوتاه و تعاملی یادت میده. رایگان شروع کن.",
  keywords: ["آموزش قرآن", "احکام", "معارف شیعه", "اهل بیت", "یادگیری تعاملی", "پلتفرم تدریس اسلامی رستادی"],
  openGraph: {
    title: "پلتفرم تدریس اسلامی رستادی | قرآن رو بخون، بفهم، زندگی کن",
    description: "از آیه تا زندگی. با تجربه های تعاملی کوتاه، نشان و بازی یاد بگیر.",
    type: "website",
    locale: "fa_IR",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${estedad.variable} min-h-screen flex flex-col bg-white text-black antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>

        <ClarityProvider />
        <Analytics />
      </body>
    </html>
  );
}
