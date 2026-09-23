import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { Friend, LeadFormValues as LeadFormData } from "@/types/lead";
import {
  freeTimeActivityOptions,
  leadCodesFromPayload,
  normalizePhone,
  normalizeText,
  serializeFriends,
  serializeMultiSelect,
  traitOptions,
  validateLeadForm,
} from "@/lib/validators/lead";

const GOOGLE_FORM_ENTRY_IDS = {
  fullName: "entry.1906375743",
  role: "entry.970949260",
  grade: "entry.166576576",
  schoolName: "entry.133104811",
  phone: "entry.1213131770",
  message: "entry.221479955",
  traits: "entry.105419333",
  competitionRating: "entry.803475269",
  freeTimeActivities: "entry.2101516121",
  aboutYourself: "entry.213502875",
  friends: "entry.2135576298",
} as const;

const INVALID_MESSAGE = "اطلاعات فرم معتبر نیست. دوباره تلاش کن.";
const SUBMIT_MESSAGE = "خطا در ثبت اطلاعات";
const ORIGIN_MESSAGE = "درخواست معتبر نیست.";
const COOLDOWN_MESSAGE = "کمی صبر کن و بعد دوباره تلاش کن.";
const EXHAUSTED_MESSAGE = "به سقف ثبت نام رسیدی.";

const COOKIE_NAME = "lead_sub";
const COOLDOWN_MS = 30_000;
const MAX_SUCCESS = 3;
const COOKIE_MAX_AGE = 31536000;

interface LeadCookieState {
  t: number;
  c: number;
}

let prodSecretFallback: string | null = null;

function cookieSecret(): string {
  const secret = process.env.LEAD_COOKIE_SECRET;
  if (typeof secret === "string" && secret.length >= 16) {
    return secret;
  }
  if (process.env.NODE_ENV === "production") {
    if (prodSecretFallback === null) {
      prodSecretFallback = randomBytes(32).toString("hex");
    }
    return prodSecretFallback;
  }
  return "petar-lead-dev-secret";
}

function allowedOrigins(): string[] {
  if (process.env.NODE_ENV === "production") {
    const site = process.env.SITE_URL;
    if (typeof site === "string" && site.length > 0) {
      return [site.replace(/\/+$/, "")];
    }
    return ["https://petar-land.vercel.app"];
  }
  return ["http://localhost:3000", "http://127.0.0.1:3000" , "http://localhost:5437" , "http://127.0.0.1:5437"];
}

function getCookieValue(header: string | null, name: string): string | undefined {
  if (header === null) {
    return undefined;
  }
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) {
      continue;
    }
    if (part.slice(0, index).trim() === name) {
      try {
        return decodeURIComponent(part.slice(index + 1).trim());
      } catch {
        return undefined;
      }
    }
  }
  return undefined;
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function readLeadCookie(raw: string | undefined, secret: string): LeadCookieState | null {
  if (raw === undefined || raw.length === 0) {
    return null;
  }
  const dot = raw.lastIndexOf(".");
  if (dot <= 0) {
    return null;
  }
  const payload = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);
  const expected = signPayload(payload, secret);
  const a = Buffer.from(signature, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }
  try {
    const data: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data !== "object" || data === null) {
      return null;
    }
    const record = data as Record<string, unknown>;
    if (
      typeof record.t !== "number" ||
      !Number.isFinite(record.t) ||
      typeof record.c !== "number" ||
      !Number.isInteger(record.c) ||
      record.c < 0
    ) {
      return null;
    }
    return { t: record.t, c: record.c };
  } catch {
    return null;
  }
}

function makeLeadCookie(state: LeadCookieState, secret: string): string {
  const payload = Buffer.from(JSON.stringify(state), "utf8").toString("base64url");
  return `${payload}.${signPayload(payload, secret)}`;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function readStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string" && value !== "") {
    return [value];
  }
  return [];
}

function readCompetitionRating(value: unknown): number | "" {
  return typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 4
    ? value
    : "";
}

function readFriends(value: unknown): Friend[] {
  if (value === undefined || value === null) {
    return [];
  }
  if (!Array.isArray(value)) {
    return value as unknown as Friend[];
  }
  return value.map((item) => {
    if (typeof item !== "object" || item === null) {
      return { fullName: "", schoolName: "" };
    }
    const record = item as Record<string, unknown>;
    return {
      fullName: typeof record.fullName === "string" ? record.fullName : "",
      schoolName: typeof record.schoolName === "string" ? record.schoolName : "",
    };
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin === null || !allowedOrigins().includes(origin)) {
    return NextResponse.json(
      { success: false, error: ORIGIN_MESSAGE },
      { status: 403 }
    );
  }

  const secret = cookieSecret();
  const state = readLeadCookie(getCookieValue(request.headers.get("cookie"), COOKIE_NAME), secret);
  if (state !== null && state.c >= MAX_SUCCESS) {
    return NextResponse.json(
      { success: false, error: EXHAUSTED_MESSAGE },
      { status: 403 }
    );
  }
  if (state !== null && Date.now() - state.t < COOLDOWN_MS) {
    const retryAfter = Math.max(1, Math.ceil((COOLDOWN_MS - (Date.now() - state.t)) / 1000));
    return NextResponse.json(
      { success: false, error: COOLDOWN_MESSAGE },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: INVALID_MESSAGE },
      { status: 400 }
    );
  }

  const candidate = {
    fullName: readString(body.fullName),
    role: readString(body.role),
    grade: readString(body.grade),
    schoolName: readString(body.schoolName),
    phone: readString(body.phone),
    message: readString(body.message),
    traits: body.traits ?? "",
    competitionRating: body.competitionRating ?? "",
    freeTimeActivities: body.freeTimeActivities ?? "",
    aboutYourself: body.aboutYourself ?? "",
    friends: readFriends(body.friends),
  } as LeadFormData;

  const errors = validateLeadForm(leadCodesFromPayload(candidate));
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, error: INVALID_MESSAGE },
      { status: 400 }
    );
  }

  const values: LeadFormData = {
    fullName: candidate.fullName,
    role: candidate.role,
    grade: candidate.grade,
    schoolName: candidate.schoolName,
    phone: candidate.phone,
    message: candidate.message,
    traits: readStringArray(candidate.traits),
    competitionRating: readCompetitionRating(candidate.competitionRating),
    freeTimeActivities: readStringArray(candidate.freeTimeActivities),
    aboutYourself: readString(candidate.aboutYourself),
    friends: (Array.isArray(candidate.friends) ? candidate.friends : []).map((f) => ({
      fullName: normalizeText(typeof f?.fullName === "string" ? f.fullName : ""),
      schoolName: normalizeText(typeof f?.schoolName === "string" ? f.schoolName : ""),
    })),
  };

  try {
    const FORM_ID = process.env.GOOGLE_FORM_ID;

    if (!FORM_ID) {
      throw new Error(
        "GOOGLE_FORM_ID is not defined in environment variables"
      );
    }

    const GOOGLE_FORM_URL = `https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`;

    const formParams = new URLSearchParams();

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.fullName,
      normalizeText(values.fullName)
    );

    formParams.append(GOOGLE_FORM_ENTRY_IDS.role, values.role);

    formParams.append(GOOGLE_FORM_ENTRY_IDS.grade, values.grade);

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.schoolName,
      normalizeText(values.schoolName)
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.phone,
      normalizePhone(values.phone)
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.message,
      values.message.trim()
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.traits,
      serializeMultiSelect(values.traits, traitOptions)
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.competitionRating,
      values.competitionRating === "" ? "" : String(values.competitionRating)
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.freeTimeActivities,
      serializeMultiSelect(values.freeTimeActivities, freeTimeActivityOptions)
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.aboutYourself,
      normalizeText(values.aboutYourself)
    );

    formParams.append(
      GOOGLE_FORM_ENTRY_IDS.friends,
      serializeFriends(values.friends)
    );

    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formParams.toString(),
    });

    if (!response.ok) {
      throw new Error("Google Form response was not ok");
    }

    const success = NextResponse.json({ success: true }, { status: 200 });
    const parts = [
      `${COOKIE_NAME}=${encodeURIComponent(makeLeadCookie({ t: Date.now(), c: (state?.c ?? 0) + 1 }, secret))}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${COOKIE_MAX_AGE}`,
    ];
    if (process.env.NODE_ENV === "production") {
      parts.push("Secure");
    }
    success.headers.append("Set-Cookie", parts.join("; "));
    return success;
  } catch (error) {
    console.error("Google Form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: SUBMIT_MESSAGE,
      },
      { status: 500 }
    );
  }
}
