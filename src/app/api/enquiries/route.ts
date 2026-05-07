import { PrismaClient } from "@prisma/client";
import { sendAutoResponse, sendAdminNotification } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { enquiryType, fullName, phone, email, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save enquiry to database
    const enquiry = await prisma.enquiry.create({
      data: {
        name: fullName,
        email,
        phone: phone || null,
        subject: enquiryType || "General Enquiry",
        message,
      },
    });

    // Send auto-response email to the submitter
    try {
      await sendAutoResponse({
        recipientEmail: email,
        recipientName: fullName,
        enquiryType: enquiryType || "General Enquiry",
      });
    } catch (emailError) {
      console.error("Failed to send auto-response email:", emailError);
      // Don't fail the request if email fails - the enquiry was still saved
    }

    // Notify admin of the new enquiry
    try {
      await sendAdminNotification({
        enquiryType: enquiryType || "General Enquiry",
        fullName,
        email,
        phone,
        message,
      });
    } catch (notifyError) {
      console.error("Failed to send admin notification:", notifyError);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Enquiry submitted successfully. Check your email for confirmation.",
        enquiryId: enquiry.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 },
    );
  }
}
