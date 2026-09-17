export interface NavLink {
  href: string;
  label: string;
  icon: string;
}

export interface ConceptStep {
  emoji: string;
  title: string;
  text: string;
  icon: string;
  example: string;
}

export interface BentoFeature {
  emoji: string;
  icon: string;
  accent: "sky" | "green" | "yellow";
  title: string;
  text: string;
  scene: "journey" | "quiz" | "streak" | "badge" | "chat" | "verse";
  span?: boolean;
}

export interface Experience {
  emoji: string;
  topic: string;
  title: string;
  text: string;
  ref: string;
  activity: string;
  duration: string;
  accent: "sky" | "green" | "yellow";
  image: string;
  alt: string;
}

export interface Topic {
  emoji: string;
  icon: string;
  title: string;
  count: string;
  accent: "sky" | "green" | "yellow";
}

export interface Path {
  emoji: string;
  icon: string;
  title: string;
  text: string;
  level: string;
  lessons: string;
  accent: "sky" | "green" | "yellow";
}

export interface Campaign {
  badge: string;
  title: string;
  text: string;
  items: string[];
  start: string;
  end: string;
  cta: string;
  image: string;
  alt: string;
}

export interface Faq {
  emoji: string;
  question: string;
  answer: string;
}

export interface AiFeature {
  emoji: string;
  icon: string;
  title: string;
  text: string;
  accent: "sky" | "green" | "yellow";
}

export const navLinks: NavLink[] = [
  { href: "#concept", label: "از آیه تا زندگی", icon: "route" },
  { href: "#experiences", label: "تجربه ها", icon: "quiz" },
  { href: "#topics", label: "موضوعات", icon: "grid" },
  { href: "#paths", label: "مسیرها", icon: "map" },
  { href: "#ai", label: "هوش مصنوعی", icon: "sparkles" },
  { href: "#faq", label: "سوالات", icon: "help" },
];

export const conceptSteps: ConceptStep[] = [
  {
    emoji: "closed-book",
    title: "آیه",
    text: "با متن اصلی قرآن شروع میکنی",
    icon: "book",
    example: "فَاغْسِلُوا وُجُوهَکُمْ وَأَیْدِیَکُمْ (مائده، 6)",
  },
  {
    emoji: "memo",
    title: "ترجمه",
    text: "معنی روانش رو میفهمی",
    icon: "languages",
    example: "صورت و دست هات رو بشور",
  },
  {
    emoji: "light-bulb",
    title: "مفهوم",
    text: "پیام اصلی آیه رو پیدا میکنی",
    icon: "sparkles",
    example: "خدا پاکیزگی قبل از نماز رو دوست داره",
  },
  {
    emoji: "star",
    title: "مثال",
    text: "با یک داستان واقعی لمسش میکنی",
    icon: "sun",
    example: "مثل وقتی میخوای بری مهمونی، تمیز و مرتب میری",
  },
  {
    emoji: "joystick",
    title: "سناریو",
    text: "خودت رو جای شخصیت میذاری",
    icon: "chat",
    example: "صبح دیرت شده؛ وضو رو سرسری میگیری یا درست؟",
  },
  {
    emoji: "game-die",
    title: "فعالیت",
    text: "با بازی و سوال تمرین میکنی",
    icon: "quiz",
    example: "قدم به قدم وضو بگیر و هر قدم رو تیک بزن",
  },
  {
    emoji: "glowing-star",
    title: "تامل",
    text: "به زندگی خودت وصلش میکنی",
    icon: "heart",
    example: "امروز وضوت چه حسی بهت داد؟ بنویس",
  },
];

export const bentoFeatures: BentoFeature[] = [
  {
    icon: "route",
    accent: "sky",
    emoji: "compass",
    title: "هر تجربه یک سفر کوتاهه",
    text: "از آیه شروع میکنی، قدم به قدم جلو میری و آخرش میرسی به زندگی خودت. نقشه راه همیشه جلو چشمته و میدونی قدم بعدی چیه.",
    scene: "journey",
    span: true,
  },
  {
    icon: "quiz",
    accent: "green",
    emoji: "game-die",
    title: "کوییز کوتاه، بدون استرس",
    text: "بعد هر تجربه چند تا سوال کوتاه جواب میدی و همون لحظه نتیجه رو میبینی.",
    scene: "quiz",
  },
  {
    icon: "flame",
    accent: "yellow",
    emoji: "fire",
    title: "رشته یادگیری روزانه",
    text: "هر روز که یاد بگیری یک روز به رشته تو اضافه میشه. نشکستن رشته حسابی حال میده.",
    scene: "streak",
  },
  {
    icon: "medal",
    accent: "sky",
    emoji: "sports-medal",
    title: "نشان جمع کن",
    text: "با تموم کردن تجربه ها و مسیرها نشان میگیری و صفحه پیشرفتت رنگی تر میشه.",
    scene: "badge",
  },
  {
    icon: "chat",
    accent: "green",
    emoji: "speaking-head",
    title: "سناریو واقعی، انتخاب با توئه",
    text: "موقعیت های واقعی رو میبینی و انتخاب میکنی. بعد میفهمی انتخابت به کدوم آیه وصل بوده.",
    scene: "chat",
  },
  {
    icon: "verse",
    accent: "yellow",
    emoji: "open-book",
    title: "آیه امروز",
    text: "هر روز یک آیه کوتاه با ترجمه روان. کمتر از یک دقیقه طول میکشه، ولی کل روز همراهته.",
    scene: "verse",
  },
];

export const experiences: Experience[] = [
  {
    topic: "حفظ قرآن",
    emoji: "trophy",
    title: "حفظ سوره کوثر",
    text: "کوتاه ترین سوره قرآن رو با تکرار و بازی حفظ میکنی و آخرش بدون نگاه کردن میخونیش.",
    ref: "سوره کوثر",
    activity: "حفظ و مرور",
    duration: "8 دقیقه",
    accent: "sky",
    image:
      "/assets/images/quran-pages.jpg",
    alt: "صفحه های قرآن",
  },
  {
    topic: "احکام",
    emoji: "folded-hands",
    title: "وضوی درست قدم به قدم",
    text: "میفهمی وضوی درست چه شکلیه، بعد قدم به قدم تمرین میکنی و اشتباه های رایج رو پیدا میکنی.",
    ref: "سوره مائده، آیه 6",
    activity: "آموزش و تمرین",
    duration: "10 دقیقه",
    accent: "green",
    image:
      "/assets/images/quran-flatlay.jpg",
    alt: "قرآن",
  },
  {
    topic: "مفاهیم قرآن",
    emoji: "open-book",
    title: "معنی سوره حمد",
    text: "سوره ای که هر روز تو نماز میخونی رو کلمه به کلمه میفهمی. از این به بعد نمازت یه طعم دیگه داره.",
    ref: "سوره حمد",
    activity: "ترجمه و سوال کوتاه",
    duration: "9 دقیقه",
    accent: "yellow",
    image:
      "/assets/images/quran-gold.jpg",
    alt: "جلد قرآن",
  },
  {
    topic: "اهل بیت",
    emoji: "heart-hands",
    title: "آیه تطهیر و اهل بیت",
    text: "میفهمی آیه تطهیر درباره کیه و چرا مهمه، بعد با یک داستان واقعی از زندگی اهل بیت آشنا میشی.",
    ref: "سوره احزاب، آیه 33",
    activity: "داستان و سناریو",
    duration: "12 دقیقه",
    accent: "sky",
    image:
      "/assets/images/medina-mosque.jpg",
    alt: "مسجد النبی",
  },
];

export const topics: Topic[] = [
  { icon: "book", emoji: "closed-book",
    title: "روخوانی و تجوید", count: "18 تجربه", accent: "sky" },
  { icon: "languages", emoji: "brain",
    title: "مفاهیم قرآن", count: "22 تجربه", accent: "green" },
  { icon: "scale", emoji: "scroll",
    title: "احکام و فقه", count: "15 تجربه", accent: "yellow" },
  { icon: "heart", emoji: "heart-hands",
    title: "اهل بیت", count: "12 تجربه", accent: "sky" },
  { icon: "landmark", emoji: "mosque",
    title: "تاریخ اسلام", count: "10 تجربه", accent: "green" },
  { icon: "moon", emoji: "crescent-moon",
    title: "نماز و عبادت", count: "11 تجربه", accent: "yellow" },
];

export const paths: Path[] = [
  {
    icon: "book",
    emoji: "books",
    title: "روخوانی و تجوید قرآن",
    text: "از الفبا تا خوندن روان قرآن. قدم به قدم با صوت و تمرین کوتاه.",
    level: "مقدماتی",
    lessons: "3 قدم",
    accent: "sky",
  },
  {
    icon: "languages",
    emoji: "brain",
    title: "فهم و مفاهیم قرآن",
    text: "کلمه های پرتکرار و مفهوم آیه ها رو میفهمی و به زندگیت وصل میکنی.",
    level: "متوسط",
    lessons: "4 قدم",
    accent: "green",
  },
  {
    icon: "scale",
    emoji: "scroll",
    title: "احکام و معارف شیعه",
    text: "احکام روزمره، اهل بیت و تاریخ اسلام. دینی که باهاش زندگی میکنی.",
    level: "همه سطح ها",
    lessons: "5 قدم",
    accent: "yellow",
  },
];

export const aiFeatures: AiFeature[] = [
  {
    icon: "sparkles",
    emoji: "speaking-head",
    title: "توضیح هوشمند آیه",
    text: "هر آیه ای رو که نفهمیدی بپرس، هوش مصنوعی به زبون خودت و کوتاه برات توضیح میده.",
    accent: "sky",
  },
  {
    icon: "route",
    emoji: "compass",
    title: "مسیر مخصوص تو",
    text: "هوش مصنوعی میفهمه کجای راهی و قدم بعدی رو دقیقا بر اساس سطح تو میچینه.",
    accent: "green",
  },
  {
    icon: "chat",
    emoji: "thinking-face",
    title: "جواب سوال های دینیت",
    text: "سوال شرعی و دینی داری؟ از قرآن، احکام و معارف شیعه جواب دقیق و مطمئن میگیری.",
    accent: "yellow",
  },
  {
    icon: "compass",
    emoji: "sparkle",
    title: "پیشنهاد چی بخونم",
    text: "بر اساس چیزی که تا حالا یاد گرفتی، تجربه بعدی رو بهت پیشنهاد میده.",
    accent: "sky",
  },
  {
    icon: "quiz",
    emoji: "game-die",
    title: "کوییز مخصوص تو",
    text: "سوال ها رو بر اساس نقطه ضعف و قوت خودت میسازه تا دقیقا همون چیزی رو تمرین کنی که لازم داری.",
    accent: "green",
  },
  {
    icon: "users",
    emoji: "teacher",
    title: "دستیار معلم ها",
    text: "معلم ها باهاش تجربه و فعالیت جدید میسازن و پیشرفت بچه ها رو بهتر میبینن.",
    accent: "yellow",
  },
];

export const aiNote = "این ها قراره بیاد، هنوز نیومده. داریم روشون کار میکنیم تا یادگیری قرآن باهوش تر بشه.";

export const campaign: Campaign = {
  badge: "کمپین فعال",
  title: "کمپین شروع یادگیری",
  text: "اولین قدم رو با هم برمیداریم. تو این کمپین چند تجربه منتخب قرآن و احکام رو رایگان انجام میدی، نشان شروع میگیری و وارد مسیر یادگیری میشی.",
  items: ["8 تجربه قرآن و احکام", "2 مسیر روخوانی و فهم", "نشان شروع کمپین", "بدون نیاز به پرداخت"],
  start: "1 مهر",
  end: "30 مهر",
  cta: "من هم هستم",
  image:
    "/assets/images/mosque-dusk.jpg",
  alt: "مسجد در غروب",
};

export const leadImage = {
  src: "/assets/images/quran-pages.jpg",
  alt: "صفحه های قرآن",
};

export const faqs: Faq[] = [
  {
    emoji: "mosque",
    question: "پلتفرم تدریس اسلامی رستادی دقیقا چیه؟",
    answer:
      "پلتفرم تدریس اسلامی رستادی (پتار) یک پلتفرم یادگیری قرآن و معارف شیعه اس. به جای درس خشک، تجربه تعاملی میسازی: آیه رو میخونی، مفهومش رو میفهمی، تو یک سناریو واقعی انتخاب میکنی و آخرش به زندگی خودت وصلش میکنی.",
  },
  {
    emoji: "check-mark",
    question: "محتواها معتبرن؟",
    answer:
      "آره. همه تجربه ها و مسیرها رو تیم پلتفرم تدریس اسلامی رستادی طراحی میکنه و قبل از انتشار بررسی و تایید میشه. هیچ محتوایی بدون تایید عمومی نمیشه.",
  },
  {
    emoji: "alarm-clock",
    question: "روزی چقدر وقت لازمه؟",
    answer:
      "هر تجربه بین 7 تا 12 دقیقه طول میکشه. با روزی یه تجربه کوتاه هم میتونی جلو بری و رشته یادگیری روزانه تو رو نگه داری.",
  },
  {
    emoji: "beaming-face-with-smiling-eyes",
    question: "شروع کردن هزینه داره؟",
    answer:
      "نه. شروع و چند تجربه اول کاملا رایگانه. این صفحه هم فقط برای آشنایی و شروع رایگانه و هیچ پرداختی لازم نیست.",
  },
];
