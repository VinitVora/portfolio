const test = require("node:test");
const assert = require("node:assert/strict");

const { handler } = require("../netlify/functions/contact");

const validEvent = (overrides = {}) => ({
  httpMethod: "POST",
  headers: { origin: "https://vinitvora.com" },
  body: JSON.stringify({
    name: "Contact Test",
    email: "tester@example.com",
    subject: "Website form verification",
    message: "This is a controlled contact-form test.",
    botField: "",
  }),
  ...overrides,
});

test("rejects non-POST requests", async () => {
  const response = await handler(validEvent({ httpMethod: "GET" }));
  assert.equal(response.statusCode, 405);
});

test("rejects requests from an unapproved origin", async () => {
  const response = await handler(validEvent({ headers: { origin: "https://example.com" } }));
  assert.equal(response.statusCode, 403);
});

test("rejects requests without an origin", async () => {
  const response = await handler(validEvent({ headers: {} }));
  assert.equal(response.statusCode, 403);
});

test("accepts honeypot submissions without calling Resend", async () => {
  let called = false;
  global.fetch = async () => { called = true; };
  const event = validEvent();
  event.body = JSON.stringify({ ...JSON.parse(event.body), botField: "filled-by-bot" });
  const response = await handler(event);
  assert.equal(response.statusCode, 200);
  assert.equal(called, false);
});

test("rejects invalid form content", async () => {
  const event = validEvent();
  event.body = JSON.stringify({ ...JSON.parse(event.body), email: "not-an-email" });
  const response = await handler(event);
  assert.equal(response.statusCode, 400);
});

test("sends valid content to Resend without exposing the API key", async () => {
  process.env.RESEND_API_KEY = "re_test_secret";
  process.env.CONTACT_TO_EMAIL = "contact@vinitvora.com";
  process.env.CONTACT_FROM_EMAIL = "Vinit Vora Website <contact@notify.vinitvora.com>";

  let request;
  global.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true, status: 200 };
  };

  const response = await handler(validEvent());
  assert.equal(response.statusCode, 200);
  assert.equal(request.url, "https://api.resend.com/emails");
  assert.equal(request.options.headers.Authorization, "Bearer re_test_secret");

  const body = JSON.parse(request.options.body);
  assert.equal(body.to[0], "contact@vinitvora.com");
  assert.equal(body.reply_to, "tester@example.com");
  assert.match(body.subject, /Website form verification/);
});
