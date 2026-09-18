import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "پتار | پلتفرم تدریس اسلامی رستادی",
    short_name: "پتار",
    description:
      "پلتفرم تدریس اسلامی رستادی قرآن، احکام و معارف شیعه رو با تجربه های کوتاه و تعاملی یادت میده.",
    lang: "fa",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/images/logo.webp",
        sizes: "any",
        type: "image/webp",
      },
    ],
  };
}
