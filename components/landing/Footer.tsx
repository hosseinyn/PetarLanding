import Image from "next/image";

const columns = [
  {
    title: "یادگیری",
    links: [
      { href: "#concept", label: "از آیه تا زندگی" },
      { href: "#experiences", label: "تجربه ها" },
      { href: "#topics", label: "موضوعات" },
      { href: "#paths", label: "مسیرها" },
    ],
  },
  {
    title: "پتار",
    links: [
      { href: "#features", label: "چرا پلتفرم تدریس اسلامی رستادی" },
      { href: "#ai", label: "هوش مصنوعی" },
      { href: "#faq", label: "سوالات پرتکرار" },
      { href: "#lead", label: "شروع رایگان" },
      { href: "#top", label: "برگشت به بالا" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4 md:col-span-2">
            <a href="#top" className="flex items-center gap-2.5" aria-label="پتار">
              <Image src="/images/logo.webp" width={32} height={32} alt="فناوری های آموزشی رستادی" title="فناوری های آموزشی رستادی" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-semibold">پلتفرم تدریس اسلامی رستادی</span>
                <span className="text-xs text-black/60">از آیه تا زندگی</span>
              </span>
            </a>
            <p className="max-w-xs text-sm leading-7 text-black/60">
              پلتفرم تدریس اسلامی رستادی قرآن، احکام و معارف شیعه رو به تجربه یادگیری تعاملی تبدیل
              میکنه.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-semibold">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="inline-block cursor-pointer rounded py-1.5 text-sm text-black/60 transition duration-700 hover:text-sky-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-black/60 sm:flex-row">
          <p>تمامی حقوق برای فناوری های آموزشی رستادی محفوظ است</p>
          <p>Restudy Religions Program</p>
        </div>
      </div>
    </footer>
  );
}
