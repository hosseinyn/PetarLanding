import { NextResponse } from "next/server";
import type { LeadFormValues as LeadFormData } from "@/types/lead";
import {
  leadCodesFromPayload,
  normalizePhone,
  normalizeText,
  validateLeadForm,
} from "@/lib/validators/lead";

const GOOGLE_FORM_ENTRY_IDS = {
  fullName: "entry.1906375743",
  role: "entry.970949260",
  grade: "entry.166576576",
  schoolName: "entry.133104811",
  phone: "entry.1213131770",
  message: "entry.221479955",
} as const;

const INVALID_MESSAGE = "اطلاعات فرم معتبر نیست. دوباره تلاش کن.";
const SUBMIT_MESSAGE = "خطا در ثبت اطلاعات";

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: INVALID_MESSAGE },
      { status: 400 }
    );
  }

  const values: LeadFormData = {
    fullName: readString(body.fullName),
    role: readString(body.role),
    grade: readString(body.grade),
    schoolName: readString(body.schoolName),
    phone: readString(body.phone),
    message: readString(body.message),
  };

  const errors = validateLeadForm(leadCodesFromPayload(values));
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, error: INVALID_MESSAGE },
      { status: 400 }
    );
  }

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

    return NextResponse.json({ success: true }, { status: 200 });
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
