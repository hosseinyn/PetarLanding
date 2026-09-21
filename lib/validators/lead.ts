import type { LeadFormErrors, LeadFormValues } from "@/types/lead";

export const FULL_NAME_MIN_LENGTH = 3;
export const FULL_NAME_MAX_LENGTH = 80;
export const SCHOOL_NAME_MIN_LENGTH = 3;
export const SCHOOL_NAME_MAX_LENGTH = 100;
export const MESSAGE_MAX_LENGTH = 1000;

const PHONE_FORMAT_ERROR =
  "شماره موبایل باید 11 رقم باشه و با 09 شروع بشه. مثل 09123456789";

export const roleOptions = [
  { value: "student", label: "دانش آموز" },
  { value: "teacher", label: "معلم" },
  { value: "manager", label: "مدیر مدرسه" },
  { value: "parent", label: "والد" },
  { value: "other", label: "سایر" },
];

export const gradeOptions = [
  { value: "none", label: "هیچکدام" },
  { value: "7", label: "پایه هفتم" },
  { value: "8", label: "پایه هشتم" },
  { value: "9", label: "پایه نهم" },
  { value: "10", label: "پایه دهم" },
  { value: "11", label: "پایه یازدهم" },
  { value: "12", label: "پایه دوازدهم" },
];

const roleValues = roleOptions.map((o) => o.value);
const gradeValues = gradeOptions.map((o) => o.value);

export const gradePayloadLabels: Record<string, string> = {
  none: "هیچکدام",
  "7": "هفتم",
  "8": "هشتم",
  "9": "نهم",
  "10": "دهم",
  "11": "یازدهم",
  "12": "دوازدهم",
};

export function toEnglishDigits(value: string): string {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  let out = "";
  for (const ch of value) {
    const faIndex = fa.indexOf(ch);
    if (faIndex >= 0) {
      out += String(faIndex);
      continue;
    }
    const arIndex = ar.indexOf(ch);
    if (arIndex >= 0) {
      out += String(arIndex);
      continue;
    }
    out += ch;
  }
  return out;
}

export function normalizeText(value: string): string {
  return value
    .replace(/[\u200C\u200B]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizePhone(value: string): string {
  let p = toEnglishDigits(value).replace(/[\s\-().]/g, "");
  if (p.startsWith("+98")) {
    p = `0${p.slice(3)}`;
  } else if (p.startsWith("0098")) {
    p = `0${p.slice(4)}`;
  } else if (p.startsWith("98") && p.length === 12) {
    p = `0${p.slice(2)}`;
  }
  return p;
}

export function isValidIranMobile(phone: string): boolean {
  if (!/^09\d{9}$/.test(phone)) {
    return false;
  }
  if (!/^09(0[1-5]|1\d|2[0-2]|3\d|4[0-1]|9\d)\d{7}$/.test(phone)) {
    return false;
  }
  if (/^(\d)\1{8}$/.test(phone.slice(2))) {
    return false;
  }
  return true;
}

export function validateFullName(raw: string): string | undefined {
  const value = normalizeText(raw);
  if (value.length === 0) {
    return "اسمت رو کامل بنویس تا بدونیم به چی صدات کنیم.";
  }
  if (value.length < FULL_NAME_MIN_LENGTH) {
    return "نام و نام خانوادگی رو کامل بنویس.";
  }
  if (value.length > FULL_NAME_MAX_LENGTH) {
    return "اسمت خیلی طولانیه. کوتاه تر بنویس.";
  }
  if (/\d/.test(toEnglishDigits(value))) {
    return "اسم نباید عدد داشته باشه. فقط حروف بنویس.";
  }
  if (/[<>{}[\]\\/=+@#$%^*~`|0-9]/.test(value)) {
    return "اسم فقط میتونه حروف و فاصله باشه.";
  }
  const words = value.split(" ").filter((w) => w.length > 0);
  if (words.length < 2) {
    return "نام و نام خانوادگی رو با هم بنویس. مثل سارا محمدی";
  }
  if (words.some((w) => w.length < 2)) {
    return "نام و نام خانوادگی رو کامل بنویس. مثل سارا محمدی";
  }
  if (!/^[\u0600-\u06FFA-Za-z\u200C\s'\-]+$/.test(raw.trim())) {
    return "اسم فقط میتونه حروف و فاصله باشه.";
  }
  return undefined;
}

export function validateRole(raw: string): string | undefined {
  if (!roleValues.includes(raw)) {
    return "نقشت رو از لیست انتخاب کن.";
  }
  return undefined;
}

export function validateGrade(raw: string, role: string): string | undefined {
  if (!gradeValues.includes(raw)) {
    return "پایه رو از لیست انتخاب کن.";
  }
  if (role === "student" && raw === "none") {
    return "چون دانش آموزی پایه ات رو هم انتخاب کن.";
  }
  return undefined;
}

export function validateSchoolName(raw: string): string | undefined {
  const value = normalizeText(raw);
  if (value.length === 0) {
    return "نام مدرسه رو بنویس.";
  }
  if (value.length < SCHOOL_NAME_MIN_LENGTH) {
    return "نام مدرسه کوتاهه. کامل بنویس.";
  }
  if (value.length > SCHOOL_NAME_MAX_LENGTH) {
    return "نام مدرسه خیلی طولانیه. خلاصه تر بنویس.";
  }
  if (/[<>{}[\]\\/=]/.test(value)) {
    return "نام مدرسه نباید علامت عجیب داشته باشه.";
  }
  const letters = value.match(/[\u0600-\u06FFA-Za-z]/g) ?? [];
  if (letters.length < 2) {
    return "نام مدرسه معتبر نیست. دوباره بنویس.";
  }
  return undefined;
}

export function validatePhone(raw: string): string | undefined {
  if (raw.trim().length === 0) {
    return "وارد کردن شماره موبایل الزامیه.";
  }
  const cleaned = toEnglishDigits(raw).replace(/[\s\-().]/g, "");
  if (/[A-Za-z\u0600-\u06FF]/.test(cleaned)) {
    return PHONE_FORMAT_ERROR;
  }
  const phone = normalizePhone(raw);
  if (!/^\d+$/.test(phone)) {
    return PHONE_FORMAT_ERROR;
  }
  if (!/^09\d{9}$/.test(phone)) {
    return PHONE_FORMAT_ERROR;
  }
  if (/^(\d)\1{8}$/.test(phone.slice(2))) {
    return "این شماره واقعی به نظر نمیرسه. شماره همراهت رو چک کن.";
  }
  if (!isValidIranMobile(phone)) {
    return "این شماره همراه معتبر نیست. یه بار دیگه چک کن.";
  }
  return undefined;
}

export function validateMessage(raw: string): string | undefined {
  const value = raw.trim();
  if (value.length === 0) {
    return undefined;
  }
  if (value.length > MESSAGE_MAX_LENGTH) {
    return "پیامت خیلی طولانیه. خلاصه تر بنویس.";
  }
  return undefined;
}

export function validateLeadForm(v: LeadFormValues): LeadFormErrors {
  const next: LeadFormErrors = {};
  const fullNameError = validateFullName(v.fullName);
  if (fullNameError !== undefined) {
    next.fullName = fullNameError;
  }
  const roleError = validateRole(v.role);
  if (roleError !== undefined) {
    next.role = roleError;
  }
  const gradeError = validateGrade(v.grade, v.role);
  if (gradeError !== undefined) {
    next.grade = gradeError;
  }
  const schoolError = validateSchoolName(v.schoolName);
  if (schoolError !== undefined) {
    next.schoolName = schoolError;
  }
  const phoneError = validatePhone(v.phone);
  if (phoneError !== undefined) {
    next.phone = phoneError;
  }
  const messageError = validateMessage(v.message);
  if (messageError !== undefined) {
    next.message = messageError;
  }
  return next;
}

const gradeCodeFromLabel: Record<string, string> = Object.fromEntries(
  Object.entries(gradePayloadLabels).map(([code, label]) => [label, code])
);

export function leadCodesFromPayload(v: LeadFormValues): LeadFormValues {
  return {
    ...v,
    role: roleOptions.find((o) => o.label === v.role)?.value ?? "",
    grade: gradeCodeFromLabel[v.grade] ?? "",
  };
}
