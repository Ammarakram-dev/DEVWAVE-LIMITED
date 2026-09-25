import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const MAX_CV_SIZE = 5 * 1024 * 1024;

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_DOMAINS = [
  "Full Stack Web Development",
  "Front-End Web Development",
  "App Development",
  "Artificial Intelligence",
  "Cyber Security",
  "Data Analytics",
];

const ALLOWED_DURATIONS = ["1 Month", "2 Months", "3 Months"];

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = clean(formData.get("fullName"));
    const email = clean(formData.get("email")).toLowerCase();
    const phone = clean(formData.get("phone"));
    const city = clean(formData.get("city"));
    const university = clean(formData.get("university"));
    const semester = clean(formData.get("semester"));
    const domain = clean(formData.get("domain"));
    const duration = clean(formData.get("duration"));
    const github = clean(formData.get("github"));
    const linkedin = clean(formData.get("linkedin"));
    const portfolio = clean(formData.get("portfolio"));
    const skills = clean(formData.get("skills"));
    const goals = clean(formData.get("goals"));
    const experience = clean(formData.get("experience"));
    const agreement = clean(formData.get("agreement"));
    const honeypot = clean(formData.get("website"));

    if (honeypot) {
      return NextResponse.json(
        { message: "Application rejected." },
        { status: 400 },
      );
    }

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !university ||
      !semester ||
      !domain ||
      !duration
    ) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!ALLOWED_DOMAINS.includes(domain)) {
      return NextResponse.json(
        { message: "Invalid internship domain." },
        { status: 400 },
      );
    }

    if (!ALLOWED_DURATIONS.includes(duration)) {
      return NextResponse.json(
        { message: "Invalid internship duration." },
        { status: 400 },
      );
    }

    if (agreement !== "true") {
      return NextResponse.json(
        { message: "You must accept the application agreement." },
        { status: 400 },
      );
    }

    const cv = formData.get("cv");

    if (!(cv instanceof File)) {
      return NextResponse.json(
        { message: "Please upload your CV." },
        { status: 400 },
      );
    }

    if (cv.size <= 0 || cv.size > MAX_CV_SIZE) {
      return NextResponse.json(
        { message: "CV must be between 1 byte and 5 MB." },
        { status: 400 },
      );
    }

    if (!ALLOWED_CV_TYPES.includes(cv.type)) {
      return NextResponse.json(
        { message: "Only PDF, DOC and DOCX CV files are accepted." },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let userId: string | null = null;

    if (user?.id && user.email) {
      if (user.email.toLowerCase() === email) {
        userId = user.id;
      }
    }

    const extension = cv.name.toLowerCase().endsWith(".pdf")
      ? "pdf"
      : cv.name.toLowerCase().endsWith(".docx")
        ? "docx"
        : "doc";

    const safeName = sanitizeFileName(cv.name);

    const uniqueName = `${crypto.randomUUID()}-${safeName}`;

    const storagePath = `${email.replace(/[^a-z0-9]/g, "-")}/${uniqueName}`;

    const buffer = Buffer.from(await cv.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from("candidate-cvs")
      .upload(storagePath, buffer, {
        contentType: cv.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          message: "Unable to securely store your CV. Please try again.",
        },
        { status: 500 },
      );
    }

    const { data: application, error: applicationError } = await supabaseAdmin
      .from("applications")
      .insert({
        user_id: userId,
        full_name: fullName,
        email,
        phone,
        city,
        university,
        semester,
        domain,
        duration,
        github: github || null,
        linkedin: linkedin || null,
        portfolio: portfolio || null,
        skills: skills || null,
        goals: goals || null,
        experience: experience || null,
        cv_path: storagePath,
        status: "Received",
      })
      .select("id, status, created_at")
      .single();

    if (applicationError) {
      await supabaseAdmin.storage.from("candidate-cvs").remove([storagePath]);

      return NextResponse.json(
        {
          message: "Unable to create the application. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully.",
        application,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while submitting the application.",
      },
      { status: 500 },
    );
  }
}
