import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kalyanadineshnarada@gmail.com",
      subject: `Portfolio contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return Response.json({ message: "Thanks for reaching out. I will get back to you soon." });
  } catch {
    return Response.json({ error: "Something went wrong while sending your message. Please try again." }, { status: 500 });
  }
}