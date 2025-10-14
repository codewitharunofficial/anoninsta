import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This handles POST requests
export async function POST(req) {
  try {
    const data = await req.json(); // Parse JSON body
    const { name, email, message } = data;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `New contact form submission from ${name}`,
      text: message + " \n" + " \n" + " \n" + `Sender: ${email}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
