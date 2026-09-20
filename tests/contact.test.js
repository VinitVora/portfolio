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
  assert.equal((await handler(validEvent({ httpMethod: "GET" }))).statusCode, 405);
});

test("rejects unapproved or missing origins", async () => {
  assert.equal((await handler(validEvent({ headers: { origin: "https://example.com" } }))).statusCode, 403);
  assert.equal((await handler(validEvent({ headers: {} }))).statusCode, 403);
});

test("accepts honeypot submissions without calling Resend", async () => {
  let called = false;
  global.fetch = async () => { called = true; };
  const event = validEvent();
  event.body = JSON.stringify({ ...JSON.parse(event.body), botField: "filled-by-bot" });
  assert.equal((await handler(event)).statusCode, 200);
  assert.equal(called, false);
});

test("rejects invalid form content", async () => {
  const event = validEvent();
  event.body = JSON.stringify({ ...JSON.parse(event.body), email: "not-an-email" });
  assert.equal((await handler(event)).statusCode, 400);
});

test("sends owner notification and visitor acknowledgement", async () => {
  process.env.RESEND_API_KEY = "re_test_secret";
  process.env.CONTACT_TO_EMAIL = "contact@vinitvora.com";
  process.env.CONTACT_FROM_EMAIL = "Vinit Vora Website <contact@notify.vinitvora.com>";

  const requests = [];
  global.fetch = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, status: 200 };
  };

  assert.equal((await handler(validEvent())).statusCode, 200);
  assert.equal(requests.length, 2);
  assert.ok(requests.every((request) => request.url === "https://api.resend.com/emails"));
  assert.ok(requests.every((request) => request.options.headers.Authorization === "Bearer re_test_secret"));

  const bodies = requests.map((request) => JSON.parse(request.options.body));
  assert.ok(bodies.some((body) => body.to[0] === "contact@vinitvora.com" && body.reply_to === "tester@example.com"));
  assert.ok(bodies.some((body) => body.to[0] === "tester@example.com" && /received/i.test(body.subject)));
});
