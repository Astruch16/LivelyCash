import { z } from "zod";

import {
  contactSchema,
  HONEYPOT_FIELD,
  type ContactApiResponse,
} from "@/lib/contact-schema";
import { isEmailConfigured, sendEnquiryEmail } from "@/lib/email";
import {
  getClientIp,
  MAX_REQUESTS,
  memoryRateLimitStore,
  type RateLimitStore,
} from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

/**
 * Swap this binding for a Redis-backed store in production — see the TODO in
 * `lib/rate-limit.ts`. Everything below only depends on the interface.
 */
const rateLimiter: RateLimitStore = memoryRateLimitStore;

function json(body: ContactApiResponse, init: ResponseInit = {}) {
  return Response.json(body, init);
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json(
      {
        ok: false,
        message: "We couldn't read that submission. Please try again.",
      },
      { status: 400 },
    );
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: a bot fills every field it finds, a human never sees this one.
  // Respond with a normal success so the bot has nothing to learn from.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true, message: "Thanks — we'll be in touch shortly." });
  }

  const ip = getClientIp(request);
  const limit = await rateLimiter.check(`contact:${ip}`);

  if (!limit.success) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((limit.resetAt - Date.now()) / 1000),
    );

    return json(
      {
        ok: false,
        message: `You've sent ${MAX_REQUESTS} messages in a short window. Please wait about ${Math.ceil(
          retryAfterSeconds / 60,
        )} minute(s) and try again — or call us directly if it's urgent.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
          "RateLimit-Limit": String(limit.limit),
          "RateLimit-Remaining": String(limit.remaining),
          "RateLimit-Reset": String(retryAfterSeconds),
        },
      },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const submission = parsed.data;

  /*
   * Delivery. The handler only reports success once the provider has accepted
   * the message: a form that says "we'll be in touch" while the enquiry goes
   * nowhere is worse than one that admits it failed and offers the phone
   * number.
   *
   * Without mail configured we fall back to logging, but only outside
   * production — that keeps `npm run dev` usable without an API key, while a
   * misconfigured deployment fails loudly instead of silently dropping leads.
   */
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set — enquiry not delivered",
        { businessName: submission.businessName, email: submission.email },
      );

      return json(
        {
          ok: false,
          message: `Sorry — we couldn't send that just now. Please email us at ${siteConfig.email} or call ${siteConfig.phone}.`,
        },
        { status: 502 },
      );
    }

    console.info("[contact] no mail configured, logging enquiry", {
      receivedAt: new Date().toISOString(),
      ip,
      ...submission,
    });

    return json({
      ok: true,
      message: "Thanks — we'll be in touch shortly.",
    });
  }

  const delivery = await sendEnquiryEmail(submission);

  if (!delivery.ok) {
    // The enquirer's details go to the log so nothing is lost if mail is down.
    console.error("[contact] delivery failed", {
      reason: delivery.reason,
      detail: delivery.detail,
      receivedAt: new Date().toISOString(),
      ...submission,
    });

    return json(
      {
        ok: false,
        message: `Sorry — we couldn't send that just now. Please email us at ${siteConfig.email} or call ${siteConfig.phone}.`,
      },
      { status: 502 },
    );
  }

  return json({
    ok: true,
    message: "Thanks — we'll be in touch shortly.",
  });
}
