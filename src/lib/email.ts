import nodemailer from "nodemailer";

// Create email transporter using Gmail (you can change this to another provider)
// For production, use environment variables for credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: (process.env.EMAIL_PORT || "465") === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export interface EnquiryEmailData {
  recipientEmail: string;
  recipientName: string;
  enquiryType: string;
}

export async function sendAutoResponse(data: EnquiryEmailData) {
  const { recipientEmail, recipientName, enquiryType } = data;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #001a4d;
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .content p {
            margin: 15px 0;
          }
          .highlight {
            background-color: #f0f4ff;
            padding: 15px;
            border-left: 4px solid #001a4d;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .contact-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Enquiry</h1>
          </div>
          <div class="content">
            <p>Hi ${recipientName},</p>
            
            <p>Thank you for reaching out to Rexos Properties! We've received your enquiry regarding <strong>${enquiryType}</strong>.</p>
            
            <div class="highlight">
              <p><strong>⏱️ Response Time:</strong> We'll get back to you within <strong>24 hours</strong> during business days.</p>
            </div>
            
            <p>Our team is reviewing your message and will provide you with a comprehensive response as soon as possible.</p>
            
            <p>In the meantime, if you have any urgent matters, please feel free to contact us directly:</p>
            
            <div class="contact-info">
              <p><strong>Phone:</strong> +234 916 474 2000</p>
              <p><strong>Email:</strong> info@rexsoproperties.com</p>
              <p><strong>Address:</strong> No 8B, Abiodun Ikomi Street, Lekki, Lagos</p>
            </div>
            
            <p>We look forward to helping you with your property needs!</p>
            
            <p>Best regards,<br>
            <strong>The Rexos Properties Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Rexos Properties. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "We Received Your Enquiry - Response Within 24 Hours",
      html: htmlContent,
    });

    console.log(`Auto-response email sent to ${recipientEmail}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending auto-response email:", error);
    throw error;
  }
}
