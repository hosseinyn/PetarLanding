import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import type { Viewport } from 'next';

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
        className={`min-h-screen flex flex-col bg-white text-black antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
