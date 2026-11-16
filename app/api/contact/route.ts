import { contactLimits } from "@/content/contact";
import { profile } from "@/content/profile";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const accents = ["#ff8a1f", "#8ab4ff", "#7ee2b8", "#ff9ec7", "#ffd84d"];

// Email clients ignore stylesheets and CSS variables, so the colors are written inline.
function renderHtml(name: string, email: string, message: string) {
  const accent = accents[Math.floor(Math.random() * accents.length)];
  return `<div style="background:#f2f5fc;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#0e1630">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:2px solid #0e1630;box-shadow:4px 4px 0 0 #0e1630">
    <div style="background:${accent};padding:16px 20px;font-size:18px;font-weight:bold;color:#0e1630">New portfolio message</div>
    <div style="padding:20px">
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#5a6488">From</p>
      <p style="margin:0 0 16px;font-size:16px;font-weight:bold">${escapeHtml(name)}</p>
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#5a6488">Email</p>
      <p style="margin:0 0 16px;font-size:16px"><a href="mailto:${escapeHtml(email)}" style="color:#0e1630">${escapeHtml(email)}</a></p>
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#5a6488">Message</p>
      <div style="margin:0;padding:12px 14px;background:#f2f5fc;border-left:4px solid ${accent};font-size:16px;line-height:1.5;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>  </div>
</div>`;
}

export async function POST(request: Request) {
  const data = await request.formData();

  if (data.get("website")) {
    return Response.json({ ok: true });
  }

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (
    !name ||
    !email ||
    !message ||
    name.length > contactLimits.name ||
    email.length > contactLimits.email ||
    message.length > contactLimits.message
  ) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: profile.email,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      html: renderHtml(name, email, message),
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true });
}
