import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      message
    } = req.body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kanchan.nishka@gmail.com",
      subject: "New Saarvah Contact Form Submission",
      html: `
        <h2>New Inquiry</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `
    });

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
}