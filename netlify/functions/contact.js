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
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]
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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const origin = event.headers?.origin || event.headers?.Origin;
  if (!ALLOWED_ORIGINS.has(origin)) {
    return json(403, { error: "Invalid request origin." });
  }

  let payload;
  try {
    payload = parseBody(event);
  } catch (error) {
    return json(error.statusCode || 400, { error: "Invalid request body." });
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 254);
  const subject = clean(payload.subject, 160).replace(/[\r\n]+/g, " ");
  const message = clean(payload.message, 5000);
  const botField = clean(payload.botField, 200);

  // Return a normal response to bots without sending email.
  if (botField) {
    return json(200, { ok: true });
  }

  if (!name || !EMAIL_PATTERN.test(email) || !subject || message.length < 10) {
    return json(400, { error: "Please complete all fields with valid information." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "contact@vinitvora.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Vinit Vora Website <contact@notify.vinitvora.com>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return json(503, { error: "The contact service is temporarily unavailable." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(
          email
        )}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(
          /\n/g,
          "<br>"
        )}</p>`,
      }),
      signal: controller.signal,
    });

    if (!resendResponse.ok) {
      console.error("Resend rejected the contact email.", resendResponse.status);
      return json(502, { error: "Your message could not be sent. Please try again." });
    }

    return json(200, { ok: true });
  } catch (error) {
    console.error("Contact email request failed.", error.name);
    return json(502, { error: "Your message could not be sent. Please try again." });
  } finally {
    clearTimeout(timeout);
  }
};
