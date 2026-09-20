const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGINS = new Set([
  "https://vinitvora.com",
  "https://www.vinitvora.com",
  "https://vinitvora.netlify.app",
]);

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  },
  body: JSON.stringify(body),
});

const clean = (value, maxLength) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]
  );

const parseBody = (event) => {
  if (!event.body) return {};
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  if (Buffer.byteLength(raw, "utf8") > 20_000) {
    const error = new Error("Request body is too large.");
    error.statusCode = 413;
    throw error;
  }
  return JSON.parse(raw);
};

const sendEmail = async (apiKey, payload, signal) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });
  if (!response.ok) throw new Error(`Resend rejected email: ${response.status}`);
};

const visitorEmail = ({ safeName, safeSubject, subject, name }) => ({
  subject: "We received your security assessment request",
  text: `Hi ${name},

Your enquiry has been received.

Request subject: ${subject}

What happens next:
1. I review the details you submitted.
2. I will respond within one business day with the appropriate next step.
3. Before any security testing begins, we agree written authorization and scope.

Please do not reply with credentials, production data, or detailed vulnerability evidence by ordinary email.

Regards,
Vinit Vora
Application Security Engineer
Web & API Penetration Testing | AWS & Kubernetes Security
https://vinitvora.com`,
  html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f3f6f7;color:#20343a;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6f7;">
      <tr><td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #dce5e7;border-radius:12px;overflow:hidden;">
          <tr><td style="background:#0f2c36;padding:20px 28px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="middle">
                  <img src="https://vinitvora.com/brand-mark.svg" width="180" height="48" alt="&lt;/&gt; V.V — Vinit Vora" style="display:block;border:0;outline:none;text-decoration:none;max-width:180px;height:auto;" />
                </td>
                <td align="right" valign="middle" style="font-size:11px;line-height:16px;letter-spacing:1.2px;color:#b7c9cd;text-transform:uppercase;">Application<br/>Security</td>
              </tr>
            </table>
          </td></tr>
          <tr><td style="padding:36px 36px 28px;">
            <p style="margin:0 0 12px;font-size:11px;line-height:16px;letter-spacing:1.2px;font-weight:700;color:#0f766e;text-transform:uppercase;">Enquiry received</p>
            <h1 style="margin:0 0 18px;font-size:26px;line-height:34px;color:#173642;font-weight:700;">Thank you, ${safeName}.</h1>
            <p style="margin:0 0 22px;font-size:16px;line-height:25px;color:#40545a;">Your request has been received and will be reviewed personally. You can expect a response within one business day.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;background:#f3f7f7;border-left:3px solid #0f766e;">
              <tr><td style="padding:16px 18px;">
                <p style="margin:0 0 5px;font-size:11px;line-height:16px;letter-spacing:1px;font-weight:700;color:#64777d;text-transform:uppercase;">Request subject</p>
                <p style="margin:0;font-size:15px;line-height:22px;font-weight:700;color:#20343a;">${safeSubject}</p>
              </td></tr>
            </table>
            <h2 style="margin:0 0 12px;font-size:17px;line-height:24px;color:#173642;">What happens next</h2>
            <ol style="margin:0 0 24px;padding-left:20px;font-size:15px;line-height:24px;color:#40545a;">
              <li style="margin-bottom:5px;">I review the details you submitted.</li>
              <li style="margin-bottom:5px;">I respond with the appropriate next step.</li>
              <li>Security testing begins only after written authorization and an agreed scope.</li>
            </ol>
            <p style="margin:0;font-size:14px;line-height:22px;color:#40545a;">Regards,<br/><strong style="color:#173642;">Vinit Vora</strong><br/>Application Security Engineer<br/><a href="https://vinitvora.com" style="color:#0f766e;text-decoration:none;">vinitvora.com</a></p>
          </td></tr>
          <tr><td style="padding:18px 36px;background:#f7f9f9;border-top:1px solid #dce5e7;">
            <p style="margin:0;font-size:12px;line-height:18px;color:#64777d;">For your protection, please do not send credentials, production data, or detailed vulnerability evidence by ordinary email. Security engagements require written authorization and an agreed scope.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed." });

  const origin = event.headers?.origin || event.headers?.Origin;
  if (!ALLOWED_ORIGINS.has(origin)) return json(403, { error: "Invalid request origin." });

  let payload;
  try {
    payload = parseBody(event);
  } catch (error) {
    return json(error.statusCode || 400, { error: "Invalid request body." });
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 254).toLowerCase();
  const subject = clean(payload.subject, 160).replace(/[\r\n]+/g, " ");
  const message = clean(payload.message, 5000);
  const botField = clean(payload.botField, 200);

  if (botField) return json(200, { ok: true });
  if (!name || !EMAIL_PATTERN.test(email) || !subject || message.length < 10) {
    return json(400, { error: "Please complete all fields with valid information." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.CONTACT_TO_EMAIL || "contact@vinitvora.com";
  const from = process.env.CONTACT_FROM_EMAIL ||
    "Vinit Vora Website <contact@notify.vinitvora.com>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return json(503, { error: "The contact service is temporarily unavailable." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const acknowledgement = visitorEmail({ safeName, safeSubject, subject, name });
    await Promise.all([
      sendEmail(apiKey, {
        from,
        to: [ownerEmail],
        reply_to: email,
        subject: `Website enquiry: ${subject}`,
        text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `<h2>New website enquiry</h2><p><strong>Name:</strong> ${safeName}<br><strong>Email:</strong> ${safeEmail}<br><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage}</p>`,
      }, controller.signal),
      sendEmail(apiKey, {
        from,
        to: [email],
        reply_to: ownerEmail,
        subject: acknowledgement.subject,
        text: acknowledgement.text,
        html: acknowledgement.html,
      }, controller.signal),
    ]);
    return json(200, { ok: true });
  } catch (error) {
    console.error("Contact email request failed.", error.message);
    return json(502, { error: "Your message could not be sent. Please email contact@vinitvora.com directly." });
  } finally {
    clearTimeout(timeout);
  }
};
