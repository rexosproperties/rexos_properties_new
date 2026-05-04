import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, timeline, searchCriteria } =
      await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !timeline) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // TODO: Save to database if needed
    // await db.agentMatch.create({...})

    // Send automated response email
    const searchSummary = Object.entries(searchCriteria)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
            .header { background: #001a4d; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-box { background: #e8f4f8; border-left: 4px solid #001a4d; padding: 15px; margin: 15px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
            h2 { color: #001a4d; margin-bottom: 10px; }
            strong { color: #001a4d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Connecting With Us!</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              
              <p>We've received your property search request and our AI is analyzing your criteria to match you with the perfect agent.</p>
              
              <div class="info-box">
                <strong>Your Search Details:</strong><br/>
                ${searchSummary || "No specific criteria provided"}
              </div>
              
              <h3>What Happens Next?</h3>
              <p>Our AI has analyzed your search criteria and matched you with agents who have exactly what you're looking for. Here's what to expect:</p>
              
              <ul>
                <li><strong>Agent Matching:</strong> We've identified 3-4 property experts specialized in your requirements</li>
                <li><strong>Contact Timeline:</strong> Agents will reach out to you within 24 hours</li>
                <li><strong>Personalized Service:</strong> Each agent brings specialized knowledge of your target area and property type</li>
                <li><strong>Flexible Options:</strong> You can discuss timelines and preferences directly with them</li>
              </ul>
              
              <div class="info-box">
                <strong>Timeline:</strong> ${timeline}<br/>
                <strong>Contact Phone:</strong> ${phone}
              </div>
              
              <h3>Frequently Asked Questions</h3>
              <p><strong>Q: When will an agent contact me?</strong><br/>
              A: Within 24 business hours of your enquiry</p>
              
              <p><strong>Q: Can I modify my search criteria?</strong><br/>
              A: Yes! Simply reply to this email or contact us directly</p>
              
              <p><strong>Q: What if I don't hear from an agent?</strong><br/>
              A: Please check your spam folder or contact us at support@rexosproperties.com</p>
              
              <h3>Questions?</h3>
              <p>If you have any questions before hearing from your agents, feel free to reach out:</p>
              <ul>
                <li>Email: <strong>support@rexosproperties.com</strong></li>
                <li>Phone: <strong>+234 (0) 123 456 7890</strong></li>
                <li>Office Hours: Monday - Friday, 9am - 5pm (WAT)</li>
              </ul>
              
              <p>We're excited to help you find your dream property!</p>
              
              <p>Best regards,<br/>
              <strong>The Rexos Properties Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2026 Rexos Properties. All rights reserved.</p>
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Property Search - Agent Matching Ready`,
      html: emailHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your request has been received. Check your email for agent recommendations!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Agent matching error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 },
    );
  }
}
