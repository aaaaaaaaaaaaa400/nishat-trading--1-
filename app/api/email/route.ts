import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // For now, just return success without actually sending email
    console.log("Contact form submission:", { firstName, lastName, email, company, message });

    return NextResponse.json(
      { success: true, message: "Form submission received" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process form" },
      { status: 500 }
    );
  }
} 